import React, { useState } from "react";
import axios from "axios";
import Alert from "../Service/Alert"; // Make sure to import the Alert component

export default function PushNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendto, setSendTo] = useState(null);
  const [alertval, setAlert] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();
  
    if (!sendto) {
      showAlert("Please select the 'Send To' option.", "danger"); // Show alert
      return;
    }
  
    console.log("form submitted", {
      title: title,
      message: message,
      sendto: sendto,
    });
  
    const apiUrl = sendto === "agent" ? "/api/agentnotifications" : "/api/notification";
  
    axios
      .post(`https://car-wash-backend-api.onrender.com${apiUrl}`, {
        title: title,
        message: message,
        sendto: sendto,
      })
      .then(function (response) {
        showAlert("Notification Sent Successfully!", "success"); // Show success alert
        console.log(response);
      })
      .catch(function (error) {
        showAlert("Error sending notification. Please try again.", "danger"); // Show error alert
        console.log(error);
      });
  
    setMessage("");
    setTitle("");
  };
  

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div>
      <div className="container mt-5">
        <h1>Push Notification</h1>
        {alertval && <Alert alert={alertval} />} {/* Render the alert */}
        <form onSubmit={handlesubmit}>
          <div className="form-outline ">
            <label className="form-label" htmlFor="typeText">
              Title of Notification
            </label>
            <input
              type="text"
              id="typeText"
              value={title}
              required
              placeholder="Title of notification"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="form-outline">
            <label className="form-label" htmlFor="textAreaExample">
              Message
            </label>
            <textarea
              className="form-control"
              id="textAreaExample"
              rows="4"
              value={message}
              required
              placeholder="Enter Message for Agents and Customer"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <select
              className="browser-default custom-select my-3"
              value={sendto}
              onChange={(e) => {
                setSendTo(e.target.value);
              }}
              required
            >
              <option defaultValue disabled>Select Send To</option>
              <option value="customer">Customers</option>
              <option value="agent">Agents</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-warning" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
