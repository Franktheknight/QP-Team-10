import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* eslint-disable react/destructuring-assignment  */
export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.login(username, password);
  }

  if (props.isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label> Username </Form.Label>
          <Form.Control autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>

      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
