import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Post(props) {
    const {...other} = props;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{other.title}</Card.Title>
                <Card.Text>
                    {other.summary}
                </Card.Text>
                <Button variant="primary">{other.link}</Button>
            </Card.Body>
        </Card>
    );
}

export default Post;