import React from 'react';
import { Link } from 'react-router-dom';

class FiveHundred extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>500</h1>
          <h3>Internal Server Error</h3>
          <p>Something went wrong. Please try again letter.</p>
          <button type="button"><Link to="/home">BACK HOME</Link></button>
        </div>
      </div>
    );
  }
}

export default FiveHundred;
