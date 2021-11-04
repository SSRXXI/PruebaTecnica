using System;
using System.Collections.Generic;

#nullable disable

namespace MultiSF.Models
{
    public partial class PersonaFull
    {
        public Guid Id { get; set; }
        public string Run { get; set; }
        public int RunCuerpo { get; set; }
        public string RunDigito { get; set; }
        public string Nombre { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Email { get; set; }
        public short SexoCodigo { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public short? RegionCodigo { get; set; }
        public short? CiudadCodigo { get; set; }
        public short? ComunaCodigo { get; set; }
        public string NombreRegion { get; set; }
        public string NombreCiudad { get; set; }
        public string NombreComuna { get; set; }

        public string Direccion { get; set; }
        public int? Telefono { get; set; }
        public string Observaciones { get; set; }

        public virtual Comuna Comuna { get; set; }
        public virtual Sexo SexoCodigoNavigation { get; set; }
    }
}
