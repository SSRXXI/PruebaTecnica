using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiSF.Models;

namespace MultiSF
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComunaController : ControllerBase
    {
        private readonly PRUEBASFContext _context;

        public ComunaController(PRUEBASFContext context)
        {
            _context = context;
        }

        // GET: api/Comuna
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comuna>>> GetComunas()
        {
            return await _context.Comunas.ToListAsync();
        }
        [HttpGet("{ciudadId}/{regionId}")]
        public async Task<ActionResult<IEnumerable<Comuna>>> GetComunasCiudadesRegion(short ciudadId, short regionId)
        {
            var comunas = _context.Comunas
                    .Where(b => b.CiudadCodigo == ciudadId && b.RegionCodigo == regionId).ToListAsync();

            if (comunas == null)
            {
                return NotFound();
            }
            return await comunas;
        }

        // GET: api/Comuna/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comuna>> GetComuna(short id)
        {
            var comuna = await _context.Comunas.FindAsync(id);

            if (comuna == null)
            {
                return NotFound();
            }

            return comuna;
        }

        // PUT: api/Comuna/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComuna(short id, Comuna comuna)
        {
            if (id != comuna.RegionCodigo)
            {
                return BadRequest();
            }

            _context.Entry(comuna).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComunaExists(id))
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

        // POST: api/Comuna
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Comuna>> PostComuna(Comuna comuna)
        {
            _context.Comunas.Add(comuna);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ComunaExists(comuna.RegionCodigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetComuna", new { id = comuna.RegionCodigo }, comuna);
        }

        // DELETE: api/Comuna/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComuna(short id)
        {
            var comuna = await _context.Comunas.FindAsync(id);
            if (comuna == null)
            {
                return NotFound();
            }

            _context.Comunas.Remove(comuna);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComunaExists(short id)
        {
            return _context.Comunas.Any(e => e.RegionCodigo == id);
        }
    }
}
