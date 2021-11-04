import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getRandomQuestion } from './apiCore';
import { testResult } from './apiCore';
import Card from './Card';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';
import './Question.css';
import { Link, animateScroll as scroll } from "react-scroll";
var btn_variant = "warning";

const Question = (props) => {

  const [question, setQuestion] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [correctas, setCorrectas] = useState(0);
  const [incorrectas, setIncorrectas] = useState(0);
  const [pulsadas, setPulsadas] = useState(0);
  const [seleccionada, setSeleccionada] = useState('');
  const [siguiente, setSiguiente] = useState(false);
  const [alternativas, setAlternativas] = useState([]);
  const [colorProgress, setColorProgress] = useState('#B10101');
  const [percentProgress, setPercentProgress] = useState(0);
  const [palabraNext, setPalabraNext] = useState('Siguiente');

  useEffect(() => {
    alert("Hiii!!");
    loadSingleQuestion();
  },[]);

  const style = {
    height: '100vh',
    listStyle: 'none',
    display: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const esCorrecta = (...Alternativa) => {
    var color = 0;
    setSiguiente(false)
    setSeleccionada(Alternativa)
    setPulsadas(pulsadas+1)
    setAlternativas(Alternativas)
    Alternativas = Alternativas
    if (pulsadas>=9){
      setPalabraNext('Finalizar')
    }
    if (Alternativa == Correcta) {
      setPercentProgress(percentProgress+10)
      setColorProgress(color=(percentProgress+10>39 && percentProgress+10<80)?'#FFE700':percentProgress+10>=80?'#58D009':'#B10101');
      setCorrectas(correctas + 1)
    } else {
      setIncorrectas(incorrectas + 1)
    }

  }

  function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  const btnSiguiente = () => {
    setSiguiente(true)
    setSeleccionada('');
    
    if (pulsadas < 9){
      loadSingleQuestion();
      
    }
    if (pulsadas == 9){
   
    }
  }

  const loadSingleQuestion = questionRand => {
    getRandomQuestion(questionRand).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setQuestion(data);
      }
    });
  }
  
  var Correcta = question.letterA;
  var Alternativas = [];
  if (siguiente || pulsadas == 0){
    
    Alternativas[0] = question.letterA;
    Alternativas[1] = question.letterB;
    Alternativas[2] = question.letterC;
    Alternativas[3] = question.letterD;
    Alternativas[4] = question.letterE;
    Alternativas = shuffle(Alternativas);
    
  }else{
    Alternativas[0] = alternativas[0];
    Alternativas[1] = alternativas[1];
    Alternativas[2] = alternativas[2];
    Alternativas[3] = alternativas[3];
    Alternativas[4] = alternativas[4];
  }


  return (
    <>
      <Navigation />
      <div className="container">
        {
          question &&
          <div style={style}>
            <div className="justify-content">
              <div className="row">
                <div className="col-lg mt-2" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', textAlign: "right" }}>
                  {(() => {
                      return<ProgressBar
                        bgcolor={colorProgress}
                        completed={percentProgress}
                      />
                  })()}

                </div>
              </div>
              <h2 className="mt-4" style={{ fontSize: '20px'}}>{question.question}</h2>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-lg-8">
                  {
                      Alternativas.map((alternativa, i) => {
                        if (alternativa != undefined){
                          return <span>
                          <Link to="btnSiguiente" 
                          activeClass="active" 
                          spy={true}
                          smooth={true}
                          offset={-10}
                          duration={1600}
                          
                          >
                            <Button id={alternativa} style={{ fontSize: '14px'}} className="mt-1" onClick={() => esCorrecta(alternativa)} variant={
                            alternativa == Correcta && alternativa == seleccionada ? 'success' :
                              alternativa != Correcta && alternativa == seleccionada ? 'danger' : 'warning'} alternativa={alternativa}>{alternativa}</Button>
                            </Link>
                              <br /><br /></span>
                        }     
                      })}
                  </div>
                  <div className="col-lg-4" style={{ visibility: pulsadas == 10 ? 'visible' : 'hidden', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', textAlign: "right" }}>
                    <h2 style={{ visibility: pulsadas == 10 ? 'visible' : 'hidden' }}
                    >
                      {(() => {
                    if (correctas >= 8) {
                      return <h2 style={{ fontSize: '18px', color: 'green' }}>Felicidades, nivel superado!</h2>

                    }
                    else if(correctas >= 4 && correctas <=7){
                      return <h2 style={{ fontSize: '18px', color: 'yellow' }}>Buen desempeño, pero debemos mejorar algunas cosas!</h2>
                    }
                    else{
                      return <h2 style={{ fontSize: '18px', color: 'red' }}>Estudiar mejor esta sección puede ser una buena opción!</h2>
                    }
                  })()}
                      Preguntas respondidas: {pulsadas}<br /><br />
                      Preguntas correctas: {correctas}<br /><br />
                      Preguntas incorrectas: {incorrectas}<br /><br />
                    </h2>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 mt-3">
                {
                  <span id="btnSiguiente" style={{visibility: seleccionada!='' ? 'visible' : 'hidden'}} onClick={() => btnSiguiente()}><Button variant="secondary" size="lg">
                    {palabraNext}                    
                  </Button>
                  </span>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}


export default Question;