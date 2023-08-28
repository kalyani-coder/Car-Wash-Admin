import React, { useState } from "react";
import axios from "axios";

const AddAgentPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!fullName) validationErrors.fullName = "Full Name is required.";
    if (!email) validationErrors.email = "Email is required.";
    if (!mobileNumber)
      validationErrors.mobileNumber = "Mobile Number is required.";
    if (!dateOfBirth) validationErrors.dateOfBirth = "DOB is required.";
    if (!address) validationErrors.address = "Address is required.";
    if (!profilePic) validationErrors.profilePic = "Profile Pic is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("contactNumber", mobileNumber);
    formData.append("email", email);
    formData.append("dob", dateOfBirth);
    formData.append("address", address);
    formData.append("profilePic", profilePic);

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:5000/api/agents/addAgent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Agent added successfully");
        setFullName("");
        setEmail("");
        setMobileNumber("");
        setDateOfBirth("");
        setAddress("");
        setProfilePic(null);
      } else {
        console.error("Failed to add agent");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.fullName && "is-invalid"}`}
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            className={`form-control ${errors.mobileNumber && "is-invalid"}`}
            id="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            required
          />
          {errors.mobileNumber && (
            <div className="invalid-feedback">{errors.mobileNumber}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth (DD/MM/YYYY)
          </label>
          <input
            type="text"
            className={`form-control ${errors.dateOfBirth && "is-invalid"}`}
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            required
          />
          {errors.dateOfBirth && (
            <div className="invalid-feedback">{errors.dateOfBirth}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className={`form-control ${errors.address && "is-invalid"}`}
            id="address"
            value={address}
            onChange={handleAddressChange}
            required
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className={`form-control ${errors.profilePic && "is-invalid"}`}
            id="profilePic"
            onChange={handleProfilePicChange}
            accept="image/*"
            required
          />
          {errors.profilePic && (
            <div className="invalid-feedback">{errors.profilePic}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddAgentPage;
