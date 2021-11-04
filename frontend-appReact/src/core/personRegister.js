import React, { Component } from "react";
import axios from "axios";

import {
  Button,
  Card,
  CardFooter,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { bool } from "prop-types";


class personRegister extends Component {

    componentGetRegiones() {
        axios
          .get('https://localhost:44360/api/Region')
          .then((response) => {
           this.setState({regiones:response.data})
        }) 
        .catch((error) => {
            console.log(error);
        })   
      }
    
      componentGetCiudades(idRegion) {
        axios
          .get('https://localhost:44360/api/Ciudad/'+idRegion)
          .then((response) => {
           this.setState({ciudades:response.data})
        }) 
        .catch((error) => {
            console.log(error);
        })   
      }
    
      componentGetComunas(idCiudad, idRegion) {
        axios
          .get('https://localhost:44360/api/Comuna/'+idCiudad+'/'+idRegion)
          .then((response) => {
           this.setState({comunas:response.data})
        }) 
        .catch((error) => {
            console.log(error);
        })   
      }

  constructor() {
    super();

    this.state = {
        id: "",
        run: "", 
        runCuerpo: "",
        runDigito: "",
        nombre: "",
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        sexoCodigo: 0,
        fechaNacimiento: "",
        regionCodigo: 0,
        ciudadCodigo: 0,
        comunaCodigo: 0,
        direccion: "",
        telefono: 0,
        observaciones: "",
        comuna: "",

        regiones:[],
        ciudades:[],
        comunas:[]
    };

    this.Run = this.Run.bind(this);
    this.Dv = this.Dv.bind(this);
    this.Nombres = this.Nombres.bind(this);
    this.ApellidoPaterno = this.ApellidoPaterno.bind(this);
    this.ApellidoMaterno = this.ApellidoMaterno.bind(this);
    this.Email = this.Email.bind(this);
    this.Sexo = this.Sexo.bind(this);
    this.FechaNac = this.FechaNac.bind(this);
    this.Region = this.Region.bind(this);
    this.Ciudad = this.Ciudad.bind(this);
    this.Comuna = this.Comuna.bind(this);
    this.Direccion = this.Direccion.bind(this);
    this.Telefono = this.Telefono.bind(this);
    this.Observaciones = this.Observaciones.bind(this);
    
    this.regiones = this.componentGetRegiones();
    
    this.register = this.register.bind(this);

  }

  Run(event) {
    this.setState({ Run: event.target.value });
  }
  Dv(event) {
    this.setState({ Dv: event.target.value });
  }
  Nombres(event) {
    this.setState({ Nombres: event.target.value });
  }
  ApellidoPaterno(event) {
    this.setState({ ApellidoPaterno: event.target.value });
  }
  ApellidoMaterno(event) {
    this.setState({ ApellidoMaterno: event.target.value });
  }

  Email(event) {
    this.setState({ Email: event.target.value });
  }
  Sexo(event) {
    this.setState({ Sexo: event.target.value });
  }
  FechaNac(event) {
    this.setState({ FechaNac: event.target.value });
  }
  Region(event) {
    this.setState({ Region: event.target.value });
  }
  Ciudad(event) {
    this.setState({ Ciudad: event.target.value });
  }
  Comuna(event) {
    this.setState({ Comuna: event.target.value });
  }
  Direccion(event) {
    this.setState({ Direccion: event.target.value });
  }
  Telefono(event) {
    this.setState({ Telefono: event.target.value });
  }
  Observaciones(event) {
    this.setState({ Observaciones: event.target.value });
  }

  Regiones(event) {
    this.ciudades = this.componentGetCiudades({Regiones : event.target.value});
  }

  Ciudades(event) {
    this.ciudades = this.componentGetCiudades(event.target.value);
  }


  register(event) {

    const data = {
    run: this.state.Run, 
    //runCuerpo : "",
    runDigito: this.state.Dv,
    //nombre: "",
    nombres: this.state.Nombres,
    apellidoPaterno: this.state.ApellidoPaterno,
    apellidoMaterno: this.state.ApellidoMaterno,
    email: this.state.Email,
    sexoCodigo: this.state.Sexo,
    //fechaNacimiento: this.state.FechaNac,
    regionCodigo: this.state.Region,
    ciudadCodigo: this.state.Ciudad,
    //comunaCodigo: this.state.Comuna,
    direccion: this.state.Direccion,
    telefono: this.state.Telefono,
    observaciones: this.state.Observaciones,
    //comuna: this.state.Comuna
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch("https://localhost:44360/api/Persona/Create", requestOptions)
    
      .then((Response) => Response.json())

      .then((Result) => {
        if (Result.Status == "Success") this.props.history.push("/Dashboard");
        else if (Result.Status == "Incomplete") alert("Faltan datos");
        else alert("Error desconocido");
      });
  }

  render() {
    var isRegionSelect = this.state.Regiones != undefined ? true : false;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div class="row" className="mb-2 pageheading">
                      <div class="col-sm-12 btn btn-primary">Sign Up</div>
                    </div>

                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.Run}
                        placeholder="Run"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.Dv}
                        placeholder="Dv"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.Nombres}
                        placeholder="Nombre"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.ApellidoPaterno}
                        placeholder="Apellido Paterno"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.ApellidoMaterno}
                        placeholder="Apellido Materno"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        onChange={this.Email}
                        placeholder="Email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="date"
                        onChange={this.FechaNac}
                        placeholder="Fecha de Nacimiento"
                      />
                    </InputGroup>

                    {/* <InputGroup className="mb-3">
                      <Input
                        type="number"
                        onChange={this.Region}
                        placeholder="Región"
                      />
                    </InputGroup> */}

                    <InputGroup className="mb-3">
                      <Input
                        type="number"
                        onChange={this.Ciudad}
                        placeholder="Ciudad"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="number"
                        onChange={this.Comuna}
                        placeholder="Comuna"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <select className="form-control" onKeyUp={this.Ciudades} onChange={this.Ciudades} onClick={this.Ciudades}>
                        {
                        this.state.regiones.map(elemento=>(
                           <option onClick={this.Ciudades} onKeyUp={this.Ciudades} onChange={this.Ciudades} key={elemento.nombreOficial} value={elemento.codigo}>{elemento.nombreOficial}</option> 
                        )
                        )}
                    </select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <select className="form-control" style={{ visibility: isRegionSelect == true ? 'visible' : 'hidden'}}>
                        {
                          this.state.regiones.map(elemento=>(
                            <option key={elemento.nombreOficial} value={elemento.codigo}>{elemento.nombreOficial}</option> 
                         )
                         )}
                        
                    </select>
                    </InputGroup>
                    
                    <Button onClick={this.register} color="success" block>
                      Registrar Usuario
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default personRegister;