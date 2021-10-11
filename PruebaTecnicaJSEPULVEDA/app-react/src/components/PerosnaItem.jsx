import {Button, Modal} from 'react-bootstrap';
import React, { Fragment, useState } from 'react'

export  function PerosnaItem({persona, deletePersona, actualizarPersona}) {
    const eliminar=(id) => {
        deletePersona(id);
    }
    const actualizar=(id) => {
        actualizarPersona(id);
    }
    //Uso del Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id,run, nombre, email} = persona
    return (
        <Fragment>
        <tr>
            <td>
                {run}
           </td>
           <td>
                {nombre}
           </td>
           <td>
                {email}
           </td>
           <td>
               <Button variant="danger" onClick={handleShow} >Eliminar</Button>
               {/* onClick={eliminar(id)} */}
           </td>
           <td>
               <Button  variant="success" onClick={()=>actualizar(id)}>Actualizar</Button>
           </td>

        </tr>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Persona</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Esta seguro que quiere eliminar a {nombre}?

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="danger" onClick={()=>eliminar(id)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
        </Modal>
        

        </Fragment>

    )
}
