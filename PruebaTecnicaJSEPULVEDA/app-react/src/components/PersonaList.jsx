import React, {Fragment} from 'react'
import {Table} from 'react-bootstrap';
import { PerosnaItem } from './PerosnaItem'

export function PersonaList({personas, deletePersona, actualizarPersona}) {
   
    return (
      <Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Rut</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                    <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map(persona => ( <PerosnaItem key={persona.id} persona={persona} deletePersona = {deletePersona} actualizarPersona= {actualizarPersona}></PerosnaItem>))}
                </tbody>
            </Table>
      </Fragment>
            
            

       
    )
}


