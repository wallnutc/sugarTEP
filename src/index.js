import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Student from './student/Student';
import Lecturer from './lecturer/Lecturer';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import NotFoundPage from './404';
import Coordinator from './coordinator/Coordinator';

function prodCheck() {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}
prodCheck();
ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Switch>
    <Route path='/' exact={true} component={App} />
    <Route path='/student' component={Student} />
    <Route path='/lecturer' component={Lecturer} />
    <Route path='/coordinator' component={Coordinator}/>
        <Route exact path="/404" component={NotFoundPage}/>
        <Redirect to="/404"/>
  </Switch>
</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
