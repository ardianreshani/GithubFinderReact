import React, {useReducer} from 'react';
import axiso from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
  SEARCH_USERS,
  SET_ALERT,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING
} from '../../Types';


const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search Users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axiso.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_ID}`);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
    
   }
  //get user

  // get Repos 

  //clear user 

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING});

  return <GithubContext.Provider value={{
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchUsers
  }}> {props.children} </GithubContext.Provider>
  //set loading
}

export default GithubState;