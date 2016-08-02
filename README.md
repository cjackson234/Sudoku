<h1>Sudoku Challenge</h1>

Our next viral marketing challenge rewards the first guest to correctly solve a sudoku game with a free

Write a single page web application that provides a simple sudoku interface.

1. All new players start from a hardcoded initial setup:

2. Like paper­based sudoku, players may not edit the initial numbers on the board.

3. Like paper­based sudoku, players may change their entries in the free spaces as needed until

they complete the puzzle.

4. Each entry is verified to ensure that it is a legal entry.

5. Visual feedback of legal and illegal entries is at your discretion.

6. A timestamp of a verified completion is saved on the server as well as displayed to the client.

7. The UI for displaying guests’ puzzle completions and other data is not in scope ​for this

challenge, but the server API and data structures for persisting that data are.

Flip.to Engineering 1 Confidential

Non­Functional Requirements

1. Being the first to market with our online sudoku game is important! Time­box your solution to

no more than 1 or 2 evenings worth of work.

2. We are a .Net and AngularJS shop. Our preference is for those technologies.

3. If our totally unique sudoku game does goes viral, be prepared to share your ideas on how to

The classic Sudoku game involves a grid of 81 squares. The grid is divided into nine blocks, each

The rules of the game are simple: each of the nine blocks has to contain all the numbers 1­9 within its

squares. Each number can only appear once in a row, column or box.

The difficulty lies in that each vertical nine­square column, or horizontal nine­square line across,

within the larger square, must also contain the numbers 1­9, without repetition or omission.

Every puzzle has just one correct solution.
