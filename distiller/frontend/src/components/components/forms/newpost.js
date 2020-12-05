import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function NewPost(props) {
  const [content, setContent] = useState('');
  const [private, setPrivate] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const diaryentry = { entry, private };
    props.addDiary(diaryentry);
    setContent('');
    setPrivate(false);
  }

  function validateForm() {
    return content.length > 0 && content.length < 70;
  }


  return (
    <div className="newPost">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="diaryentry">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="content"
            as="textarea"
            rows={9}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="formPrivateCheck">
          <Form.Check
            type="checkbox"
            label="Private Post?"
            value={private}
            onChange={(e) => setPrivate(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Post
        </Button>
      </Form>

      <p>
        Done writing diaries?
        <Link to="/main">go back to home page</Link>
      </p>
    </div>
    </div>
  );
}
