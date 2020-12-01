import React from "react";

import "./trendingposts.css";
import Post from "./post.js";
import Row from 'react-bootstrap/Row'
import Carousel from 'react-bootstrap/Carousel'

const link = "#"  //backend post redirect

const post = {
    title: "Trending Title", //put backend props here?
    summary: "Trending post summary of the post", //put backend props here?
    link: link //put backend props here?
}


function Trending() {
    return (
        <div className="trending">
            <h1>Trending Now</h1>
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

export default Trending;