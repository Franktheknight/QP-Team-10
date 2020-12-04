import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [private, setPrivate] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="newPost">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        autofocus
                        type="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
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
        </div>
    );
}