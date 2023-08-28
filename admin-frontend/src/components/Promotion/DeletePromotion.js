import axios from "axios";
import React, { useState, useEffect } from "react";

export default function DeletePromotion() {
  const [Promotions, setPromotions] = useState([]);
  // const Promotions = ["Offer A", "Offer B", "Offer C"]; // Replace this with your list of Offers
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  useEffect(() => {
    axios.get("/api/promotions/getPromotions").then((response) => {
      setPromotions(response.data);
    });
  }, []);

  const handlePromotionChange = (event) => {
    setSelectedPromotion(event.target.value);
  };

  const handleConfirmationChange = (event) => {
    setConfirmationChecked(event.target.checked);
  };

  const handleDeletePromotion = () => {
    if (confirmationChecked && selectedPromotion !== "") {
      axios
        .delete(`/api/promotions/deletePromotion/${selectedPromotion}`)
        .then((res) => {
          setPromotions(res.data);
        });
      alert(`Offer "${selectedPromotion}" will be deleted.`);
    } else {
      alert("Please select an Offer and confirm before deleting.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {" "}
        {/* Center content */}
        <div className="col-md-6 Promotion-page">
          {" "}
          {/* Apply styles to the form container */}
          <div className="mb-3">
            <select
              className="form-select"
              value={selectedPromotion}
              onChange={handlePromotionChange}
            >
              <option value="">Select Offer</option>
              {Promotions.map((Promotion) => (
                <option key={Promotion.Id} value={Promotion.Id}>
                  {Promotion.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="confirmationCheck"
              checked={confirmationChecked}
              onChange={handleConfirmationChange}
            />
            <label className="form-check-label" htmlFor="confirmationCheck">
              Are you sure you want to delete Offer ?
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button
              onClick={handleDeletePromotion}
              className="btn btn-primary"
              disabled={!confirmationChecked || selectedPromotion === ""}
            >
              Delete Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
