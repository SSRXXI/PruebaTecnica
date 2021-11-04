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
    public class CiudadController : ControllerBase
    {
        private readonly PRUEBASFContext _context;

        public CiudadController(PRUEBASFContext context)
        {
            _context = context;
        }

        // GET: api/Ciudad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetCiudads()
        {
            return await _context.Ciudads.ToListAsync();
        }
        // GET: api/Ciudad/1
        [HttpGet("{regionId}")]
        public async Task<ActionResult<IEnumerable<Ciudad>>> GetCiudadesRegion(short regionId)
        {
            var ciudades = _context.Ciudads
                    .Where(b => b.RegionCodigo == regionId).ToListAsync();

            if (ciudades == null)
            {
                return NotFound();
            }
            return await ciudades;
        }

        // GET: api/Ciudad/1/2
        [HttpGet("{id}/{regionId}")]
        public async Task<ActionResult<Ciudad>> GetCiudad(short id, short regionId)
        {
            var ciudad = await _context.Ciudads.FindAsync(regionId, id);

            if (ciudad == null)
            {
                return NotFound();
            }

            return ciudad;
        }

        // PUT: api/Ciudad/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCiudad(short id, Ciudad ciudad)
        {
            if (id != ciudad.RegionCodigo)
            {
                return BadRequest();
            }

            _context.Entry(ciudad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CiudadExists(id))
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

        // POST: api/Ciudad
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ciudad>> PostCiudad(Ciudad ciudad)
        {
            _context.Ciudads.Add(ciudad);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CiudadExists(ciudad.RegionCodigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCiudad", new { id = ciudad.RegionCodigo }, ciudad);
        }

        // DELETE: api/Ciudad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCiudad(short id)
        {
            var ciudad = await _context.Ciudads.FindAsync(id);
            if (ciudad == null)
            {
                return NotFound();
            }

            _context.Ciudads.Remove(ciudad);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CiudadExists(short id)
        {
            return _context.Ciudads.Any(e => e.RegionCodigo == id);
        }
    }
}
