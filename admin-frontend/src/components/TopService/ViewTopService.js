import React, { useState, useEffect } from "react";
import { Card, Button  } from "react-bootstrap";
import axios from "axios";
import Alert from "./Alert";

export default function ViewTopServices() {
  const [topServices, setTopServices] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function fetchTopServices() {
      try {
        const response = await axios.get("https://car-wash-backend-api.onrender.com/api/topservices");
        setTopServices(response.data);
      } catch (error) {
        console.error("Error fetching top services:", error);
      }
    }

    fetchTopServices();
  }, []);

  const handleDelete = (service) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (shouldDelete) {
      axios.delete(`https://car-wash-backend-api.onrender.com/api/topservices/${service._id}`)
        .then(() => {
          setTopServices((prevTopServices) =>
            prevTopServices.filter((item) => item._id !== service._id)
          );
          setAlert({ type: "success", msg: "Service deleted successfully!" });
        })
        .catch((error) => console.error("Error deleting service:", error));
    }
  };

  return (
    <div className="container mt-5">
      <h1>View Top Services</h1>
      <Alert alert={alert} />
      {topServices.map((service) => (
        <Card key={service._id} className="mb-3">
          <Card.Body>
            <Card.Title>Title: {service.title}</Card.Title>
            <img variant="top" src={service.image} height={200} width={200} />
            <Card.Subtitle className="mb-2 text-muted">
              Category: {service.category}
            </Card.Subtitle>
            <Card.Text>Description: {service.description}</Card.Text>
            <Card.Text>Price: Rs.{service.price}</Card.Text>
            <Card.Text>Offer: {service.offer}</Card.Text>
            <div className="actions">
              <Button variant="danger" onClick={() => handleDelete(service)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
