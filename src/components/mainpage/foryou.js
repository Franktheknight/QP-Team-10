import React from "react";

import "./foryou.css";
import Post from "./post";
import Row from 'react-bootstrap/Row'
import Carousel from 'react-bootstrap/Carousel'

const post = {
  title: "Sample Title",  //put backend props here?
  summary: "sample summary of the post in the for you section", //put backend props here?
  link: "sample Link" //put backend props here?
}
function ForYou() {
  return (
    <div className="forYou">
      <h1>For You</h1>
      <Carousel controls={false} className="Center">
        <Carousel.Item>
          <Row>
            <Post {...post} />
            <Post {...post} />
            <Post {...post} />
            <Post {...post} />
          </Row>
        </Carousel.Item>
        <Carousel.Item>
            <Row>
              <Post {...post} />
              <Post {...post} />
              <Post {...post} />
              <Post {...post} />
            </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ForYou;