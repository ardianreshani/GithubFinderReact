import React, {useContext}from 'react';
import Useritem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/GithubContext';
const Users = () =>{
  const githubContext =useContext(GithubContext);
    const{loading, users} = githubContext;
    if(loading){
      return <Spinner />
    }else {
      return (
        <div style={userStyle}>
          {users.map( user => 
            (
             <Useritem  key={user.id} user={user}/>
            ))}
        </div>)
    }
    }
   
const userStyle = {
  display:'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}
export default Users
