import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const mockTopServices = [
  {
    id: 1,
    title: "Top Service 1",
    category: "Category A",
    price: 50,
    description: "Description for Top Service 1",
    offer: "10% Discount",
  },
  {
    id: 2,
    title: "Top Service 2",
    category: "Category B",
    price: 75,
    description: "Description for Top Service 2",
    offer: "Special Deal",
  },
  // Add more mock data items as needed
];

function ViewTopServices() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">view top services </h1>

      <Row className="justify-content-center">
        <Col md={10}>
          {mockTopServices.map((service) => (
            <Card key={service.id} className="mb-4">
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Category: {service.category}
                </Card.Subtitle>
                <Card.Text>{service.description}</Card.Text>
                <Card.Text>Price: ${service.price}</Card.Text>
                <Card.Text>Offer: {service.offer}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="info" className="btn">
                    Edit
                  </Button>
                  <Button variant="danger" className="btn">
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default ViewTopServices;
