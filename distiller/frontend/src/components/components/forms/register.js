import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* eslint-disable react/destructuring-assignment  */
export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (email.length > 0 && password.length > 0 && password === confirmPassword) {
      props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = { username, password, email };
      props.register(newUser);
    }
  }

  if (props.isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="Register">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Your Password</Form.Label>
          <Form.Control
            autoFocus
            type="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
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
