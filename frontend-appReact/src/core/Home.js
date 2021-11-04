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
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navheader">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/Registro"} className="nav-link">
                  Registro
                </Link>
              </li>
            </ul>
          </div>
        </nav>{" "}
        <br />
        <Switch>
          <Route path="/Registro" component={personRegister} />
        </Switch>
        <Switch>
          <Route path="/Edicion" component={Dashboard} />
        </Switch>
      </div>
      <div className="listPerson">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Run</th>
            <th>Apellido Paterno</th>
          </tr>
        </thead>
        <tbody>
          {data.map(persona=>(
           <tr key={persona.id}>
           <td>{persona.id}</td>
           <td>{persona.run}</td>
           <td>{persona.apellidoPaterno}</td> 
           <td>
             <button className="btn btn-primary m-2">Editar</button>
             <button className="btn btn-danger m-2">Eliminar</button>
           </td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Router>
  );
}

export default Home;