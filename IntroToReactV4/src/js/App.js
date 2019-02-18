import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';

import Results from './Results';
import Details from './Details';
import FourOhFour from './404';
import Search from './SearchParms';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
          <Search path="/search-params" />
          <FourOhFour default/>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
