import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axiso from 'axios';
import './App.css';

class App  extends Component {
  state = {
    users: [],
    loading: false
  }
 async componentDidMount(){
   this.setState({loading:true})
   const res = await axiso.get('https://api.github.com/users');

   this.setState({users: res.data, loading:false });
 }
  render(){
      
    return  (
      <div className='app'>
        <Navbar/>
        <div className='container'>
        <Users  loading={this.state.loading} users={this.state.users}/>
        </div>
        
      </div>
  
    );
  }
 
}

export default App;
