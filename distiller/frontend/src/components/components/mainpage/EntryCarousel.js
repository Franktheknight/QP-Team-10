import React from 'react';

import './EntryCarousel.css';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Post from './post';

/* eslint-disable react/destructuring-assignment  */
/* eslint-disable react/forbid-prop-types  */
function EntryCarousel(props) {
  return (
    <div className="carousel">
      <h1>For You</h1>
      <Carousel>
        <Carousel.Item>
          <Row>
            {props.entries.map((entry) => (
              <Post key={entry.pk} diary={entry} />
            ))}
            <Post />
          </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

EntryCarousel.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default EntryCarousel;
