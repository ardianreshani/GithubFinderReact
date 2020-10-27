import React, { useReducer } from 'react';
import axiso from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
  SEARCH_USERS,
  SET_ALERT,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
} from '../../Types';

let githubClientID;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
  githubClientID = process.env.REACT_APP_GITHUB_ID;
  githubClientSecret=process.env.REACT_APP_GITHUB_SECRET_ID;
} else {
  githubClientID = process.env.APP_GITHUB_ID;
  githubClientSecret=process.env.APP_GITHUB_SECRET_ID;
}
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search Users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axiso.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };
  //get user
  const getUser = async (username) => {
    setLoading();
    const res = await axiso.get(
      `https://api.github.com/users/${username}?client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };
  // get Repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axiso.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientID}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  };
  //clear user
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {' '}
      {props.children}{' '}
    </GithubContext.Provider>
  );
  //set loading
};

export default GithubState;
