import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User'
import axiso from 'axios';
import './App.css';

class App  extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }
 searchUsers = async (text) => {
  this.setState({loading:true})
  const res = await axiso.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);
  this.setState({users: res.data.items, loading:false });
 }

// get single github user

getUser = async(username) =>{
  this.setState({loading:true})
  const res = await axiso.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);
 
  this.setState({user: res.data, loading:false });
}

getUserRepos = async(username) =>{
  this.setState({loading:true})
  const res = await axiso.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);
 
  this.setState({repos: res.data, loading:false });
}

 //clear users frin state
 clearUsers = () => this.setState({users: [], loading: false});

 setAlert = (msg, type) => {
   this.setState({alert: {msg: msg , type :type}});

   setTimeout( () => this.setState({alert: null}), 3000)
 }
  render(){
      const { users,user ,loading, repos} = this.state;
    return  (
      <Router>
      <div className='app'>
        <Navbar/>
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={ props => (
              <Fragment>
                <Search searchUsers={this.searchUsers}  clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert}/>
              <Users  loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path="/about" component={About} />
            <Route exact path='/user/:login' render={props => (
              <User { ...props } getUser={this.getUser}  getUserRepos={this.getUserRepos}  repos={repos} user={user} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
 
}

export default App;
