// import React, { useState } from "react";
// import { Form, Button, Col, Row } from "react-bootstrap";
// import "./AddService.css";
// import Alert from "./Alert";

// const AddServices = () => {
//   // const [formData, setFormData] = useState({
//   //   serviceName: "",
//   //   serviceCategory: "",
//   //   servicePrice: "",
//   //   serviceDescription: "",
//   //   serviceOffer: "",
//   //   serviceImage: "",
//   // });

//   const [successAlert, setSuccessAlert] = useState(null);
//   const [errorAlert, setErrorAlert] = useState(null);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({ ...formData, [name]: value });
//   // };

//   const showAlert = (message, type) => {
//     if (type === "success") {
//       setSuccessAlert({ msg: message, type: type });
//       setTimeout(() => {
//         setSuccessAlert(null);
//       }, 5000);
//     } else if (type === "error") {
//       setErrorAlert({ msg: message, type: type });
//       setTimeout(() => {
//         setErrorAlert(null);
//       }, 5000);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post(
//   //       "https://car-wash-backend-api.onrender.com/api/services",
//   //       formData
//   //     );
//   //     console.log("Response Successfully data post:", response.data);
//   //     showAlert("Service Added Successfully", "success");
//   //     // You can handle the response from the API here
//   //   } catch (error) {
//   //     console.error("Error data not post:", error);
//   //     showAlert("Error adding service", "error");

