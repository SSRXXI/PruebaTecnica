using System;
using System.Collections.Generic;

#nullable disable

namespace MultiSF.Models
{
    public partial class Ciudad
    {
        public Ciudad()
        {
            Comunas = new HashSet<Comuna>();
        }

        public short RegionCodigo { get; set; }
        public short Codigo { get; set; }
        public string Nombre { get; set; }

        public virtual Region RegionCodigoNavigation { get; set; }
        public virtual ICollection<Comuna> Comunas { get; set; }
    }
}
