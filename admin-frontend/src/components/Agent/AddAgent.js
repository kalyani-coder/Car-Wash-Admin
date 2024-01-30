import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Alert from "../Service/Alert"

const AddAgentPage = () => {


  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);


  const [selectedFile, setSelectedFile] = useState(null);
  const [fullName, setAgentName] = useState('');
  const [email, setAgentemail] = useState('');
  const [contactNumber, setAgentContact] = useState('');
  const [dateOfBirth, setAgentDate] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleAgentNameChange = (event) => {
    setAgentName(event.target.value);
  };
  const handleAgentEmailChange = (event) => {
    setAgentemail(event.target.value);
  };
  const handleAgentContactChange = (event) => {
    setAgentContact(event.target.value);
  };
  const handleAgentDateChange = (event) => {
    setAgentDate(event.target.value);
  };
  const handleAgentAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleAgentPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const showAlert = (message, type) => {
    if (type === "success") {
      setSuccessAlert({ msg: message, type: type });
      setTimeout(() => {
        setSuccessAlert(null);
      }, 5000);
    } else if (type === "error") {
      setErrorAlert({ msg: message, type: type });
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

 

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('contactNumber', contactNumber);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('address', address);
      formData.append('password', password);



      fetch('https://car-wash-backend-api.onrender.com/api/agents', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded Successfully:', data.servicesimageUrl);
          showAlert("Service Added Successfully", "success");
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          showAlert("Error adding service", "error");
        });
    }
  };


  return (
    <>

      <div className="container mt-5">
        <h1>Add Employee</h1>
        {successAlert && <Alert alert={successAlert} />}
        {errorAlert && <Alert alert={errorAlert} />}


        <Form.Group controlId="fullName">
          <Form.Label>Full Name of Employee:</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={fullName}
            required
            onChange={handleAgentNameChange}

          />
        </Form.Group>


        <Form.Group controlId="email">
          <Form.Label>Employee Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            required
            onChange={handleAgentEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="contactNumber">
          <Form.Label>Contact No:</Form.Label>
          <Form.Control
            type="number"
            name="contactNumber"
            value={contactNumber}
            required
            onChange={handleAgentContactChange}

          />
        </Form.Group>

        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            required
            onChange={handleAgentDateChange}

            
          />
        </Form.Group>


        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
            required
            onChange={handleAgentAddressChange}

          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={password}
            required
            onChange={handleAgentPasswordChange}

          />
        </Form.Group>

     

        <Form.Group controlId="profilePic">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
        </Form.Group>




        <Row className="justify-content-between mt-4">
          <Col xs="auto">
            <Button variant="primary" onClick={handleUpload}>
              Save
            </Button>
          </Col>

          <Col xs="auto">
            <Button variant="primary">
              Discard
            </Button>
          </Col>
        </Row>


      </div>

    </>

  );
};

export default AddAgentPage;
