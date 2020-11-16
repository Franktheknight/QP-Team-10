import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Post() {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Example summary or title
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default Post;