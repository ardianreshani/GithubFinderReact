import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

export const ReposItem = ({ repo }) => {
  return (
    <div className="card">
        <h3>
  <Link to={repo.html_url} > {repo.name}</Link>
        </h3>
    </div>
  )
}

ReposItem.protoTypes = {
  repo : PropTypes.object.isRequired,
}
export default ReposItem