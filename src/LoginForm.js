import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert"
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";


/** Form for login.
 *
 * Props:
 * - handleLogin: function to call in parent.
 *
 * State:
 * - loginData: { username, password }
 * - error: initially [], changes to array of error messages if errors encountered
 *
 * App -> RoutesList -> LoginForm
 */

function LoginForm({ handleLogin }) {
  const initialFormData = { username: "",
                            password: ""};
  const [loginData, setLoginData] = useState(initialFormData);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleLogin(loginData);
    } catch(err) {
      setError(err)
      return
    }
    setLoginData(initialFormData);
    navigate("/");
  }

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginData(lData => ({
      ...lData,
      [name]: value,
    }));
   }

  return (
    <div className="LoginPage">
      <h1>Log In</h1>
      <Form className="LoginForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={loginData.username} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={loginData.password} />
        </Form.Group>

        {error.length > 0 &&
          error.map((e, i) => <Alert key={i} variant="danger">{e}</Alert>)
        }

        <Button variant="outline-dark" type="submit">Submit</Button>

      </Form>
  </div>
  )
}

export default LoginForm;