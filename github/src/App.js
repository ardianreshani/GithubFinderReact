import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'
import axiso from 'axios';
import './App.css';

class App  extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }
//  async componentDidMount(){
//    this.setState({loading:true})
//    const res = await axiso.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);

//    this.setState({users: res.data, loading:false });
//  }
 searchUsers = async (text) => {
  this.setState({loading:true})
  const res = await axiso.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);
  this.setState({users: res.data.items, loading:false });
 }
 //clear users frin state
 clearUsers = () => this.setState({users: [], loading: false});

 setAlert = (msg, type) => {
   this.setState({alert: {msg: msg , type :type}});

   setTimeout( () => this.setState({alert: null}), 3000)
 }
  render(){
      const { users, loading} = this.state;
    return  (
      <div className='app'>
        <Navbar/>
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Search searchUsers={this.searchUsers}  clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert}/>
        <Users  loading={loading} users={users}/>
        </div>
        
      </div>
  
    );
  }
 
}

export default App;
