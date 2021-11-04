import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import personRegister from "./personRegister";
import Dashboard from "./Dashboard";
//import listPerson from "./listPerson";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home(){
  const baseUrl = 'https://localhost:44360/api/Persona';
  const regionUrl = 'https://localhost:44360/api/Region';

  const [data, setData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminarOriginal, setModalEliminarOriginal]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState({
    id: '',
    run: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',

  })
  const seleccionarPersona=(persona, caso)=>{
    setPersonaSeleccionada(persona);
    (caso==="Editar")?
    abrirCerrarModalEditar():abrirCerrarModalEliminar();
  }


  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar)
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar)
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar)
  }

  

  const handleChange=e=>{
    const {name,value}=e.target;
    setPersonaSeleccionada({
      ...personaSeleccionada,
      [name]:value
    })
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl+"/Full")
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete personaSeleccionada.id;
    await axios.post(baseUrl, personaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data));
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPut=async()=>{
    await axios.post(baseUrl+"/"+personaSeleccionada.id, personaSeleccionada)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(persona=>{
        if(persona.id===personaSeleccionada.id){
          persona.run =respuesta.run;
          persona.nombre =respuesta.nombre;
          persona.apellidoPaterno =respuesta.apellidoPaterno;
          persona.apellidoMaterno =respuesta.apellidoMaterno;
          persona.email =respuesta.email;
          persona.telefono =respuesta.telefono;
        }
      });
      abrirCerrarModalEditar();
      setData(data.concat(response.data));
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+personaSeleccionada.id)
    .then(response=>{
      setData(data.filter(persona=>persona.id!==response.data));
      abrirCerrarModalEliminar();
      refreshPage();
    }).catch(error=>{
      console.log(error);
    })
  }

  const refreshPage=e=>{
    window.location.reload();
  }

  const peticionGetRegion=async()=>{
    await axios.get(regionUrl)
    .then(response=>{
      setRegionData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGet();
    peticionGetRegion();
  },[])

  return (
      <div className="listPerson">
        <br></br>
        <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success ml-2">Insertar nuevo registro</button>
        <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Run</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Email</th>
            <th>Telefono</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map(persona=>(
           <tr key={persona.id}>
           <td>{persona.run}</td>
           <td>{persona.nombre}</td>
           <td>{persona.apellidoPaterno}</td> 
           <td>{persona.apellidoMaterno}</td>
           <td>{persona.email}</td>  
           <td>{persona.telefono}</td>
           <td>
             <button className="btn btn-primary m-2" onClick={()=>seleccionarPersona(persona, "Editar")}>Editar</button>
             <button className="btn btn-danger m-2" onClick={()=>seleccionarPersona(persona, "Eliminar")}>Eliminar</button>
           </td>
           </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Registro</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br/>
            <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
            <label>Apellido Paterno: </label>
            <br/>
            <input type="text" className="form-control" name="apellidoPaterno" onChange={handleChange}/>
            <label>Apellido Materno: </label>
            <br/>
            <input type="text" className="form-control" name="apellidoMaterno" onChange={handleChange}/>
            <label>Email: </label>
            <br/>
            <input type="text" className="form-control" name="email" onChange={handleChange}/>
            <label>Telefono: </label>
            <br/>
            <input type="text" className="form-control" name="fechaNacimiento" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>
          <button className="btn btn-primary" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Registro</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br/>
            <input type="text" className="form-control" readOnly value={personaSeleccionada && personaSeleccionada.id}/>
            <label>Nombre: </label>
            <br/>
            <input type="text" className="form-control" name="apellidoPaterno" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.nombre}/>
            <label>Apellido Paterno: </label>
            <br/>
            <input type="text" className="form-control" name="apellidoPaterno" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.apellidoPaterno}/>
            <label>Apellido Materno: </label>
            <br/>
            <input type="text" className="form-control" name="apellidoMaterno" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.apellidoMaterno}/>
            <label>Email: </label>
            <br/>
            <input type="text" className="form-control" name="email" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.email}/>
            <label>Fecha Telefono: </label>
            <br/>
            <input type="text" className="form-control" name="telefono" onChange={handleChange} value={personaSeleccionada && personaSeleccionada.telefono}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()} >Editar</button>
          <button className="btn btn-primary" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalHeader>Eliminar Registro</ModalHeader>
        <ModalBody>
        ¿Estas seguro de eliminar este registro: {personaSeleccionada && personaSeleccionada.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()} >Si</button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminarOriginal}>
        <ModalBody>
          ¿Estas seguro de eliminar este registro? {personaSeleccionada && personaSeleccionada}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()} >Si</button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Home;