import React, { Fragment } from 'react';
import PrivateRender from './miscellaneous/PrivateRender';

import { HashRouter as Router, Route } from 'react-router-dom';
//  import './App.css';
//  import 'bootstrap/dist/css/bootstrap.min.css';

import ForYou from './mainpage/foryou';
import Trending from './mainpage/trendingposts';
import Home from './coverpage/home';

const mainModule = ({ auth, diaries, getDiaries, deleteDiary }) => (
  <Router>
    <>
      <PrivateRender
        exact
        path="/main"
        component={ForYou}
        isLoading={auth.isLoading}
        isAuthenticated={auth.isAuthenticated}
        diaries={diaries}
      />
      <Route
        exact
        path="/main"
        render={() => {
          return <Trending />;
        }}
      />
      <Route exact path="/cover" component={Home} />
    </>
  </Router>
);

export default mainModule;
