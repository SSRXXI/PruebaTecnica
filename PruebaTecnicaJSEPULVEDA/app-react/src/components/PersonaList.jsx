import React, {Fragment, useState} from 'react'
import { PerosnaItem } from './PerosnaItem'

export function PersonaList({personas}) {
   
    return (
      <Fragment>
            <table>
                <thead>
                    <th>Nombre</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    {personas.map(persona => ( <PerosnaItem key={persona.id} persona={persona}></PerosnaItem>))}
                </tbody>
            </table>
      </Fragment>
            
            

       
    )
}


