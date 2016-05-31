using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using sudoku.Models;

namespace sudoku.Controllers
{
    public class CompletedGamesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/CompletedGames
        public IQueryable<CompletedGame> GetCompletedGames()
        {
            return db.CompletedGames;
        }

        // GET: api/CompletedGames/5
        [ResponseType(typeof(CompletedGame))]
        public IHttpActionResult GetCompletedGame(int id)
        {
            CompletedGame completedGame = db.CompletedGames.Find(id);
            if (completedGame == null)
            {
                return NotFound();
            }

            return Ok(completedGame);
        }

        // PUT: api/CompletedGames/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompletedGame(int id, CompletedGame completedGame)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != completedGame.Id)
            {
                return BadRequest();
            }

            db.Entry(completedGame).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompletedGameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CompletedGames
        [ResponseType(typeof(CompletedGame))]
        public IHttpActionResult PostCompletedGame(CompletedGame completedGame)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CompletedGames.Add(completedGame);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = completedGame.Id }, completedGame);
        }

        // DELETE: api/CompletedGames/5
        [ResponseType(typeof(CompletedGame))]
        public IHttpActionResult DeleteCompletedGame(int id)
        {
            CompletedGame completedGame = db.CompletedGames.Find(id);
            if (completedGame == null)
            {
                return NotFound();
            }

            db.CompletedGames.Remove(completedGame);
            db.SaveChanges();

            return Ok(completedGame);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompletedGameExists(int id)
        {
            return db.CompletedGames.Count(e => e.Id == id) > 0;
        }
    }
}