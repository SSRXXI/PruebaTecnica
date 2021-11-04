using System;
using System.Collections.Generic;

#nullable disable

namespace MultiSF.Models
{
    public partial class Region
    {
        public Region()
        {
            Ciudads = new HashSet<Ciudad>();
        }

        public short Codigo { get; set; }
        public string Nombre { get; set; }
        public string NombreOficial { get; set; }
        public int CodigoLibroClaseElectronico { get; set; }

        public virtual ICollection<Ciudad> Ciudads { get; set; }
    }
}
