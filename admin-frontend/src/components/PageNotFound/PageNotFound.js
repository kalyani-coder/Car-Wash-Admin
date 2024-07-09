import React from 'react';
import './PageNotFound.css'; // Make sure to create this CSS file for styling
import notFoundImage from '../../assects/pagenotfound.jpg'; // Update the path accordingly

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img src={notFoundImage} alt="Page Not Found" className="not-found-image" />
      <h1>Sorry, page not found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
    </div>
  );
}

export default PageNotFound;
