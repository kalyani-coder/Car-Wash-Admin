import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
// import "./ServiceView.css";

const mockApiData = [
  {
    id: 1,
    serviceName: "Service 1",
    serviceCategory: "Category 1",
    servicePrice: 50,
    serviceDescription: "Description for Service 1",
    serviceOffer: "10% Discount",
    serviceImage: "image1.jpg",
  },
  {
    id: 2,
    serviceName: "Service 2",
    serviceCategory: "Category 2",
    servicePrice: 75,
    serviceDescription: "Description for Service 2",
    serviceOffer: "Special Deal",
    serviceImage: "image2.jpg",
  },
  // Add more mock data items as needed
];

export default function ServiceView() {
  const [editingService, setEditingService] = useState(null);

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleDelete = (service) => {
    // Implement delete logic here (e.g., call an API endpoint)
    // For the example, we'll just filter the mock data
    const updatedData = mockApiData.filter((item) => item.id !== service.id);
    mockApiData = updatedData;
  };

  return (
    <div className="container mt-5">
      <h1>View Services</h1>
      {mockApiData.map((service) => (
        <Card key={service.id} className="mb-3">
          {service.serviceImage && (
            <Card.Img variant="top" src={service.serviceImage} />
          )}
          <Card.Body>
            <Card.Title>{service.serviceName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Category: {service.serviceCategory}
            </Card.Subtitle>
            <Card.Text>{service.serviceDescription}</Card.Text>
            <Card.Text>Price: ${service.servicePrice}</Card.Text>
            <Card.Text>Offer: {service.serviceOffer}</Card.Text>
            <Button
              variant="info"
              onClick={() => handleEdit(service)}
              className="mr-2"
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(service)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
      {editingService && (
        <div className="edit-form">
          {/* Render an edit form here using editingService */}
        </div>
      )}
    </div>
  );
}
