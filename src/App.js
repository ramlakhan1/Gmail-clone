import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { Counter, selectSendMessageIsOpen } from './features/mailSlice';
import Header from './Header'
import Sidebar from './Sidebar'
import Mail from "./Mail"
import EmailList from "./EmailList"
import './App.css';
import {BrowserRouter as Router, Switch, Route,Links} from 'react-router-dom';
import SendMail from './SendMail';
import { useSelector } from 'react-redux';
import { login, selectUser } from './features/userSlice';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const sendMessageIsOpen  = useSelector(selectSendMessageIsOpen);
  const users = useSelector(selectUser);

  useEffect(() => {
       auth.onAuthStateChanged(user => {
         if(user){
           dispatch(login({
             displayName: user.displayName,
             email: user.email,
             photoUrl: user.photoURL,
           }))
         }
       })
  },[])
  return (
    <Router>
      {!users ? (
        <Login />
      ):(
    <div className="App">
      <Header />
      <div className="app__body">
    <Sidebar />
    <Switch>
      <Route path="/mail">
        <Mail/>
      </Route>
      <Route path="/">
        <EmailList />
      </Route>
    </Switch>
    </div>
    {sendMessageIsOpen && <SendMail /> }
    </div>
      )}
    </Router>
  );
}

export default App;
