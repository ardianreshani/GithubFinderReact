import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User'
import axiso from 'axios';
import GithubState from './context/github/GithubState'
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
 


// get single github user

 const getUser = async(username) =>{
  setLoading(true);
  const res = await axiso.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);
 setUser(res.data);
  setLoading(false);
}

const getUserRepos = async(username) =>{
  setLoading(true);
  const res = await axiso.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);
  setRepos(res.data);
  setLoading(false);
}

 //clear users frin state
 const clearUsers = () =>{
  setUsers([]);
  setLoading(false);
 };

 const showAlert = (msg, type) => {
    setAlert(  { msg , type});
   setTimeout( () => setAlert(null), 3000)
 }
    return  (
      <GithubState>
      <Router>
      <div className='app'>
        <Navbar/>
        <div className='container'>
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={ props => (
              <Fragment>
                <Search   clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert}/>
              <Users/>
              </Fragment>
            )}/>
            <Route exact path="/about" component={About} />
            <Route exact path='/user/:login' render={props => (
              <User { ...props } getUser={getUser}  getUserRepos={getUserRepos}  repos={repos} user={user} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
  
 
}

export default App;
