import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Master = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  // const [washType, setWashType] = useState('');

  const [coatingType, setCoatingType] = useState('');

  const [paintProtectionType, setPaintProtectionType] = useState('');

  const [windowFilmType, setWindowFilmType] = useState('');

  const [vinylWrapsType, setVinylWrapsType] = useState('');

  const [premiumSeatType, setPremiumSeatType] = useState('');

  const [laminationType, setLaminationType] = useState('');

  const [interiorType, setInteriorType] = useState('');

  const [price, setPrice] = useState('');

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleInteriorTypeChange = (event) => {
    setInteriorType(event.target.value);
  };

  const handleLaminationTypeChange = (event) => {
    setLaminationType(event.target.value);
  };

  const handlePremiumSeatTypeChange = (event) => {
    setPremiumSeatType(event.target.value);
  };

  const handleVinylWrapsTypeChange = (event) => {
    setVinylWrapsType(event.target.value);
  };

  const handleWindowFilmTypeChange = (event) => {
    setWindowFilmType(event.target.value);
  };

  const handlePaintProtectionTypeChange = (event) => {
    setPaintProtectionType(event.target.value);
  };

  const handleCoatingTypeChange = (event) => {
    setCoatingType(event.target.value);
  };

  const handleWashTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/washtype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wash_type: washType,
          price: washPrice
        })
      });
      if (response.ok) {
        console.log('Wash type and price added successfully!');
        alert('Wash type and price added successfully!');
        // Optionally, you can reset the form fields after successful submission
        setWashType('');
        setWashPrice('');
      } else {
        console.error('Failed to add wash type and price');
      }
    } catch (error) {
      console.error('Error adding wash type and price:', error);
    }
  };

  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const handleVehicleTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/vehicletype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehicle_Type: vehicleType,
          price: price
        })
      });
      if (response.ok) {
        console.log('Vehicle type and price added successfully!');
        alert('Vehicle type and price added successfully!');
        // Optionally, you can reset the form fields after successful submission
        setVehicleType('');
        setPrice('');
      } else {
        console.error('Failed to add vehicle type and price');
      }
    } catch (error) {
      console.error('Error adding vehicle type and price:', error);
    }
  };


  // const handleWashTypeSubmit = async event => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/washtype', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         wash_Type: washType,
  //         price: price
  //       })
  //     });
  //     if (response.ok) {
  //       console.log('Wash type and price added successfully!');
  //       alert('Wash type and price added successfully!');
  //       setWashType('');
  //       setPrice('');
  //     } else {
  //       console.error('Failed to add wash type and price');
  //     }
  //   } catch (error) {
  //     console.error('Error adding wash type and price:', error);
  //   }
  // };




  const handlePaintProtectionTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/paintprotection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paintProtection_Type: paintProtectionType,
          price: paintProtectionprice
        })
      });
      if (response.ok) {
        console.log('Paint protection type added successfully!');
        alert('Paint protection type added successfully!');
        // Optionally, you can reset the form field after successful submission
        setPaintProtectionType('');
      } else {
        console.error('Failed to add paint protection type');
      }
    } catch (error) {
      console.error('Error adding paint protection type:', error);
    }
  };

  const handleWindowFilmTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/windowfilm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          windowFilm_Type: windowFilmType,
          price: windowfilmnprice
        })
      });
      if (response.ok) {
        console.log('Window film type added successfully!');
        alert('Window film type added successfully!');
        // Optionally, you can reset the form field after successful submission
        setWindowFilmType('');
      } else {
        console.error('Failed to add window film type');
      }
    } catch (error) {
      console.error('Error adding window film type:', error);
    }
  };


  const handleVinylWrapsTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/vinalwraps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          VinylWraps_Type: vinylWrapsType,
          price: vinalwrapsprice
        })
      });
      if (response.ok) {
        console.log('Vinyl wraps type added successfully!');
        alert('Vinyl wraps type added successfully!');
        // Optionally, you can reset the form field after successful submission
        setVinylWrapsType('');
      } else {
        console.error('Failed to add vinyl wraps type');
      }
    } catch (error) {
      console.error('Error adding vinyl wraps type:', error);
    }
  };

  const handlePremiumSeatTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/premiumseat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          premiumSeat_Type: premiumSeatType,
          price: premiumseatprice
        })
      });
      if (response.ok) {
        console.log('Premium leather seat type added successfully!');
        alert('Premium leather seat type added successfully!');
        // Optionally, you can reset the form field after successful submission
        setPremiumSeatType('');
      } else {
        console.error('Failed to add premium leather seat type');
      }
    } catch (error) {
      console.error('Error adding premium leather seat type:', error);
    }
  };

  const handleLaminationTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/lamination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lamination_Type: laminationType,
          price: laminationprice
        })
      });
      if (response.ok) {
        console.log('Lamination type added successfully!');
        alert('Lamination type added successfully!');
        // Optionally, you can reset the form field after successful submission
        setLaminationType('');
      } else {
        console.error('Failed to add lamination type');
      }
    } catch (error) {
      console.error('Error adding lamination type:', error);
    }
  };


  const handleInteriorTypeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/interior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          interiour_Type: interiorType,
          price: interiorprice
        })
      });
      if (response.ok) {
        console.log('Interior décor type added successfully!');
        alert('Interior décor type added successfully!');
        // Optionally, you can reset the form field after successful submission
        setInteriorType('');
      } else {
        console.error('Failed to add interior décor type');
      }
    } catch (error) {
      console.error('Error adding interior décor type:', error);
    }
  };

  const handleCoatingTypeSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/cars/coating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coating_type: coatingType,
          price: coatingprice // Use coatingprice here
        })
      });
      if (response.ok) {
        console.log('Coating type added successfully!');
        alert('Coating type added successfully!');
        setCoatingType('');
        setCoatingPrice(''); // Reset coatingprice state variable
      } else {
        console.error('Failed to add coating type');
      }
    } catch (error) {
      console.error('Error adding coating type:', error);
    }
  };

  const [coatingprice, setCoatingPrice] = useState('');



  const handleCoatingPriceChange = event => {
    setCoatingPrice(event.target.value);
  };


  const [paintProtectionprice, setpaintProtectionPrice] = useState('');

  const handlepaintProtectionPriceChange = event => {
    setpaintProtectionPrice(event.target.value);
  };

  const [windowfilmnprice, setwindowfilmPrice] = useState('');

  const handlewindowfilmPriceChange = event => {
    setwindowfilmPrice(event.target.value);
  };

  const [vinalwrapsprice, setvinalwrapsPrice] = useState('');
  const handlevinalwrapsPriceChange = event => {
    setvinalwrapsPrice(event.target.value);
  };

  const [premiumseatprice, setpremiumseatPrice] = useState('');


  const handlepremiumseatPriceChange = event => {
    setpremiumseatPrice(event.target.value);
  };


  const [laminationprice, setlaminationPrice] = useState('');

  const handlelaminationPriceChange = event => {
    setlaminationPrice(event.target.value);
  };

  const [interiorprice, setinteriorPrice] = useState('');

  const handleinteriorPriceChange = event => {
    setinteriorPrice(event.target.value);
  };


  const [washType, setWashType] = useState('');
  const [washPrice, setWashPrice] = useState('');

  const handleWashTypeChange = (event) => {
    setWashType(event.target.value);
  };

  const handleWashPriceChange = (event) => {
    setWashPrice(event.target.value);
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
            <Form onSubmit={handleVehicleTypeSubmit}>
              <Form.Group controlId="CarVehicleType">
                <Form.Label>Vehicle Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Car Vehicle Type"
                    style={{ width: '50%' }}
                    value={vehicleType}
                    onChange={handleVehicleTypeChange}
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="CarPrice">
                <div className="relative">
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
              </Form.Group>
              <button type="submit" className='btn btn-primary'>Add</button>
            </Form>

            <Form onSubmit={handleWashTypeSubmit}>
      <Form.Group controlId="WashType">
        <Form.Label>Wash Type:</Form.Label>
        <div className="relative">
          <Form.Control
            type="text"
            placeholder="Add Wash Type"
            style={{ width: '50%' }}
            value={washType}
            onChange={handleWashTypeChange}
            required
          />
        </div>
      </Form.Group>
      <Form.Group controlId="WashPrice">
        <div className="relative">
          <Form.Control
            type="number"
            placeholder="Add Price"
            style={{ width: '50%' }}
            value={washPrice}
            onChange={handleWashPriceChange}
            required
          />
        </div>
      </Form.Group>
      <Button type="submit" variant="primary">Add</Button>
    </Form>


            <Form onSubmit={handleCoatingTypeSubmit}>
              <Form.Group controlId="CarCoatingType">
                <Form.Label>Coating Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Coating Type"
                    style={{ width: '50%' }}
                    value={coatingType}
                    onChange={handleCoatingTypeChange}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={coatingprice}
                    onChange={handleCoatingPriceChange}
                  />
                  <button type="submit" className='btn btn-primary'>Add</button>
                </div>
              </Form.Group>
            </Form>

            <Form onSubmit={handlePaintProtectionTypeSubmit}>
              <Form.Group controlId="CarPaintProtectionType">
                <Form.Label>Paint Protection Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Paint Protection Type"
                    style={{ width: '50%' }}
                    value={paintProtectionType}
                    onChange={handlePaintProtectionTypeChange}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={paintProtectionprice}
                    onChange={handlepaintProtectionPriceChange}
                  />
                  <button type="submit" className='btn btn-primary'>Add</button>
                </div>
              </Form.Group>
            </Form>

            <Form onSubmit={handleWindowFilmTypeSubmit}>
              <Form.Group controlId="CarWindowFilmType">
                <Form.Label>Window Films Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Window Films Type"
                    style={{ width: '50%' }}
                    value={windowFilmType}
                    onChange={handleWindowFilmTypeChange}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={windowfilmnprice}
                    onChange={handlewindowfilmPriceChange}
                  />
                  <button type="submit" className='btn btn-primary'>Add</button>
                </div>
              </Form.Group>
            </Form>

            <Form onSubmit={handleVinylWrapsTypeSubmit}>
              <Form.Group controlId="CarVinylWrapsType">
                <Form.Label>Vinyl Wraps Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Vinyl Wraps Type"
                    style={{ width: '50%' }}
                    value={vinylWrapsType}
                    onChange={handleVinylWrapsTypeChange}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={vinalwrapsprice}
                    onChange={handlevinalwrapsPriceChange}
                  />
                  <button type="submit" className='btn btn-primary'>Add</button>
                </div>
              </Form.Group>
            </Form>

            <Form onSubmit={handlePremiumSeatTypeSubmit}>
              <Form.Group controlId="CarPremiumSeatType">
                <Form.Label>Premium Leather Seat Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Premium Leather Seat Type"
                    style={{ width: '50%' }}
                    value={premiumSeatType}
                    onChange={handlePremiumSeatTypeChange}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={premiumseatprice}
                    onChange={handlepremiumseatPriceChange}
                  />
                  <button type="submit" className='btn btn-primary'>Add</button>
                </div>
              </Form.Group>
            </Form>


            <Form onSubmit={handleLaminationTypeSubmit}>
              <Form.Group controlId="CarLaminationType">
                <Form.Label>Lamination Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Lamination Type"
                    style={{ width: '50%' }}
                    value={laminationType}
                    onChange={handleLaminationTypeChange}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={laminationprice}
                    onChange={handlelaminationPriceChange}
                  />
                  <button type="submit" className='btn btn-primary'>Add</button>
                </div>
              </Form.Group>
            </Form>

            <Form onSubmit={handleInteriorTypeSubmit}>
              <Form.Group controlId="CarInteriorType">
                <Form.Label>Interior Décor Type:</Form.Label>
                <div className="relative">
                  <Form.Control
                    type="text"
                    placeholder="Add Interior Décor Type"
                    style={{ width: '50%', marginBottom: "20px" }}
                    value={interiorType}
                    onChange={handleInteriorTypeChange}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Add Price"
                    style={{ width: '50%' }}
                    value={interiorprice}
                    onChange={handleinteriorPriceChange}
                  />
                  <button type="submit" className='btn btn-primary'>Add</button>
                </div>
              </Form.Group>
            </Form>

          </>
        )}

        {/* Bikes section  */}

        {selectedCategory === 'bikes' && (
          <>
            <Form.Group controlId="BikeServices">
              <Form.Label>Bike Types:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Bike Types"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="BikeWashType">
              <Form.Label>Wash Type:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Wash Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="BikeWashType">
              <Form.Label>Exterior Detailing:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Exterior Detailing Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="BikeWashType">
              <Form.Label>Coating:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Coating Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Window Films:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Window Films Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Vinyl Wraps:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Vinyl Wraps Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="CarWashType">
              <Form.Label>Premium Leather Seat Covers:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Premium Leather Seat Covers Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>


            <Form.Group controlId="CarWashType">
              <Form.Label>Lamination:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Lamination Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>


            <Form.Group controlId="CarWashType">
              <Form.Label>Interior Décor:</Form.Label>
              <div className="relative">
                <Form.Control
                  type="text"
                  placeholder="Add Interior Décor Type"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Group>
          </>
        )}
      </div>
    </>
  );
};

export default Master;
