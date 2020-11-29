import React from 'react';

import './trendingposts.css';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Post from './post';

function Trending() {
  return (
    <div className="trending">
      <h1>Trending Now</h1>
      <Carousel>
        <Carousel.Item>
          <Row>
            <Post />
            <Post />
            <Post />
            <Post />
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row>
            <Post />
            <Post />
            <Post />
            <Post />
          </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Trending;
