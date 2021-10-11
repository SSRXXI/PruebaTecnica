import React, { Fragment } from 'react'

export default function CiudadItem({ciudades}) {
    return (    
        <Fragment>
        <option value="0">Selecione Ciudad</option>
        {ciudades.map(ciudad => ( <option key={ciudad.nombre+ciudad.codigo} value={ciudad.nombre+ciudad.codigo}>{ciudad.nombre}</option>))}
        </Fragment>
      
    )
}
