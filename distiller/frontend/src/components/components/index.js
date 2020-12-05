import React, { Fragment } from 'react';
import PrivateRender from './miscellaneous/PrivateRender';

import { HashRouter as Router, Route } from 'react-router-dom';
//  import './App.css';
//  import 'bootstrap/dist/css/bootstrap.min.css';

import EntryCarousel from './mainpage/EntryCarousel';
//  import Trending from './mainpage/trendingposts';
import Home from './coverpage/home';

const mainModule = ({ auth, diaries, getDiaries, deleteDiary, trendings, recommendations }) => {
  return (
    <Router>
      <>
        <PrivateRender
          exact
          path="/main"
          component={EntryCarousel}
          isLoading={auth.isLoading}
          isAuthenticated={auth.isAuthenticated}
          diaries={diaries}
        />
        <Route
          exact
          path="/main"
          render={() => {
            return <EntryCarousel entries={trendings} />;
          }}
        />
        <Route
          exact
          path="/main"
          render={() => {
            return <EntryCarousel entries={recommendations} />;
          }}
        />

        <Route exact path="/cover" component={Home} />
      </>
    </Router>
  );
};

export default mainModule;
