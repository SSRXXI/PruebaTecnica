import React, { Fragment, useState, useRef, useEffect } from 'react';
import CiudadItem from './components/CiudadItem';
import ComunaItem from './components/ComunaItem';
import { PersonaList } from './components/PersonaList';
import RegionItem from './components/RegionItem';
import SexoItem from './components/SexoItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
export function App() {

    const baseUrl = 'api/'
    useEffect(() => {
        getData();
    }, []);

    //Arreglos
    const [comunasData, setComunasData] = useState([]);
    const [regionesData, setRegionesData] = useState([]);
    const [ciudadesData, setCiudadesData] = useState([]);
    const [sexoData, setSexoData] = useState([]);

    const [personaActualizar, setPersonaActualizar] = useState();

    //Arreglos para la vista
    const [personas, setPersonas] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [regiones, setRegiones] = useState([]);
    const [ciudades, setCiudades] = useState([]);
   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const abrirModalActualizar = (id) =>{
         const persona = personas.filter(p => p.id === id);
         handleShow();
       
        sexoInputActualizar(persona[0].sexocodigo)
        setPersonaActualizar(persona[0]);
        //cargardatos(persona);
      

    }
    const cargardatos = (persona) =>{
        nombreInputActualizar.current.value = persona[0].nombre;
        apellidoMInputActualizar.current.value  = persona[0].apellidoMaterno;
        apellidoAInputActualizar.current.value  = persona[0].apellidoPaterno;
        rutInputActualizar.current.value  = persona[0].run;
        emailInputActualizar.current.value  =  persona[0].email;
        telefonoInputActualizar.current.value  =  persona[0].telefono;
        fechaNacInputActualizar.current.value  =  persona[0].fechaNacimiento;
   
        direccionInputActualizar.current.value  =  persona[0].direccion;
        observacionesInputActualizar.current.value  =  persona[0].observaciones;
    }
    const actualizarPersona = () => {
        const ciudad = selectCiudadActualizar.current.value;
        const ciudadCodigo = ciudadesData.filter(c => c.nombre+c.codigo === ciudad)

        const comuna = selectComunaActualizar.current.value;
        const comunaCodigo = comunasData.filter(c => c.nombre+c.codigo === comuna)

        const region = selectRegionActualizar.current.value;
        const regionCodigo = regionesData.filter(c => c.codigo.toString() === region)

        const persona = {
        id : personaActualizar.id,
        runCuerpo: 0,
        runDigito: "1",
       
        nombres: nombreInputActualizar.current.value,
        apellidoPaterno: apellidoAInputActualizar.current.value,
        apellidoMaterno: apellidoMInputActualizar.current.value,
        email: emailInputActualizar.current.value,
        sexoCodigo: codigoSexoActualizar,
        fechaNacimiento: fechaNacInputActualizar.current.value,
        regionCodigo: regionCodigo[0].codigo,
        ciudadCodigo: ciudadCodigo[0].codigo,
        comunaCodigo: comunaCodigo[0].codigo,
        direccion: direccionInputActualizar.current.value,
        telefono: telefonoInputActualizar.current.value,
        observaciones: observacionesInputActualizar.current.value}

        axios.put(baseUrl+"persona/"+persona.id, persona).then(response => acutalizarPersonas());
        handleClose();
            
        
    }

    //Referencias
    const nombreInput = useRef();
    const apellidoMInput = useRef();
    const apellidoAInput = useRef();
    const rutInput = useRef();
    const emailInput = useRef();
    const telefonoInput = useRef();
    const fechaNacInput = useRef();
    const selectComuna = useRef();
    const selectRegion = useRef();
    const selectCiudad = useRef();
    const direccionInput = useRef();
    const observacionesInput = useRef();
    const [codigoSexo, setCodigoSexo]= useState(0);
    const sexoInput = (cx) =>{
        setCodigoSexo(cx);
    };

    const nombreInputActualizar = useRef('');
    const apellidoMInputActualizar = useRef();
    const apellidoAInputActualizar = useRef();
    const rutInputActualizar = useRef();
    const emailInputActualizar = useRef();
    const telefonoInputActualizar = useRef();
    const fechaNacInputActualizar = useRef();
    const selectComunaActualizar = useRef();
    const selectRegionActualizar = useRef();
    const selectCiudadActualizar = useRef();
    const direccionInputActualizar = useRef();
    const observacionesInputActualizar = useRef();
    const [codigoSexoActualizar, setCodigoSexoActualizar]= useState(0);
    const sexoInputActualizar = (cx) =>{
        setCodigoSexoActualizar(cx);
    };
 
    

    const acutalizarPersonas = async () => {
        const respPersonas = await fetch(baseUrl + 'persona');
        const personasData = await respPersonas.json();
        setPersonas(personasData);
    }
     const deletePersona =  (id) =>{
        axios.delete(baseUrl+"persona/"+id)
         .then(response => acutalizarPersonas() );
      }
    const getData = async () => {
        //Traer Personas
        const respPersonas = await fetch(baseUrl + 'persona');
        const personasData = await respPersonas.json();
        setPersonas(personasData);

        //Traer Regiones
        const respRegiones = await fetch(baseUrl + 'region');
        const regionJson = await respRegiones.json();
        setRegionesData(regionJson);
        setRegiones(regionJson);

        //Traer Comunas
        const respComunas = await fetch(baseUrl + 'comuna');
        const comunaJson = await respComunas.json();
        setComunasData(comunaJson);
        setComunas(comunaJson);

        //Traer Ciudades
        const respCiudades = await fetch(baseUrl + 'ciudad');
        const ciudadJSON = await respCiudades.json();
        setCiudadesData(ciudadJSON);
        setCiudades(ciudadJSON);

        //Traer Sexos
        const respSexos = await fetch(baseUrl + 'sexo');
        const sexoJson = await respSexos.json();
        setSexoData(sexoJson);


    }



    const agregarPersona =  () => {
        const ciudad = selectCiudad.current.value;
        const ciudadCodigo = ciudadesData.filter(c => c.nombre+c.codigo === ciudad)

        const comuna = selectComuna.current.value;
        const comunaCodigo = comunasData.filter(c => c.nombre+c.codigo === comuna)

        const region = selectRegion.current.value;
        const regionCodigo = regionesData.filter(c => c.codigo.toString() === region)

        const persona = {
        runCuerpo: 0,
        runDigito: "1",
       
        nombres: nombreInput.current.value,
        apellidoPaterno: apellidoAInput.current.value,
        apellidoMaterno: apellidoMInput.current.value,
        email: emailInput.current.value,
        sexoCodigo: codigoSexo,
        fechaNacimiento: fechaNacInput.current.value,
        regionCodigo: regionCodigo[0].codigo,
        ciudadCodigo: ciudadCodigo[0].codigo,
        comunaCodigo: comunaCodigo[0].codigo,
        direccion: direccionInput.current.value,
        telefono: telefonoInput.current.value,
        observaciones: observacionesInput.current.value}

        axios.post(baseUrl+"persona", persona)
        .then(response => acutalizarPersonas() );

    };

    const filtraCiudadesYComunas = () => {
        let region = selectRegion.current.value;
        if (region === "0") {
            setComunas(comunasData);
            setCiudades(ciudadesData);
            return;
        }
        const filtrarCoumnas = comunasData.filter(c => c.regionCodigo.toString() === region)
        setComunas(filtrarCoumnas)
        const filtrarCiudades = ciudadesData.filter(c => c.regionCodigo.toString() === region)
        setCiudades(filtrarCiudades)
    }
    const filtrarCoumnas = () => {
        let ciudad = selectCiudad.current.value;
        if (ciudad === "0") {
            setComunas(comunasData);
            setCiudades(ciudadesData);
            return;
        }
        const ciudadSelected = ciudadesData.filter(c => c.nombre + c.codigo === ciudad)
        const region = regionesData.filter(r => r.codigo === ciudadSelected[0].regionCodigo)
        const filtrarCoumnas = comunasData.filter(c => c.ciudadCodigo === ciudadSelected[0].codigo && c.regionCodigo === region[0].codigo)
        selectRegion.current.value = region[0].codigo;
        setComunas(filtrarCoumnas)
    }
    const filtrarCiudadyRegion = () => {

        let comuna = selectComuna.current.value;
        if (comuna === "0") {
            setComunas(comunasData);
            setCiudades(ciudadesData);
            return;
        }


        const comunaSelect = comunasData.filter(c => c.nombre + c.codigo === comuna);
        const ciudad = ciudadesData.filter(r => r.codigo === comunaSelect[0].ciudadCodigo && r.regionCodigo === comunaSelect[0].regionCodigo);
        const region = regionesData.filter(r => r.codigo === ciudad[0].regionCodigo);
        selectRegion.current.value = region[0].codigo;
        selectCiudad.current.value = ciudad[0].nombre + ciudad[0].codigo;

    }

    return (
        <Fragment>
            <Container>
                <h1>Prueba Tecnica - Mantenedor de Personas</h1>
                <Form>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Control ref={rutInput} type="text" placeholder="RUT" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control ref={apellidoAInput} type="text" placeholder="Apellido Paterno" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Control ref={nombreInput} type="text" placeholder="Nombres" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control ref={apellidoMInput} type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row className="mb-3">
                         <Col xs={12} md={3}>
                            <label>Sexo</label>
                            <br/>
                             <SexoItem sexo={sexoData} sexoInput={sexoInput} />
                        </Col>
                    
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Control type="date" ref={fechaNacInput} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Control ref={emailInput} type="text" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>

                            <Form.Group className="mb-3">
                                <Form.Control ref={telefonoInput} type="text" placeholder="Telefono" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={3}>
                            <Form.Select className="mb-3" onChange={filtraCiudadesYComunas} ref={selectRegion}>
                                <RegionItem regiones={regiones} />
                            </Form.Select>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Select className="mb-3" onChange={filtrarCoumnas} ref={selectCiudad}>
                                <CiudadItem ciudades={ciudades} />
                            </Form.Select>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Select className="mb-3" onChange={filtrarCiudadyRegion} ref={selectComuna}>
                                <ComunaItem comunas={comunas} />
                            </Form.Select>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control className="mb-3" ref={direccionInput} type="text" placeholder="Direccion" />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                        <FloatingLabel controlId="floatingTextarea2" label="Observaciones">
                        <Form.Control className="mb-3"
                            ref={observacionesInput}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Button onClick={agregarPersona}>Agregar Persona</Button>
                        </Col>
                    </Row>





                </Form>
                <PersonaList personas={personas} deletePersona={deletePersona} actualizarPersona={abrirModalActualizar}/>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Persona</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Form>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Control ref={rutInputActualizar} type="text" placeholder="RUT" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control ref={apellidoAInputActualizar} type="text" placeholder="Apellido Paterno" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Control ref={nombreInputActualizar} type="text" placeholder="Nombres" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control ref={apellidoMInputActualizar} type="text" placeholder="Apellido Materno" />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row className="mb-3">
                         <Col xs={12} md={3}>
                            <label>Sexo</label>
                            <br/>
                             <SexoItem sexo={sexoData} sexoInput={sexoInputActualizar} />
                        </Col>
                    
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Control type="date" ref={fechaNacInputActualizar} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group className="mb-3">
                                <Form.Control ref={emailInputActualizar} type="text" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>

                            <Form.Group className="mb-3">
                                <Form.Control ref={telefonoInputActualizar} type="text" placeholder="Telefono" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={3}>
                            <Form.Select className="mb-3" onChange={filtraCiudadesYComunas} ref={selectRegionActualizar}>
                                <RegionItem regiones={regiones} />
                            </Form.Select>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Select className="mb-3" onChange={filtrarCoumnas} ref={selectCiudadActualizar}>
                                <CiudadItem ciudades={ciudades} />
                            </Form.Select>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Select className="mb-3" onChange={filtrarCiudadyRegion} ref={selectComunaActualizar}>
                                <ComunaItem comunas={comunas} />
                            </Form.Select>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control className="mb-3" ref={direccionInputActualizar} type="text" placeholder="Direccion" />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                        <FloatingLabel controlId="floatingTextarea2" label="Observaciones">
                        <Form.Control className="mb-3"
                            ref={observacionesInputActualizar}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        </Col>
                    </Row>

                </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="success" onClick={()=>actualizarPersona(personaActualizar)}>
                        Actualizar
                    </Button>
                </Modal.Footer>
        </Modal>
            



        </Fragment>

    )
}