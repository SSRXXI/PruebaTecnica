import React, {useState, useEffect} from 'react';
import { read } from './apiCore';
import Card from './Card';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Curso = (props) => {
  const [curso, setCurso] = useState({});
  const [error, setError] = useState(false);
  const style = {
    width: '100vh',
    height: '100vh',
    listStyle: 'none',
    display: 'flex',
    justifyContent:'center', 
    alignItems:'center'
  }

  const loadSingleCurso = cursoId => {
    read(cursoId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCurso(data);
      }
    });
  }

  useEffect(() => {
    const parameter = props.match.params.parameter;
    loadSingleCurso(parameter);
  }, [props])

  return (
    <>
    <Navigation/>
    <div className="container">
      <h2 className="mt-3">Bienvenido al curso</h2>
    </div>
    </>
  )
}

export default Curso;