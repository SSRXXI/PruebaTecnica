using System;
using System.Collections.Generic;

#nullable disable

namespace MultiSF.Models
{
    public partial class Sexo
    {
        public Sexo()
        {
            Personas = new HashSet<Persona>();
        }

        public short Codigo { get; set; }
        public string Nombre { get; set; }
        public string Letra { get; set; }

        public virtual ICollection<Persona> Personas { get; set; }
    }
}
