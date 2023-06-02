import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert"
import userContext from "./userContext";
import "./ProfileForm.css";


/** Form for updating user information.
 *
 * Props:
 * - handleUpdate: function to call in parent.
 *
 * State:
 * - profileData: { username, firstName, lastName, email }
 * - error: initially [], changes to array of error messages if errors encountered
 * - success: initially set to false, set to true if form is submitted successfully
 *
 * App -> RoutesList -> ProfileForm
 */

function ProfileForm({ handleUpdate }) {
  const { currUser } = useContext(userContext);

  const initialFormData = { username: currUser.username,
                            firstName: currUser.firstName,
                            lastName: currUser.lastName,
                            email: currUser.email};
  const [profileData, setProfileData] = useState(initialFormData);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleUpdate(profileData);
    } catch(err) {
      setError(err);
      setSuccess(false);
      return
    }
    setProfileData(profileData);
    setError([]);
    setSuccess(true);
  }

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData(pData => ({
      ...pData,
      [name]: value,
    }));
   }

  return (
    <div className="ProfilePage">
      <h1>Profile</h1>
      <Form className="ProfileForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="profileUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
              type="text"
              name="username"
              value={profileData.username}
              disabled
              readOnly />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profileFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
              type="text"
              name="firstName"
              onChange={handleChange}
              value={profileData.firstName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profileLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
              type="text"
              name="lastName"
              onChange={handleChange}
              value={profileData.lastName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profileEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={profileData.email} />
        </Form.Group>

        {error.length > 0 &&
          error.map((e, i) => <Alert key={i} variant="danger">{e}</Alert>)
        }

        {success &&
          <Alert variant="success">Updated successfully.</Alert>
        }

        <Button variant="outline-dark" type="submit">Submit</Button>

      </Form>
  </div>
  )
}

export default ProfileForm;