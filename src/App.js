import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar/SearchBar';
import ForYou from './components/mainpage/foryou';
import Trending from './components/mainpage/trendingposts'
import Home from './components/coverpage/home'


let login = false;

function App() {
  if (login) {
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
