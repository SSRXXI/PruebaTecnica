import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// View Components
import Home from './core/Home';
import Signup from './core/Signup'
import Signin from './core/Signin'
import AddCurso from './core/AddCurso'
import AddCategory from './core/AddCategory'
import Curso from './core/Curso';
import Question from './core/Question';

// Functional Components

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/curso/:cursoId" exact component={Curso}/>
        <Route path="/question/questionRand" exact component={Question}/>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/addcategory" exact component={AddCategory}/>
        <Route path="/addcurso" exact component={AddCurso}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;