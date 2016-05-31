using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sudoku.Models
{
    public class CompletedGame
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public DateTime TimeStamp { get; set; }
        public string GameData { get; set; }
    }
}