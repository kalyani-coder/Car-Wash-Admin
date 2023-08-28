import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import axios from "axios";


export default function DeleteService() {
  const [services, setServices] = useState([]);
  // const services = ["Service A", "Service B", "Service C"]; // Replace this with your list of services
  const [selectedService, setSelectedService] = useState("");
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  useEffect(() => {
    axios.get("/api/services/getServices").then((response) => {
      setServices(response.data);
    });
  }, []);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleConfirmationChange = (event) => {
    setConfirmationChecked(event.target.checked);
  };

  const handleDeleteService = () => {
    if (confirmationChecked && selectedService !== "") {
      alert(`Service "${selectedService}" will be deleted.`);

      axios
        .delete(`/api/services/deleteService/${selectedService}`)
        .then((res) => {
          setServices(res.data);
        });
    } else {
      alert("Please select a service and confirm before deleting.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {" "}
        {/* Center content */}
        <div className="col-md-6 service-page">
          {" "}
          {/* Apply styles to the form container */}
          <div className="mb-3">
            <select
              className="form-select"
              value={selectedService}
              onChange={handleServiceChange}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
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
              Are you sure you want to delete service ?
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button
              onClick={handleDeleteService}
              className="btn btn-primary"
              disabled={!confirmationChecked || selectedService === ""}
            >
              Delete Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
