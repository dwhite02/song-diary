using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SongDiary.Data;
using SongDiary.Models;

namespace SongDiary.Controllers
{
    [Authorize] // Ensure all endpoints in this controller require authentication
    [Route("api/[controller]")]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EntriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Entries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntryModel>>> GetEntries()
        {
            // Get the current user's ID
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (_context.Entries == null)
            {
                return NotFound();
            }

            // Filter entries by the logged-in user's ID
            var userEntries = await _context.Entries
                .Where(e => e.UserId == userId)
                .ToListAsync();

            return userEntries;
        }

        // GET: api/Entries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EntryModel>> GetEntryModel(int id)
        {
            if (_context.Entries == null)
            {
                return NotFound();
            }
            var entryModel = await _context.Entries.FindAsync(id);

            // Check if the entry belongs to the current user
            if (entryModel == null || entryModel.UserId != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return NotFound();
            }

            return entryModel;
        }

        // PUT: api/Entries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntryModel(int id, EntryModel entryModel)
        {
            if (id != entryModel.Id)
            {
                return BadRequest();
            }

            // Check if the entry belongs to the current user
            var existingEntry = await _context.Entries.FindAsync(id);
            if (existingEntry == null || existingEntry.UserId != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Unauthorized(); // Entry doesn't belong to the user
            }

            // Update the entry
            _context.Entry(existingEntry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntryModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Entries
        [HttpPost]
        public async Task<ActionResult<EntryModel>> PostEntryModel(EntryModel entryModel)
        {
            if (_context.Entries == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Entries' is null.");
            }

            // Assign the current user's ID to the entry
            entryModel.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            _context.Entries.Add(entryModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntryModel), new { id = entryModel.Id }, entryModel);
        }

        // DELETE: api/Entries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntryModel(int id)
        {
            if (_context.Entries == null)
            {
                return NotFound();
            }
            var entryModel = await _context.Entries.FindAsync(id);

            // Check if the entry belongs to the current user
            if (entryModel == null || entryModel.UserId != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Unauthorized();
            }

            _context.Entries.Remove(entryModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntryModelExists(int id)
        {
            return (_context.Entries?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}



