import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Alert from "../Promotion/Alert";

function AddTopService() {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');         // Add this line
  const [description, setDescription] = useState('');
  const [offer, setOffer] = useState('');          // Add this line
  const [selectedFile, setSelectedFile] = useState(null);


  const handleServiceNameChange = (event) => {
    setTitle(event.target.value);
  };

  const handleServicesCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleServicesPriceChange = (event) => {
    setPrice(event.target.value);
  };


  const handleServiceDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleServicesOfferChange = (event) => {
    setOffer(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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


  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('offer', offer);
      formData.append('price', price);
      formData.append('category', category);


      fetch('https://car-wash-backend-api.onrender.com/api/topservices', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded Successfully:', data.image);
          showAlert("Service Added Successfully", "success");
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          showAlert("Error adding service", "error");
        });
    }
  };


  const handleDiscard = () => {
    // Reset all state variables to their initial empty values
    setTitle('');
    setCategory('');
    setPrice('');
    setDescription('');
    setOffer('');
    setSelectedFile(null);
  };



  return (
    <>
      <div className="container mt-5">
        <h1>Add Top Services</h1>
        <Alert alert={alertval} />


        {/* <Form.Group controlId="title">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              placeholder="Title of Top services"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group> */}

        <Form.Group controlId="title">
          <Form.Label>Title of Service:</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            value={title}
            required
            onChange={handleServiceNameChange}
          />
        </Form.Group>


        {/* <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              placeholder="Category of top services"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group> */}

        <Form.Group controlId="category">
          <Form.Label>Category of Service:</Form.Label>
          <Form.Control
            type="text"
            placeholder="category"
            value={category}
            onChange={handleServicesCategoryChange}
          />
        </Form.Group>

        {/* <Form.Group controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              placeholder="Price of services"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group> */}

        <Form.Group controlId="price">
          <Form.Label>Price of Service:</Form.Label>
          <Form.Control
            type="text"
            placeholder="price"
            value={price}
            onChange={handleServicesPriceChange}
          />
        </Form.Group>

        {/* <Form.Group className="mb-4 display-flex">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description of Service input type"
              className="fw-normal"
              style={{ height: "5rem" }}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group> */}

        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"

            placeholder="description"
            value={description}
            onChange={handleServiceDescriptionChange}
            rows="4"
          />
        </Form.Group>

        {/* <Form.Group className="mb-4">
            <Form.Control
              as="select"
              type="text"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
            >
              <option value="">Select Offer</option>
              <option value="No Offer">No Offer</option>
              <option value="10% Discount">10% Discount</option>
              <option value="20% Discount">20% Discount</option>
              <option value="Special Deal">Special Deal</option>
              <option value="Gift with Purchase">
                Gift with Purchase
              </option>
            </Form.Control>
          </Form.Group> */}

        <Form.Group controlId="offer">
          <Form.Label>Offer on Product:</Form.Label>
          <Form.Control
            type="text"
            placeholder="offer"
            value={offer}
            onChange={handleServicesOfferChange}
          />
        </Form.Group>



        {/* <Form.Group controlId="image">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Group> */}

        <Form.Group controlId="serviceImage">
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
            <Button onClick={handleUpload} variant="warning">
              Save
            </Button>
          </Col>

          <Col xs="auto">
            <Button variant="warning" onClick={handleDiscard}>
              Discard
            </Button>
          </Col>
        </Row>


      </div>

    </>
  );
}

export default AddTopService;
