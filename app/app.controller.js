angular.module("app").controller('appController', function ($scope, $filter, $mdDialog, $http, $q) {
    $scope.master = {};
    $scope.master.rows = [
        [null, 2, null, 1, 7, 8, null, 3, null],
        [null, 4, null, 3, null, 2, null, 9, null],
        [1, null, null, null, null, null, null, null, 6],
        [null, null, 8, 6, null, 3, 5, null, null],
        [3, null, null, null, null, null, null, null, 4],
        [null, null, 6, 7, null, 9, 2, null, null],
        [9, null, null, null, null, null, null, null, 2],
        [null, 8, null, 9, null, 1, null, 6, null],
        [null, 1, null, 4, 3, 6, null, 5, null],
    ];

    processGame();

    function processGame() {
        $scope.game = {};
        $scope.game.rows = [];
        for (var r = 0; r < 9; r++) {
            $scope.game.rows.push([])
            for (var c = 0; c < 9; c++) {
                var curSquare = Math.floor(r / 3) * 3 + Math.floor(c / 3)
                $scope.game.rows[r].push(
                    {
                        value: $scope.master.rows[r][c],
                        disabled: $scope.master.rows[r][c] != null ? true : false,
                    });
            }
        }
    }

    $scope.isValid = function (rowIndex, colIndex, data) {
        if (data.value == null) return true;
        $scope.game.complete = isComplete();

        var squares = getSquares();
        var column = getColumn(colIndex);
        var curSquare = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3)
        var valid = (validate(squares[curSquare], data) && validate($scope.game.rows[rowIndex], data) && validate(column, data))

        if (valid && isComplete() && !$scope.confirmShowing) {
            $scope.game.timestamp = new Date().toJSON();
            $scope.showPrompt();
        }
        return valid;
    }

    function isComplete() {
        var count = 0;
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if ($scope.game.rows[r][c].value != null) {
                    count++;
                }
            }
        }
        return (count == 81)
    }

    function validate(list, item) {
        return ($filter('filter')(list, { value: item.value }).length == 1 && item.value > 0 && item.value < 10)
    }

    function getSquares() {
        var squares = [];
        for (var i = 0; i < 9; i++) {
            squares.push([])
        }

        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                var curSquare = Math.floor(r / 3) * 3 + Math.floor(c / 3)
                squares[curSquare].push($scope.game.rows[r][c]);
            }
        }

        return squares;
    }

    function getColumn(colIndex) {
        var col = [];
        for (var r = 0; r < 9; r++) {
            col.push($scope.game.rows[r][colIndex]);
        }

        return col;
    }

    $scope.showPrompt = function (ev) {
        var confirm = $mdDialog.prompt()
            .title('Congratulations! You Won!')
            .textContent('To claim your prize, please enter your email below.')
            .placeholder('Email')
            .ariaLabel('Email')
            .targetEvent(ev)
            .ok('Submit')
            .cancel('Cancel');
        $scope.confirmShowing = true;
        $mdDialog.show(confirm).then(function (result) {
            $scope.game.email = result;
            saveGame().then((resp) => { });
        }, function () {});
    };

    function saveGame() {
        var deferred = $q.defer();
        var data = {
            Email: $scope.game.email,
            TimeStamp: $scope.game.timestamp,
            GameData: JSON.stringify($scope.game.rows)
        };

        $http.post('http://localhost:13771/api/CompletedGames', JSON.stringify(data),{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(deferred.resolve).error(deferred.reject);
        return deferred.promise;
    };

});