import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AddTopService() {
  const [serviceData, setServiceData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    offer: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Service Data:", serviceData);
  };

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="card-1">
            <div className="card-body mt-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Title of Top services"
                    name="title"
                    value={serviceData.title}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Category of top services"
                    name="category"
                    value={serviceData.category}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="number"
                    placeholder="Price of services"
                    className="fw-bold"
                    name="price"
                    value={serviceData.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4 display-flex">
                  <Form.Control
                    as="textarea"
                    placeholder="Description of Service input type"
                    className="fw-bold"
                    style={{ height: "5rem" }}
                    name="description"
                    value={serviceData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    as="select"
                    name="offer"
                    value={serviceData.offer}
                    onChange={handleInputChange}
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
                </Form.Group>
                <Form.Group className="mb-4">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button type="submit" id="btn1" className="btn btn-warning">
                    Send
                  </Button>
                  <Button id="btn" className="btn btn-warning">
                    Discard
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddTopService;
