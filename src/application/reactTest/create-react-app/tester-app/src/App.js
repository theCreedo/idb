import React from 'react';
import ReactGrid from './ArtistGrid.js';
import ReactHomeCarousel from './homeCarousel.js';
//import './resources/css/landing-page.css';
//import './resources/css/sweStyle.css';
//import './resources/templates/css/plugins.css';
//import './resources/templates/css/style.css';
//import './resources/templates/css/blue.css';
//import './resources/templates/css/plugins.css';
//import './resources/templates/js/plugins.js';
//import './resources/templates/js/jquery.themepunch.tools.min.js';
//import './resources/templates/js/scripts.js';
//import './resources/css/navBar.css';
//import './resources/i'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const BasicExample = () => (
  <Router>
    <div>
      <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div className="container topnav">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    <li>
                        <Link to="/artistTable">Artists</Link>
                    </li>
                    <li>
                    </li>
                    <li>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/artistTable" component={ArtistTable}/>
    </div>
  </Router>
)

const ArtistTable = () => (
  <ReactGrid type={'artist'}/>
)

const Home = () => (
  <ReactHomeCarousel/>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample