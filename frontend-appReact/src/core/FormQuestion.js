import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getRandomQuestion } from './apiCore';
import { testResult } from './apiCore';
import Card from './Card';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';
import './FormQuestion.css';
import { Link, animateScroll as scroll } from "react-scroll";
var btn_variant = "warning";

const FormQuestion = (props) => {

  const [question, setQuestion] = useState({});

  useEffect(() => {
    alert("Hiii!!");
  },[]);

  const style = {
    height: '100vh',
    listStyle: 'none',
    display: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <>
      <Navigation />
      <div className="container">
        
      </div>
    </>
  )
}


export default FormQuestion;