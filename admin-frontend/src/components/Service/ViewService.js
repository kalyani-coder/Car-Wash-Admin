import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Alert from "./Alert";
import "./ViewServices.css";

export default function ServiceView() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch("https://car-wash-backend-api.onrender.com/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (service) => {
    setEditingService({ ...service });
  };

  const handleUpdate = () => {
    fetch(
      `https://car-wash-backend-api.onrender.com/api/services/${editingService._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingService),
      }
    )
      .then((response) => response.json())
      .then(() => {
        setServices((prevServices) =>
          prevServices.map((item) =>
            item._id === editingService._id ? editingService : item
          )
        );
        setEditingService(null);
        setAlert({ type: "success", msg: "Service updated successfully!" });
      })
      .catch((error) => {
        console.error("Error updating service:", error);
        setAlert({ type: "danger", msg: "Error updating service" });
      });
  };

  const handleCancelEdit = () => {
    setEditingService(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDelete = (service) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (shouldDelete) {
      fetch(
        `https://car-wash-backend-api.onrender.com/api/services/${service._id}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then(() => {
          setServices((prevServices) =>
            prevServices.filter((item) => item._id !== service._id)
          );

          setAlert({ type: "success", msg: "Service deleted successfully!" });
        })
        .catch((error) => console.error("Error deleting service:", error));
    }
  };

  return (
    <div className="container mt-5">
      <h1>View Services</h1>
      <Alert alert={alert} />
      {services.map((service) => (
        <Card key={service._id} className="mb-3">
          {service.serviceImage && (
            <img
              variant="top"
              src={service.serviceImage}
              height={200}
              width={200}
            />
          )}
          <Card.Body>
            <Card.Title>{service.serviceName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Category: {service.serviceCategory}
            </Card.Subtitle>
            <Card.Text>{service.serviceDescription}</Card.Text>
            <Card.Text>
              Price: ₹{service.servicePrice?.toLocaleString("en-IN")}
            </Card.Text>

            <Card.Text>Offer: {service.serviceOffer}</Card.Text>
            {editingService && editingService._id === service._id ? (
              <div className="edit-form">
                <Form>
                  <Form>
                    <Form.Group controlId="editServiceName">
                      <Form.Label>Name of Service:</Form.Label>
                      <Form.Control
                        type="text"
                        name="serviceName"
                        value={editingService.serviceName}
                        onChange={handleEditChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="editServiceCategory">
                      <Form.Label>Category of Service:</Form.Label>
                      <Form.Control
                        type="text"
                        name="serviceCategory"
                        value={editingService.serviceCategory}
                        onChange={handleEditChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="editServicePrice">
                      <Form.Label>Price of Service:</Form.Label>
                      <Form.Control
                        type="number"
                        name="servicePrice"
                        value={editingService.servicePrice}
                        onChange={handleEditChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="editServiceDescription">
                      <Form.Label>Description:</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="serviceDescription"
                        value={editingService.serviceDescription}
                        onChange={handleEditChange}
                        rows="4"
                      />
                    </Form.Group>
                  </Form>
                  {/* Similar form fields for other properties */}
                  <div className="mt-3">
                    <Button
                      variant="primary"
                      onClick={() => {
                        const shouldSave = window.confirm(
                          "Are you sure you want to save changes?"
                        );
                        if (shouldSave) {
                          handleUpdate();
                        }
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="mx-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="actions">
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
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
