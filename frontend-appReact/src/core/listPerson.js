import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


/*componentGetComunas(idCiudad, idRegion) {
  axios
    .get('https://localhost:44360/api/Comuna/'+idCiudad+'/'+idRegion)
    .then((response) => {
     this.setState({comunas:response.data})
  }) 
  .catch((error) => {
      console.log(error);
  })   
} */
function listPerson(){
  const baseUrl = 'https://localhost:44360/api/Persona';
  const [data, setData] = useState([]);

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    
    <div className="listPerson">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(persona=>(
           <tr key={persona.id}>
           <td key={persona.run}></td>
           <td key={persona.apellidoPaterno}></td> 
           </tr>
          ))}
        </tbody>
      </table>
    </div>
  )};

  export default listPerson;