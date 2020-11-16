import React from "react";

import "./foryou.css";
import Post from "./post";
import Row from 'react-bootstrap/Row'
import Carousel from 'react-bootstrap/Carousel'

function ForYou() {
  return (
    <div className="forYou">
      <h1>For You</h1>
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

export default ForYou;