import React, { Fragment } from 'react'

export default function ComunaItem({comunas}) {
    return (    
        <Fragment>
        <option value="0">Selecione Comuna</option>
        {comunas.map(comuna => ( <option key={comuna.nombre+comuna.codigo} value={comuna.nombre+comuna.codigo}>{comuna.nombre}</option>))}
        </Fragment>
      
    )
}
