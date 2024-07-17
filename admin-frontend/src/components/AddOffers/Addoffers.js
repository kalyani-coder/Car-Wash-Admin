import React, { useEffect, useState } from 'react';
import Alert from '../Service/Alert';
import { Form, Button, Col } from "react-bootstrap";
import Sidebar from '../Sidebar/Sidebar';
const Addoffers = () => {
  // const [offerData, setOfferData] = useState({
  //   offerName: '',
  //   offer: '',
  //   homeservicesName: '',
  //   description: '',
  //   totalPrice: '',
  //   image: '',
  //   startDate: '', // New start date field
  //   endDate: '' // New end date field
  // });

  const percentageOptions = ['10%', '20%', '30%', '40%', '50%'];

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setOfferData({
  //     ...offerData,
  //     [name]: value,
  //   });
  // };

  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  const showAlert = (message, type) => {
    if (type === "success") {
      setSuccessAlert({ msg: message, type: type });
      setTimeout(() => {
        setSuccessAlert(null);
      }, 5000);
    } else if (type === "error") {
      setErrorAlert({ msg: message, type: type });
      setTimeout(() => {
        setErrorAlert(null);
      }, 5000);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   fetch('http://localhost:9898/api/homeoffers', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(offerData),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Offer added successfully', data);
  //       showAlert("Offer Added Successfully", "success");

  //       setOfferData({
  //         offerName: '',
  //         offer: '',
  //         homeservicesName: '',
  //         description: '',
  //         totalPrice: '',
  //         image: '',
  //         startDate: '',
  //         endDate: ''
  //       });
  //     })
  //     .catch(error => console.error('Error adding offer:', error));
  // };


  const [selectedFile, setSelectedFile] = useState(null);
  const [offerName, setOffers] = useState('');
  const [selectedPercentage, setSelectedPercentage] = useState('');
  const [serviceName, setserviceName] = useState('');
  const [description, setDescription] = useState('')

  const [totalPrice, setTotalPrice] = useState('')

  const [startDate , setStartDate] = useState('')
  const [endDate , setEndDate] = useState('')

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value)
  }
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value)
  }


  const handleTotalPrice = (event) => {
    setTotalPrice(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleServiceName = (event) => {
    setserviceName(event.target.value)
  }


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleOffereChange = (event) => {
    setOffers(event.target.value);
  };

  const handlePercentageChange = (event) => {
    setSelectedPercentage(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();

      formData.append('image', selectedFile);
      formData.append("offerName", offerName)
      formData.append("selectedPercentage", selectedPercentage);
      formData.append("serviceName", serviceName)
      formData.append('description', description)
      formData.append("totalPrice", totalPrice)
      formData.append("startDate" , startDate)
      formData.append("endDate" , endDate)



      fetch('http://localhost:9898/api/homeoffers', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded Successfully:', data.image);
          showAlert("Offer Added Successfully", "success");
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          showAlert("Error adding service", "error");
        });
    }
  };

  return (

    <>
    <Sidebar/>
    <div className="container mt-5">
      <h1>Add Offers</h1>
      {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}

      <div className="form-container">
        <form>

          <Form.Group controlId="offerName">
            <Form.Label>Add Offer Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add Offer Name"
              name="offerName"
              value={offerName}
              required
              onChange={handleOffereChange}

            />
          </Form.Group>

          <Form.Group controlId="selectedPercentage">
            <Form.Label>Select Percentage:</Form.Label>
            <Form.Control
              as="select"
              name='selectedPercentage'
              onChange={handlePercentageChange}
              value={selectedPercentage}
              required
            >
              <option value="">Select Percentage</option>
              {percentageOptions.map((percentage, index) => (
                <option key={index} value={percentage}>{percentage}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="serviceName">
            <Form.Label>Add Service Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add Offer Name"
              name="serviceName"
              value={serviceName}
              required
              onChange={handleServiceName}

            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Add Descripiton:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add Offer Name"
              name="description"
              value={description}
              required
              onChange={handleDescriptionChange}

            />
          </Form.Group>

          <Form.Group controlId="totalPrice">
            <Form.Label>Add Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Add Offer Price"
              name="totalPrice"
              value={totalPrice}
              required
              onChange={handleTotalPrice}

            />
          </Form.Group>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              required
            />
          </div>



          <Form.Group controlId="image">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleFileChange}

            />
          </Form.Group>


          <Col xs="auto">
            <Button variant="dark" onClick={handleUpload} >
              Save
            </Button>
          </Col>

        </form>
      </div>
    </div>
    </>
  );
}

export default Addoffers;
