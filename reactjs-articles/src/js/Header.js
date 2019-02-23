import React from 'react';
import { Link } from '@reach/router';

const Header = () => {
  return (
    <div>
      <div className="home-page__image">
        <img
          src="https://cssgradient.io/images/css-gradient-swatches-a67daaf7.svg"
          alt="Css gradient swatches"
        />
      </div>
      <div className="home-page__content">
        <Link to="/" className="title">
          React JS Articles
        </Link>

        <nav>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/context-api-rakshit-soral">
            {' '}
            Context API
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
