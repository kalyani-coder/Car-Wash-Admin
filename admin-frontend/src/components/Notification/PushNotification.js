import axios from "axios";
import React from "react";
import { useState } from "react";

export default function PushNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendto, setSendTo] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!sendto) {
      alert("Please select the 'Send To' option.");
      return;
    }

    console.log("form submitted", {
      title: title,
      message: message,
      send_to: sendto,
    });
    alert("form submitted ");

    axios
      .post("http://localhost:3000/employee", {
        title: title,
        message: message,
        sendto: sendto,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setMessage("");
    setTitle("");
  };

  return (
    <div>
      <div className="container mt-5">
        <h1>Push Notification</h1>
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
              <option defaultValue>Send To</option>
              <option value="customer">Customer</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
