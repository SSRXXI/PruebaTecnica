import React, { Fragment } from 'react'

export default function ComunaItem({comunas}) {
    return (    
        <Fragment>
        <option >Selecione Comuna</option>
        {comunas.map(comuna => ( <option key={comuna.codigo}>{comuna.nombre}</option>))}
        </Fragment>
      
    )
}
