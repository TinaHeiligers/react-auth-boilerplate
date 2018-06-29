import React from 'react';
import { Link } from 'react-router-dom';

class FourZeroFour extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>404</h1>
          <h3>Looks like you've got lost</h3>
          <p>The page you're looking for doesnt exist or has been moved.</p>
          <button type="button"><Link to="/home">BACK HOME</Link></button>
        </div>
      </div>
    );
  }
}

export default FourZeroFour;
