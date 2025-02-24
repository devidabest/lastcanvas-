import MiddleComponent from './MiddleComponent';
import LeftComponent from './Left_component'; 
import React from 'react';
import SecondPage from './SecondPage/SecondPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className=" bg-gray-100">
      <Switch>
        <Route exact path="/"  >

           <MiddleComponent/>
           <LeftComponent/>
         

        </Route>

        <Route path="/SecondPage">

           <SecondPage/>

        </Route>

      </Switch>
    </div>

    </Router>
  );
}

export default App;
