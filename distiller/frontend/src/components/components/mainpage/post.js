import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Post({ diary, incLikes, isLikeable }) {
  //  can't have private because that is reserved
  const { private: privateornot, spectrum, entry, likes, created_at: createAt } = diary;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{createAt}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          #likes:
          {likes}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          #happiness measure:
          {spectrum[0]}
          #satisfaction measure:
          {spectrum[1]}
        </Card.Subtitle>
        <Card.Text>{entry}</Card.Text>
        <Button variant="primary" onClick={isLikeable ? incLikes : null} disabled={!isLikeable}>
          Like
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Post;
