import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

/** Form for signing up.
 *
 * Props:
 * - handleSignup: function to call in parent.
 *
 * State:
 * - signupData: { username, password, firstName, lastName, email }
 * - error: initially [], changes to array of error messages if errors encountered
 *
 * App -> RoutesList -> SignupForm
 */

function SignupForm({ handleSignup }) {
  const initialFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [signupData, setSignupData] = useState(initialFormData);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleSignup(signupData);
    } catch(err) {
      setError(err);
      return
    }
    setSignupData(initialFormData);
    navigate("/");
  }

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setSignupData((sData) => ({
      ...sData,
      [name]: value,
    }));
  }

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <Form className="SignupForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="signupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={signupData.username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={signupData.password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={signupData.firstName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={signupData.lastName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={signupData.email}
          />
        </Form.Group>

        {error.length > 0 &&
          error.map((e, i) => <Alert key={i} variant="danger">{e}</Alert>)
        }

        <Button variant="outline-dark" type="submit">Submit</Button>

      </Form>
    </div>
  );
}

export default SignupForm;
