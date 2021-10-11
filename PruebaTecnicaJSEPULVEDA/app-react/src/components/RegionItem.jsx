import React, { Fragment } from 'react'

export default function RegionItem({regiones}) {
    return (    
        <Fragment>
        <option value="0">Selecione Region</option>
        {regiones.map(region => ( <option key={region.nombre} value={region.codigo}>{region.nombre}</option>))}
        </Fragment>
      
    )
}
