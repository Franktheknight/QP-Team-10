import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootComponent from './components';
import SearchBar from './components/SearchBar/SearchBar';
/* eslint-disable react/state-in-constructor  */

//  let login = false;
export default class App extends Component {
  state = {
    diaries: [],
    errors: { msg: {}, status: null },
    messages: {},
    auth: {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      isLoading: false,
      user: null,
    },
  };

  // Setup config with token - helper function
  tokenConfig = () => {
    // Get token from state
    const { auth } = this.state;
    const { token } = auth;

    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // If token, add to headers config
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  };

  createMessage = (msg) => {
    this.setState((state) => {
      return { ...state, messages: msg };
    });
  };

  // RETURN ERRORS
  returnErrors = (msg, status) => {
    this.setState((state) => {
      return { ...state, errors: { msg, status } };
    });
  };

  getDiaries = () => {
    axios
      .get('/api/diaries/', this.tokenConfig())
      .then((res) => {
        this.setState((state) => {
          return { ...state, diaries: res.data };
        });
      })
      .catch((err) => this.returnErrors(err.response.data, err.response.status));
  };

  // DELETE LEAD
  deleteDiary = (id) => {
    axios
      .delete(`/api/diaries/${id}/`, this.tokenConfig())
      .then((res) => {
        this.createMessage({ deleteLead: 'Lead Deleted' });
        this.setState((state) => {
          return { ...state, diaries: state.diaries.filter((diary) => diary.id !== id) };
        });
      })
      .catch((err) => this.returnErrors(err.response.data, err.response.status));
  };

  // ADD LEAD
  addDiary = (diary) => {
    axios
      .post('/api/diaries/', diary, this.tokenConfig())
      .then((res) => {
        this.createMessage({ addLead: 'Lead Added' });
        this.setState((state) => {
          return { ...state, diaries: [...state.diaries, diary] };
        });
      })
      .catch((err) => this.returnErrors(err.response.data, err.response.status));
  };

  clearDiaries = () =>
    this.setState((state) => {
      return { ...state, diaries: [] };
    });

  //  after this line are the methods for authentications

  loaded = (data) =>
    this.setState((state) => {
      return {
        ...state,
        auth: { ...state.auth, isLoading: false, isAuthenticated: true, user: data },
      };
    });

  fail = () => {
    localStorage.removeItem('token');
    this.setState((state) => {
      return {
        ...state,
        auth: { ...state.auth, isLoading: false, isAuthenticated: false, user: null, token: null },
      };
    });
  };

  success = (data) => {
    localStorage.setItem('token', data.token);
    this.setState((state) => {
      return {
        ...state,
        auth: { ...state.auth, isLoading: false, isAuthenticated: true, ...data },
      };
    });
  };

  loadUser = () => {
    // User Loading
    this.setState((state) => {
      return { ...state, auth: { ...state.auth, isLoading: true } };
    });
    axios
      .get('/api/auth/user', this.tokenConfig())
      .then((res) => {
        this.loaded(res.data);
      })
      .catch((err) => {
        this.returnErrors(err.response.data, err.response.status);
        this.fail();
      });
  };

  // LOGIN USER
  login = (username, password) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios
      .post('/api/auth/login', body, config)
      .then((res) => {
        this.success(res.data);
      })
      .catch((err) => {
        this.returnErrors(err.response.data, err.response.status);
        this.fail();
      });
  };

  // REGISTER USER
  register = ({ username, password, email }) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Request Body
    const body = JSON.stringify({ username, email, password });

    axios
      .post('/api/auth/register', body, config)
      .then((res) => {
        this.success(res.data);
      })
      .catch((err) => {
        this.returnErrors(err.response.data, err.response.status);
        this.fail();
      });
  };

  // LOGOUT USER
  logout = () => {
    axios
      .post('/api/auth/logout/', null, this.tokenConfig())
      .then((res) => {
        this.clearDiaries();
        this.fail();
      })
      .catch((err) => {
        this.returnErrors(err.response.data, err.response.status);
      });
  };

  render() {
    return (
      <Router>
        <>
          <SearchBar />
          <Switch>
            <Route exact path="/" component={rootComponent} />
          </Switch>
        </>
      </Router>
    );
  }
}