//   //   }
//   // };

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [serviceName, setServiceName] = useState("");
//   const [serviceDescription, setServiceDescription] = useState("");
//   const [serviceOffer, setServicesOffer] = useState(""); // Add this line
//   const [servicePrice, setServicesPrice] = useState(""); // Add this line
//   const [serviceCategory, setServicesCategory] = useState("");

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleServiceNameChange = (event) => {
//     setServiceName(event.target.value);
//   };

//   const handleServiceDescriptionChange = (event) => {
//     setServiceDescription(event.target.value);
//   };

//   const handleServicesOfferChange = (event) => {
//     setServicesOffer(event.target.value);
//   };

//   const handleServicesPriceChange = (event) => {
//     setServicesPrice(event.target.value);
//   };

//   const handleServicesCategoryChange = (event) => {
//     setServicesCategory(event.target.value);
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append("image", selectedFile);
//       formData.append("serviceName", serviceName);
//       formData.append("serviceDescription", serviceDescription);
//       formData.append("serviceOffer", serviceOffer);
//       formData.append("servicePrice", servicePrice);
//       formData.append("serviceCategory", serviceCategory);

//       fetch("https://car-wash-backend-api.onrender.com/api/services", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Image uploaded Successfully:", data.servicesimageUrl);
//           showAlert("Service Added Successfully", "success");
//         })
//         .catch((error) => {
//           console.error("Error uploading image:", error);
//           showAlert("Error adding service", "error");
//         });
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Add Service</h1>

//       {successAlert && <Alert alert={successAlert} />}
//       {errorAlert && <Alert alert={errorAlert} />}

//       <Form.Group controlId="serviceName">
//         <Form.Label>Name of Service:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Service Name"
//           value={serviceName}
//           required
//           onChange={handleServiceNameChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="serviceCategory">
//         <Form.Label>Category of Service:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Service Category"
//           value={serviceCategory}
//           onChange={handleServicesCategoryChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="servicePrice">
//         <Form.Label>Price of Service:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Service Price"
//           value={servicePrice}
//           onChange={handleServicesPriceChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="serviceDescription">
//         <Form.Label>Description:</Form.Label>
//         <Form.Control
//           as="textarea"
//           placeholder="Service Description"
//           value={serviceDescription}
//           onChange={handleServiceDescriptionChange}
//           rows="4"
//         />
//       </Form.Group>

//       {/* <Form.Group controlId="serviceOffer">
//           <Form.Label>Offer on Product:</Form.Label>
//           <Form.Control
//             as="select"
//             name="serviceOffer"
//             value={formData.serviceOffer}
//             onChange={handleChange}
//           >
//           </Form.Control>
//         </Form.Group> */}

//       <Form.Group controlId="serviceOffer">
//         <Form.Label>Offer on Product:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Service Offer"
//           value={serviceOffer}
//           onChange={handleServicesOfferChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="serviceImage">
//         <Form.Label>Upload Image:</Form.Label>
//         <Form.Control
//           type="file"
//           accept="image/*"
//           required
//           onChange={handleFileChange}
//         />
//       </Form.Group>

//       <Row className="justify-content-between mt-4">
//         <Col xs="auto">
//           <Button variant="primary" onClick={handleUpload}>
//             Save
//           </Button>
//         </Col>

//         <Col xs="auto">
//           <Button variant="primary">Discard</Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AddServices;
import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./AddService.css";
import Alert from "./Alert";

const AddServices = () => {
  // const [formData, setFormData] = useState({
  //   serviceName: "",
  //   serviceCategory: "",
  //   servicePrice: "",
  //   serviceDescription: "",
  //   serviceOffer: "",
  //   serviceImage: "",
  // });

  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://car-wash-backend-api.onrender.com/api/services",
  //       formData
  //     );
  //     console.log("Response Successfully data post:", response.data);
  //     showAlert("Service Added Successfully", "success");
  //     // You can handle the response from the API here
  //   } catch (error) {
  //     console.error("Error data not post:", error);
  //     showAlert("Error adding service", "error");

  //   }
  // };

  const [selectedFile, setSelectedFile] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceOffer, setServicesOffer] = useState(""); // Add this line
  const [servicePrice, setServicesPrice] = useState(""); // Add this line
  const [serviceCategory, setServicesCategory] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleServiceNameChange = (event) => {
    setServiceName(event.target.value);
  };

  const handleServiceDescriptionChange = (event) => {
    setServiceDescription(event.target.value);
  };

  const handleServicesOfferChange = (event) => {
    setServicesOffer(event.target.value);
  };

  const handleServicesPriceChange = (event) => {
    setServicesPrice(event.target.value);
  };

  const handleServicesCategoryChange = (event) => {
    setServicesCategory(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Check if the service name already exists
      fetch("https://car-wash-backend-api.onrender.com/api/services")
        .then((response) => response.json())
        .then((data) => {
          const existingServiceNames = data.map(
            (service) => service.serviceName
          );
          if (existingServiceNames.includes(serviceName)) {
            showAlert("Service Already Exists, Add Another Service!", "error");
          } else {
            // If service name doesn't exist, proceed with uploading
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("serviceName", serviceName);
            formData.append("serviceDescription", serviceDescription);
            formData.append("serviceOffer", serviceOffer);
            formData.append("servicePrice", servicePrice);
            formData.append("serviceCategory", serviceCategory);

            fetch("https://car-wash-backend-api.onrender.com/api/services", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(
                  "Image uploaded Successfully:",
                  data.servicesimageUrl
                );
                showAlert("Service Added Successfully", "success");
              })
              .catch((error) => {
                console.error("Error uploading image:", error);
                showAlert("Error adding service", "error");
              });
          }
        })
        .catch((error) =>
          console.error("Error fetching service names:", error)
        );
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Service</h1>

      {successAlert && <Alert alert={successAlert} />}
      {errorAlert && <Alert alert={errorAlert} />}

      <Form.Group controlId="serviceName">
        <Form.Label>Name of Service:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Service Name"
          value={serviceName}
          required
          onChange={handleServiceNameChange}
        />
      </Form.Group>

      <Form.Group controlId="serviceCategory">
        <Form.Label>Category of Service:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Service Category"
          value={serviceCategory}
          onChange={handleServicesCategoryChange}
        />
      </Form.Group>

      <Form.Group controlId="servicePrice">
        <Form.Label>Price of Service:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Service Price"
          value={servicePrice}
          onChange={handleServicesPriceChange}
        />
      </Form.Group>

      <Form.Group controlId="serviceDescription">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Service Description"
          value={serviceDescription}
          onChange={handleServiceDescriptionChange}
          rows="4"
        />
      </Form.Group>

      {/* <Form.Group controlId="serviceOffer">
          <Form.Label>Offer on Product:</Form.Label>
          <Form.Control
            as="select"
            name="serviceOffer"
            value={formData.serviceOffer}
            onChange={handleChange}
          >
          </Form.Control>
        </Form.Group> */}

      <Form.Group controlId="serviceOffer">
        <Form.Label>Offer on Product:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Service Offer"
          value={serviceOffer}
          onChange={handleServicesOfferChange}
        />
      </Form.Group>

      <Form.Group controlId="serviceImage">
        <Form.Label>Upload Image:</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
      </Form.Group>

      <Row className="justify-content-between mt-4">
        <Col xs="auto">
          <Button variant="primary" onClick={handleUpload}>
            Save
          </Button>
        </Col>

        <Col xs="auto">
          <Button variant="primary">Discard</Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddServices;
