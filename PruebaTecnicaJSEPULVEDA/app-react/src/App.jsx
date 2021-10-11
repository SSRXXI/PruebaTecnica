import React, {Fragment, useState, useRef, useEffect} from 'react';
import ComunaItem from './components/ComunaItem';
import { PersonaList } from './components/PersonaList';
export function App(){

    const baseUrl = 'api/'
    //Arreglos
    const [personas, setPersonas] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [regiones, setRegiones] = useState([]);
    
    //Referencias
    const todoInputRef = useRef();

    const getData = async () => {
    //Traer Personas
    const respPersonas = await fetch(baseUrl+'persona');
    const personasData = await respPersonas.json();
    setPersonas(personasData);

    //Traer Regiones
    const respRegiones = await fetch(baseUrl+'region');
    const regionesData = await respRegiones.json();
    setRegiones(regionesData);

     //Traer Comunas
     const respComunas = await fetch(baseUrl+'comuna');
     const comunasData = await respComunas.json();
     setComunas(comunasData);
       
        
    }
    useEffect(()=>{
        getData();
    },[]);

    const agregarPersona = () => {
        
        const persona = todoInputRef.current.value;
        if(persona === '') return;
        todoInputRef.current.value = null;
    };

    return (
       <Fragment>

            <input ref={todoInputRef}type="text" placeholder="Nueva Persona"/>
            <select>
                <ComunaItem comunas={comunas}/>
            </select>
            <button onClick={agregarPersona}>Agregar</button>
            <button>Eliminar</button>
          { <PersonaList personas={personas}/>}
            
          
       
       </Fragment>
        
        )
}