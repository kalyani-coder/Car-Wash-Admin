import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import "./PromotionView.css";

export default function PromotionView() {
  const [promotions, setPromotions] = useState([]);

  // Mock API response
  const mockApiData = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Get amazing discounts on summer products!",
      service: "service1",
      offerType: "fixed",
      fixedAmount: "20",
      percentageAmount: "",
      couponCode: "SUMMER20",
    },
    {
      id: 2,
      title: "Back to School",
      description: "10% off on all school supplies.",
      service: "service2",
      offerType: "percentage",
      fixedAmount: "",
      percentageAmount: "10",
      couponCode: "SCHOOL10",
    },
    // Add more mock data as needed
  ];

  useEffect(() => {
    // Simulate fetching data from the API
    setTimeout(() => {
      setPromotions(mockApiData);
    }, 1000); // Simulating a delay of 1 second
  }, []);
  const handleEdit = (id) => {
    // Handle edit action based on the promotion id
    console.log(`Edit promotion with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action based on the promotion id
    console.log(`Delete promotion with ID: ${id}`);
    // Update the promotions state after deleting
    setPromotions(promotions.filter((promotion) => promotion.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1>Promotion View</h1>
      <div className="card-container">
        {promotions.map((promotion) => (
          <Card key={promotion.id} className="promotion-card my-3">
            <Card.Body>
              <Card.Title>{promotion.title}</Card.Title>
              <Card.Text>{promotion.description}</Card.Text>
              <Card.Text>Service: {promotion.service}</Card.Text>
              <Card.Text>
                Offer Type:{" "}
                {promotion.offerType === "fixed"
                  ? "Fixed Amount"
                  : "Percentage Amount"}
              </Card.Text>
              {promotion.offerType === "fixed" && (
                <Card.Text>Fixed Amount: ${promotion.fixedAmount}</Card.Text>
              )}
              {promotion.offerType === "percentage" && (
                <Card.Text>Percentage: {promotion.percentageAmount}%</Card.Text>
              )}
              <Card.Text>Coupon Code: {promotion.couponCode}</Card.Text>
              <div className="card-buttons">
                <button
                  variant="primary"
                  onClick={() => handleEdit(promotion.id)}
                  className="btn btn-primary mx-3"
                >
                  Edit
                </button>
                <button
                  variant="danger"
                  onClick={() => handleDelete(promotion.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
