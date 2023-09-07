import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AgentDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const agent = location.state;
  

  const [editedAgent, setEditedAgent] = useState(agent);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAgent((prevAgent) => ({
      ...prevAgent,
      [name]: value,
    }));
  };

  const handleEditAgent = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      await axios.patch(
        `https://car-wash-backend-api.onrender.com/api/agents/${editedAgent._id}`,
        editedAgent
      );
      navigate("/viewagent");
      alert("Edited Successfully!");
    } catch (error) {
      console.error("Error editing agent:", error);
    }
  };

  const handleDeleteAgent = async () => {
    try {
      await axios.delete(
        `https://car-wash-backend-api.onrender.com/api/agents/${agent._id}`
      );
      navigate("/viewagent");
      alert("Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  const handleCancle = () => {
    navigate("/viewagent");
  };

  return (
    <div className="container mt-4">
      <h2>Edit {agent.name} Details</h2>
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={editedAgent.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={editedAgent.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              className="form-control"
              name="contactNumber"
              value={editedAgent.contactNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={editedAgent.address}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-primary" onClick={handleEditAgent}>
            Save
          </button>
          <button className="btn btn-danger ml-2" onClick={handleDeleteAgent}>
            Delete
          </button>
          <button className="btn btn-success ml-2" onClick={handleCancle}>
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsPage;
