import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function NewPost() {
    return (
        <Form>
            <Form.Group controlId="newpostForm">
                <Form.Label>New Post</Form.Label>
                <Form.Control as="textarea" rows={9} />
            </Form.Group>
            <Form.Group controlId="formPrivateCheck">
                <Form.Check type="checkbox" label="Private Post?" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Post
            </Button>
        </Form>
    )
}

export default NewPost;