import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar/SearchBar';
import ForYou from './components/mainpage/foryou';
import Trending from './components/mainpage/trendingposts';
import Home from './components/coverpage/home';
//below are the forms, I am not sure if you need them in App.js
//import Login from './components/forms/login';
//import Register from './components/forms/register';
//import NewPost from './components/forms/newpost';

let userlogin = true;

function App() {
  if (userlogin) {
    return (
      <div className="App">
        <SearchBar />
        <Trending />
        <ForYou />
      </div>

    );
  }
  else {
    return (
      <div className="App">
        <SearchBar />
        <Home />
      </div>
    )
  }
}

export default App;
