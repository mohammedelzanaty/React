import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Header from './Header';
import Home from './Home';
/* Components */
import ContextApiRakshitSoral from './Components/context-api-rakshit-soral';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <div className="home-page__content">
          <Router>
            <Home path="/" />
            <ContextApiRakshitSoral path="context-api-rakshit-soral" />
          </Router>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
