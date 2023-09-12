import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Alert from "../Service/Alert"
import axios from "axios";

const AddAgentPage = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    dateOfBirth: '',
    address: '',
    profilePic: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [alertval, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }
  const validateEmail = (email) => {
    // Email validation using regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validateContactNumber = (contactNumber) => {
    // Contact number validation using regular expression
    const contactNumberPattern = /^\d{10}$/;
    return contactNumberPattern.test(contactNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validate email
    if (!validateEmail(formData.email)) {
      showAlert("Invalid email address", "danger");
      return;
    }

    // Validate contact number
    if (!validateContactNumber(formData.contactNumber)) {
      showAlert("Invalid contact number", "danger");
      return;
    }


    try {
      const response = await axios.post('https://car-wash-backend-api.onrender.com/api/agents', formData);
      console.log('Response Sucessfully data post:', response.data);
      showAlert("Agent Add Successfully", "success")
      // You can handle the response from the API here
    } catch (error) {
      console.log('Error data not post:', error);
      showAlert("Agent Add Failed", "danger")
      // Handle any errors that occur during the POST request
    }
  };

// for showing image on screen gettign lots path storage

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setFormData({ ...formData, profilePic: event.target.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <>

      <div className="container mt-5">
        <h1>Add Agents</h1>
        <Alert alert={alertval} />
        <form onSubmit={handleSubmit}>

          <Form.Group controlId="fullName">
            <Form.Label>Full Name of Agent:</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Form.Group>


          <Form.Group controlId="email">
            <Form.Label>Agent Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="contactNumber">
            <Form.Label>Contact No:</Form.Label>
            <Form.Control
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </Form.Group>


          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          {/* old format for addign image if api crashed then use this code start  */}

          <Form.Group controlId="profilePic">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* old format for addign image if api crashed then use this code end */}
  



          {/* new additon in frontend code for showing image in frontend start */}

          {/* <Form.Group controlId="profilePic">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              name="profilePic"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
            />
          </Form.Group> */}

          {/* show image on screen when select from files  */}
          {/* {formData.profilePic && (
            <img
              
              src={formData.profilePic}
              alt="Selected Profile Pic"
              style={{ maxWidth: '200px', maxHeight: '200px'}}
            />
          )} */}

          {/* new additon in frontend code for showing image in frontend end*/}



          <Row className="justify-content-between mt-4">
            <Col xs="auto">
              <Button type="submit" variant="primary">
                Save
              </Button>
            </Col>

            <Col xs="auto">
              <Button variant="primary">
                Discard
              </Button>
            </Col>
          </Row>

        </form>
      </div>

    </>

  );
};

export default AddAgentPage;
