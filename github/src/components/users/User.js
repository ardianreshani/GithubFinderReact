import React, {Fragment , useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const User = ( {user, getUser, getUserRepos, loading, repos,match})=> {
  useEffect( () => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, [])
  

    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    }= user;
    if(loading) return<Spinner />
    return (
      <Fragment>
        <Link to='/' className='btn btn-dark'> Back to Search</Link>
          Hireable: {''}
          {hireable ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times-circle text-danger"></i>)}
          <div  className="card grid-2" > 
          <div className="all-center">
            <img src={avatar_url} className="round-img" alt="avatar" style={{ width: '150px' }}/>
            <h1>{name}</h1>
            <p>Loaction: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-primary my-1'> Visit Github Profile</a>
            <ul>
              <li>
                { login && <Fragment>
                    <strong> Username:</strong> {login}
                  </Fragment>}
              </li>
              <li>
                { company && <Fragment>
                    <strong> Company:</strong> {company}
                  </Fragment>}
              </li>
              <li>
                { blog && <Fragment>
                    <strong> Website:</strong> {blog}
                  </Fragment>}
              </li>
            </ul>
          </div>
          </div>
          <div  className='card text-center' >
              <div className="badge badge-success">
                  Followers: {followers}
              </div>  
              <div className="badge badge-dark">
                  Following: {following}
              </div>  
              <div className="badge badge-danger">
                  Public Repos: {public_repos}
              </div>  
              <div className="badge badge-primary">
                 Public Gists: {public_gists}
              </div>  
          </div>
          <Repos repos={repos} />
      </Fragment>
    )
  
}
User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos:PropTypes.func.isRequired,
}

export default User
