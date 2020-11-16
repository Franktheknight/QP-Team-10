import React from "react";

import "./trendingposts.css";
import Post from "./post.js";
import Row from 'react-bootstrap/Row'
import Carousel from 'react-bootstrap/Carousel'

function Trending() {
    return (
        <div className="trending">
            <h1>Trending Now</h1>
            <Carousel >
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