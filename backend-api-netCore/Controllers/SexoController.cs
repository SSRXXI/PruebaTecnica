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
    public class SexoController : ControllerBase
    {
        private readonly PRUEBASFContext _context;

        public SexoController(PRUEBASFContext context)
        {
            _context = context;
        }

        // GET: api/Sexo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sexo>>> GetSexos()
        {
            return await _context.Sexos.ToListAsync();
        }

        // GET: api/Sexo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sexo>> GetSexo(short id)
        {
            var sexo = await _context.Sexos.FindAsync(id);

            if (sexo == null)
            {
                return NotFound();
            }

            return sexo;
        }

        // PUT: api/Sexo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSexo(short id, Sexo sexo)
        {
            if (id != sexo.Codigo)
            {
                return BadRequest();
            }

            _context.Entry(sexo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SexoExists(id))
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

        // POST: api/Sexo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sexo>> PostSexo(Sexo sexo)
        {
            _context.Sexos.Add(sexo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SexoExists(sexo.Codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSexo", new { id = sexo.Codigo }, sexo);
        }

        // DELETE: api/Sexo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSexo(short id)
        {
            var sexo = await _context.Sexos.FindAsync(id);
            if (sexo == null)
            {
                return NotFound();
            }

            _context.Sexos.Remove(sexo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SexoExists(short id)
        {
            return _context.Sexos.Any(e => e.Codigo == id);
        }
    }
}
