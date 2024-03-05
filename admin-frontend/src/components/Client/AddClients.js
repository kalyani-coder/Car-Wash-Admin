import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Alert from "../Service/Alert"

const AddClients = () => {
    const [selectedFile, setSelectedFile] = useState(null);
  const [clientName, setAgentName] = useState('');
  const [clientEmail, setAgentemail] = useState('');
  const [clientPhone, setAgentContact] = useState('');
  const [clientAddress, setAddress] = useState('');
  
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);





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
      const handleAgentAddressChange = (event) => {
        setAddress(event.target.value);
      };

    //   const handleUpload = () => {
    //     if (selectedFile) {
    //       const formData = new FormData();
    //       formData.append('image', selectedFile);
    //       formData.append('clientName', clientName);
    //       formData.append('clientEmail', clientEmail);
    //       formData.append('clientPhone', clientPhone);
    //       formData.append('clientAddress', clientAddress);
    //       fetch('https://car-wash-backend-api.onrender.com/api/clients', {
    //         method: 'POST',
    //         body: formData,
    //       })
    //         .then(response => response.json())
    //         .then(data => {
    //           console.log('Image uploaded Successfully:', data.servicesimageUrl);
    //           alert("Service Added Successfully", "success");
    //         })
    //         .catch(error => {
    //           console.error('Error uploading image:', error);
    //           alert("Error adding service", "error");
    //         });
    //     }
    //   };


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
          formData.append('clientName', clientName);
          formData.append('clientEmail', clientEmail);
          formData.append('clientPhone', clientPhone);
          formData.append('clientAddress', clientAddress);
      
          fetch('https://car-wash-backend-api.onrender.com/api/clients', {
            method: 'POST',
            body: formData,
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Image uploaded Successfully:', data.servicesimageUrl);
              showAlert('Customers Added Successfully', 'success');
            })
            .catch(error => {
              console.error('Error uploading image:', error);
      
              // Display error message based on the response status or content
              if (error.message.includes('400')) {
                alert('Error adding service: Phone number already registered. Please log in.', 'error');
              } else if (error.message.includes('Missing required fields')) {
                alert('Error adding service: Missing required fields.', 'error');
              } else {
                alert('Error adding service: Internal server error.', 'error');
              }
            });
        }
      };
      

  return (
    <>

      <div className="container mt-5">
        <h1>Add Customers</h1>
      
        {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}
      
        <Form.Group controlId="fullName">
          <Form.Label>Full Name of Customers:</Form.Label>
          <Form.Control
            type="text"
            name="clientName"
            value={clientName}
            required
            onChange={handleAgentNameChange}

          />
        </Form.Group>


        <Form.Group controlId="email">
          <Form.Label>Customers Email:</Form.Label>
          <Form.Control
            type="text"
            name="clientEmail"
            value={clientEmail}
            required
            onChange={handleAgentEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="contactNumber">
          <Form.Label>Contact No:</Form.Label>
          <Form.Control
            type="number"
            name="clientPhone"
            value={clientPhone}
            required
            onChange={handleAgentContactChange}

          />
        </Form.Group>
    

        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            name="clientAddress"
            value={clientAddress}
            required
            onChange={handleAgentAddressChange}

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

export default AddClients;
