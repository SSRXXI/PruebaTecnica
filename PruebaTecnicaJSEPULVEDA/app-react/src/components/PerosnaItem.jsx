import React, { Fragment } from 'react'

export  function PerosnaItem({persona}) {
    const {id, nombre, email} = persona
    return (
        <Fragment>
        <tr>
           <td>
                {nombre} 
           </td>
           <td>
                {email} 
           </td>
        
        </tr>
        </Fragment>
       
    )
}
