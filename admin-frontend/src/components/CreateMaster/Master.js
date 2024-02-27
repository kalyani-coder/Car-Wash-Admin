import React, { useState } from 'react';
import { Form } from "react-bootstrap";

const Master = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div className='container'>
        <h1>Create Master</h1>
        <Form.Group controlId="SelectClient">
          <Form.Label>Vehicle Category:</Form.Label>
          <div className="relative">
            <Form.Select
              className="custom-select"
              aria-label="Select Client"
              style={{ width: '50%' }}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option >Select Vehicle Category</option>
              <option value="cars">Cars</option>
              <option value="bikes">Bikes</option>
            </Form.Select>
          </div>
        </Form.Group>

        {/* Conditional rendering based on selected category */}
        {selectedCategory === 'cars' && (
          <>
            <Form.Group controlId="CarVehicleType">
              <Form.Label>Vehicle Type:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Vehicle Type"
                  style={{ width: '50%' }}
                >
                  <option>Car Type</option>
                  <option>Hatchback</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Luxury</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Wash Type:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Wash Type</option>
                  <option>Body Wash</option>
                  <option>Interior Deep Cleaning</option>
                  <option>Hard Water Removal</option>
                  <option>Premium Wash</option>
                  <option>Premium Wash (detail info marker - Wash+Vacuum+Interior&Exterior Polish)</option>
                  <option>Clay Wash, Iron Wash, Tar Wash, Diesel Wash</option>

                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Coating:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Coating Type</option>
                  <option>Ceramic (9H)</option>
                  <option>Regular 1 & 2 year warranty (1 maintenance in 2 years)</option>
                  <option>Premium 3 years warranty (2 maintenance in 3 years)</option>
                  <option>Luxury 5 years and lifetime warranty (4 or 14 maintenance in 5 or 15 years)</option>
                  <option>Engine Coating</option>
                  <option>Silencer Coating</option>
                  <option>Underbody Coating</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Paint Protection Films:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Paint Protection Films</option>
                  <option>Glossy
                    Regular 3 years warranty (Glossgenic & Garware )</option>
                  <option>Premium 5 years warranty
                    (Glossgenic, Garware & Llumar)</option>
                  <option>Exclusive 7 years warranty
                    (Glossgenic)</option>
                  <option>Luxe 10 years warranty (Glossgenic & Llumar)</option>
                  <option>Elegance 12 years warranty (Llumar)</option>
                </Form.Select>
              </div>
            </Form.Group>


            <Form.Group controlId="CarWashType">
              <Form.Label>Window Films:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Window Films</option>
                  <option>Garware</option>
                  <option>Llumar </option>

                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Vinyl Wraps:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Vinyl Wraps</option>
                  <option>Regular</option>
                  <option>Ceramic Coating</option>

                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Premium Leather Seat Covers:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Premium Leather Seat Covers</option>
                  <option>Bentley Leather</option>
                  <option>German Leather</option>
                  <option>NAPA Leather</option>
                  <option>Lavish Leather</option>

                </Form.Select>
              </div>
            </Form.Group>


            <Form.Group controlId="CarWashType">
              <Form.Label>Lamination:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Lamination</option>
                  <option>Exotic Floor Lamination</option>
                  <option>7D Mats</option>
                  <option>3D Mats</option>

                </Form.Select>
              </div>
            </Form.Group>


            <Form.Group controlId="CarWashType">
              <Form.Label>Interior Décor:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%', marginBottom: "20px" }}
                >
                  <option>Interior Décor</option>
                  <option>Ambient lighting</option>
                  <option>Full Interior Modification</option>

                </Form.Select>
              </div>
            </Form.Group>

          </>
        )}

        {/* Bikes section  */}

        {selectedCategory === 'bikes' && (
          <>
            <Form.Group controlId="BikeServices">
              <Form.Label>Bike Types:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Bike Service"
                  style={{ width: '50%' }}
                >
                  <option>Bike Types</option>
                  <option>Mopeds</option>
                  <option>Motorcycles</option>
                  <option>Sports</option>
                  <option>Sports</option>
                  <option>Off-road Bikes</option>

                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="BikeWashType">
              <Form.Label>Wash Type:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Wash Type</option>
                  <option>Body Wash</option>
                  <option>Interior Deep Cleaning</option>
                  <option>Hard Water Removal</option>
                  <option>Premium Wash</option>
                  <option>Premium Wash (detail info marker - Wash+Vacuum+Interior&Exterior Polish)</option>
                  <option>Clay Wash, Iron Wash, Tar Wash, Diesel Wash</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="BikeWashType">
              <Form.Label>Exterior Detailing:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Exterior Detailing</option>
                  <option>Hard Water Removal</option>
                  <option>Rubbing/ Compunding/ Polishing</option>
                  <option>Windshield Polish</option>
                  <option>Glass Coating</option>
                  <option>Alloy Wheel Cleaning & Polish</option>
                  <option>Wheels Off Detailing</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="BikeWashType">
              <Form.Label>Coating:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>coating</option>
                  <option>Graphene (10H)
                    Regular 1 & 2 year warranty (1 maintenance in 2 years)</option>
                  <option>Premium 3 years warranty (2 maintenance in 3 years)</option>
                  <option>Luxury 5 years and lifetime warranty (4 or 14 maintenance in 5 or 15 years)</option>
                  <option>Engine Coating</option>
                  <option>Silencer Coating</option>
                  <option>Underbody Coating</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Window Films:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Window Films</option>
                  <option>Garware</option>
                  <option>Llumar </option>

                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Vinyl Wraps:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Vinyl Wraps</option>
                  <option>Regular</option>
                  <option>Ceramic Coating</option>

                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Premium Leather Seat Covers:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Premium Leather Seat Covers</option>
                  <option>Bentley Leather</option>
                  <option>German Leather</option>
                  <option>NAPA Leather</option>
                  <option>Lavish Leather</option>

                </Form.Select>
              </div>
            </Form.Group>


            <Form.Group controlId="CarWashType">
              <Form.Label>Lamination:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%' }}
                >
                  <option>Lamination</option>
                  <option>Exotic Floor Lamination</option>
                  <option>7D Mats</option>
                  <option>3D Mats</option>

                </Form.Select>
              </div>
            </Form.Group>


            <Form.Group controlId="CarWashType">
              <Form.Label>Interior Décor:</Form.Label>
              <div className="relative">
                <Form.Select
                  className="custom-select"
                  aria-label="Select Car Wash Type"
                  style={{ width: '50%', marginBottom: "20px" }}
                >
                  <option>Interior Décor</option>
                  <option>Ambient lighting</option>
                  <option>Full Interior Modification</option>

                </Form.Select>
              </div>
            </Form.Group>
          </>
        )}
      </div>
    </>
  );
};

export default Master;
