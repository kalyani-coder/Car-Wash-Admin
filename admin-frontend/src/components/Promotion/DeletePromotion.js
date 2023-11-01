import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Alert from "./Alert";
import axios from "axios";

export default function PromotionView() {
  const [promotions, setPromotions] = useState([]);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch("https://car-wash-backend-api.onrender.com/api/promotions")
      .then((response) => response.json())
      .then((data) => setPromotions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (promotion) => {
    setEditingPromotion({ ...promotion });
  };

  const handleUpdate = () => {
    fetch(`https://car-wash-backend-api.onrender.com/api/promotions/${editingPromotion._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingPromotion),
    })
      .then((response) => response.json())
      .then(() => {
        setPromotions((prevPromotions) =>
          prevPromotions.map((item) =>
            item._id === editingPromotion._id ? editingPromotion : item
          )
        );
        setEditingPromotion(null);
        setAlert({ type: "success", msg: "Promotion updated successfully!" });
      })
      .catch((error) => {
        console.error("Error updating promotion:", error);
        setAlert({ type: "danger", msg: "Error updating promotion" });
      });
  };

  const handleCancelEdit = () => {
    setEditingPromotion(null);
  };
  const [services, setServices] = useState([]); // State to store fetched services

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get("https://car-wash-backend-api.onrender.com/api/services");
        const servicesData = response.data; // Assuming the API returns an array of services
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, []);
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    let updatedEditingPromotion = { ...editingPromotion };

    if (name === "offerType") {
      updatedEditingPromotion = {
        ...updatedEditingPromotion,
        offerType: value,
        fixedAmount:
          value === "percentage" ? "" : updatedEditingPromotion.fixedAmount,
        percentageAmount:
          value === "fixed" ? "" : updatedEditingPromotion.percentageAmount,
      };
    } else {
      updatedEditingPromotion[name] = value;
    }

    setEditingPromotion(updatedEditingPromotion);
  };

  const handleDelete = (promotion) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this promotion?"
    );

    if (shouldDelete) {
      fetch(`https://car-wash-backend-api.onrender.com/api/promotions/${promotion._id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setPromotions((prevPromotions) =>
            prevPromotions.filter((item) => item._id !== promotion._id)
          );

          setAlert({ type: "success", msg: "Promotion deleted successfully!" });
        })
        .catch((error) => console.error("Error deleting promotion:", error));
    }
  };

  return (
    <div className="container mt-5">
      <h1>View Promotions</h1>
      <Alert alert={alert} />
      {promotions.map((promotion) => (
        <Card key={promotion._id} className="mb-3">
          <Card.Body>
            <img src={promotion.image} height={200} width={50}/>
            <Card.Title>Title : {promotion.title}</Card.Title>
            <Card.Text>Discription : {promotion.description}</Card.Text>
            <Card.Text>Service : {promotion.service}</Card.Text>
            <Card.Text>Promotions Price : {promotion.promotionPrice}</Card.Text>

{/* for fixed amount and percentage amount  */}

            {/* <Card.Text>
              {promotion.offerType === "fixed"
                ? `Fixed Amount: ${promotion.fixedAmount}`
                : `Percentage Amount: ${promotion.percentageAmount}%`}
            </Card.Text> */}

            <Card.Text>Coupon Code : {promotion.couponCode}</Card.Text>
            {editingPromotion && editingPromotion._id === promotion._id ? (
              <div className="edit-form">
                <Form>
                  <Form.Group controlId="editTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={editingPromotion.title}
                      onChange={handleEditChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="editDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={editingPromotion.description}
                      onChange={handleEditChange}
                      rows="4"
                    />
                  </Form.Group>

                  {/* Similar form fields for other properties */}
                  <Form.Group controlId="editService">
                    <Form.Label>Select Service:</Form.Label>
                    <Form.Control
                      as="select"
                      name="service"
                      value={editingPromotion.service}
                      onChange={handleEditChange}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.serviceName}>
                          {service.serviceName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* Repeat similar form fields for other properties */}
                  <Form.Group controlId="editOfferType">
                    <Form.Label>Offer Type:</Form.Label>
                    <Form.Control
                      as="select"
                      name="offerType"
                      value={editingPromotion.offerType}
                      onChange={handleEditChange}
                    >
                      <option value="">Select an offer type</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="percentage">Percentage Amount</option>
                    </Form.Control>
                  </Form.Group>

                  {/* Conditional rendering of Fixed Amount and Percentage Amount */}
                  {editingPromotion.offerType === "fixed" ? (
                    <Form.Group controlId="editFixedAmount">
                      <Form.Label>Fixed Amount:</Form.Label>
                      <Form.Control
                        type="text"
                        name="fixedAmount"
                        value={editingPromotion.fixedAmount}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                  ) : editingPromotion.offerType === "percentage" ? (
                    <Form.Group controlId="editPercentageAmount">
                      <Form.Label>Percentage Amount:</Form.Label>
                      <Form.Control
                        type="text"
                        name="percentageAmount"
                        value={editingPromotion.percentageAmount}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                  ) : null}

                  <Form.Group controlId="editCouponCode">
                    <Form.Label>Coupon Code:</Form.Label>
                    <Form.Control
                      type="text"
                      name="couponCode"
                      value={editingPromotion.couponCode}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
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
                  <Button variant="secondary" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </Form>
              </div>
            ) : (
              <div className="actions">
                <Button
                  variant="info"
                  onClick={() => handleEdit(promotion)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(promotion)}
                >
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
