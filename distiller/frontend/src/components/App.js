import React, { Component, Fragment } from 'react'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

export default class App extends Component {
    
    render() {
      return (
        <Router>
              <Fragment>
                {/*insert header component here */}
                {/*insert alert component here */}

                <div>
                    <h1>TEST DIARY OUTER</h1>
                </div>
               
                 <Switch>
                   <Route exact path="/" render={(props)=>(
                   <div>
                    <h1>TEST DIARY INNER</h1>
                    </div>
                    )} />
                      {/*going to need private route for profile*/}
                    {/*<Route exact path="/" component={homepage component} />*/}
                     {/*<Route exact path="/register" component={register component} />*/}
                    {/*<Route exact path="/login" component={login component} />*/}
                     {/*<Route exact path="/main" component={mainpage component} />*/}
                      {/*<Route exact path="/:id/profile" component={profile component} />*/}
                  </Switch>
               
              </Fragment>
        </Router>
      );
    }
  }
  
  