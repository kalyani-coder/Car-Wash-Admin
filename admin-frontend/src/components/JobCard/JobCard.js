import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./JobCard.css";
import axios from "axios";

const JobCard = () => {
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientData, setClientData] = useState(null);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');

  const [washTypes, setWashTypes] = useState([]);
  const [selectedWashType, setSelectedWashType] = useState('');

  const [selectedCoating, setSelectedCoating] = useState('');

  const [coatingTypes, setCoatingTypes] = useState([]);

  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/washtype')
      .then(response => response.json())
      .then(data => {
        setWashTypes(data);
      })
      .catch(error => {
        console.error('Error fetching wash types:', error);
      });
  }, []);

  const handleWashTypeChange = (event) => {
    setSelectedWashType(event.target.value);
  };

 

  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/vehicletype')
      .then(response => response.json())
      .then(data => {
        setVehicleTypes(data);
      })
      .catch(error => {
        console.error('Error fetching vehicle types:', error);
      });
  }, []);

  const handleVehicleTypeChange = (event) => {
    setSelectedVehicleType(event.target.value);
  };


  


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // useEffect(() => {
  //   // Fetch data from the clients API
  //   fetch("https://car-wash-backend-api.onrender.com/api/clients")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setClients(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching clients data:", error);
  //     });

  //   // Fetch data from the bookings API
  //   fetch("https://car-wash-backend-api.onrender.com/api/bookings")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBookings(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching bookings data:", error);
  //     });
  // }, []);


  useEffect(() => {
    // Fetch data from the bookings API
    fetch("https://car-wash-backend-api.onrender.com/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        // Extract unique client names from bookings data
        const uniqueClients = Array.from(new Set(data.map(booking => booking.clientName)));
        setClients(uniqueClients);
      })
      .catch((error) => {
        console.error("Error fetching bookings data:", error);
      });
  }, []);

  const handleClientChange = (event) => {
    const selectedClientName = event.target.value;
    setSelectedClient(selectedClientName);
    // Find the booking data for the selected client
    const selectedClientData = bookings.find(booking => booking.clientName === selectedClientName);
    if (selectedClientData) {
      // Set the client data with the details fetched from the booking data
      setClientData(selectedClientData);
    } else {
      // If no data found for the selected client, reset clientData
      setClientData(null);
    }
  };

  // console.log("newcilent id and name",  selectedClient)
  

  // const handleClientChange = (event) => {
  //   const selectedClientId = event.target.value;
  //   setSelectedClient(selectedClientId);

  //   // Find the selected client data
  //   const selectedClientData = clients.find(
  //     (client) => client._id === selectedClientId
  //   );

  //   // Find the booking data for the selected client
  //   const selectedBookingData = bookings.find(
  //     (booking) => booking.clientId === selectedClientId
  //   );

  //   // Merge client data with booking data
  //   const mergedData = { ...selectedClientData, ...selectedBookingData };

  //   setClientData(mergedData);
  // };

 
  const handleCoatingChange = (event) => {
    setSelectedCoating(event.target.value);
  };


  const fetchCoatingTypes = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/coating');
      if (response.ok) {
        const data = await response.json();
        setCoatingTypes(data);
      } else {
        console.error('Failed to fetch coating types');
      }
    } catch (error) {
      console.error('Error fetching coating types:', error);
    }
  };

  const [paintProtection, setPaintProtection] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [windowFilms, setWindowFilms] = useState([]);
  const [windowselectedOption, setwindowSelectedOption] = useState('');

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleWindowSelectChange = event => {
    setwindowSelectedOption(event.target.value);
  };

  const fetchPaintProtection = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/paintprotection');
      if (response.ok) {
        const data = await response.json();
        setPaintProtection(data);
      } else {
        console.error('Failed to fetch coating types');
      }
    } catch (error) {
      console.error('Error fetching coating types:', error);
    }
  };

  const fetchWindowFilms = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/windowfilm');
      if (response.ok) {
        const data = await response.json();
        setWindowFilms(data);
      } else {
        console.error('Failed to fetch window films');
      }
    } catch (error) {
      console.error('Error fetching window films:', error);
    }
  };

  const fetchVinylWraps = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/vinalwraps');
      if (response.ok) {
        const data = await response.json();
        setVinylWraps(data); // No need to wrap data inside an array
      } else {
        console.error('Failed to fetch vinyl wraps');
      }
    } catch (error) {
      console.error('Error fetching vinyl wraps:', error);
    }
  };
  const handleVinylWrapsSelectChange = event => {
    setVinylWrapsSelectedOption(event.target.value);
  };

  const fetchPremiumSeatCovers = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/premiumseat');
      if (response.ok) {
        const data = await response.json();
        setPremiumSeatCovers(data);
      } else {
        console.error('Failed to fetch premium leather seat covers');
      }
    } catch (error) {
      console.error('Error fetching premium leather seat covers:', error);
    }
  };

  const handleseatcoverSelectChange = event => {
    setSeatcoverSelectedOption(event.target.value);
  };

  const fetchLaminationTypes = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/lamination');
      if (response.ok) {
        const data = await response.json();
        setLaminationTypes(data);
      } else {
        console.error('Failed to fetch lamination types');
      }
    } catch (error) {
      console.error('Error fetching lamination types:', error);
    }
  };
  const handleLaminationSelectChange = event => {
    setLaminationSelectedOption(event.target.value);
  };

  const fetchInteriorDecorOptions = async () => {
    try {
      const response = await fetch('https://car-wash-backend-api.onrender.com/api/master/interior');
      if (response.ok) {
        const data = await response.json();
        setInteriorDecorOptions(data);
      } else {
        console.error('Failed to fetch interior decor options');
      }
    } catch (error) {
      console.error('Error fetching interior decor options:', error);
    }
  };

  const handleInteriorDecorSelectChange = event => {
    setInteriorDecorSelectedOption(event.target.value);
  };




  const [vinylWraps, setVinylWraps] = useState([]);
  const [vinylWrapsSelectedOption, setVinylWrapsSelectedOption] = useState('');

  const [premiumSeatCovers, setPremiumSeatCovers] = useState([]);
  const [seatcoverselectedOption, setSeatcoverSelectedOption] = useState('');

  const [laminationTypes, setLaminationTypes] = useState([]);
  const [laminationSelectedOption, setLaminationSelectedOption] = useState('');

  const [interiorDecorOptions, setInteriorDecorOptions] = useState([]);
  const [interiorDecorselectedOption, setInteriorDecorSelectedOption] = useState('');

  const [treatment , setTreatment] = useState('')

  const handleTreatmentChange = (event) => {
    setTreatment(event.target.value)
  }


 
  useEffect(() => {
    fetchCoatingTypes();
    fetchPaintProtection();
    fetchWindowFilms();
    fetchVinylWraps();
    fetchPremiumSeatCovers();
    fetchLaminationTypes();
    fetchInteriorDecorOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVehicleType || !selectedCategory || !selectedWashType) {
      console.error('Please select a vehicle category, type, and wash type.');
      alert('Please select a vehicle category, type, and wash type.');
      return;
    }


    const selectedWashTypeData = washTypes.find(wash => wash.wash_type === selectedWashType);
    const washTypePrice = selectedWashTypeData ? selectedWashTypeData.price : 0;

    const selectedCoatingData = coatingTypes.find(coating => coating.coating_type === selectedCoating);
    const coatingPrice = selectedCoatingData ? selectedCoatingData.price : 0;

    const selectedPaintProtectionData = paintProtection.find(option => option._id === selectedOption);
    const paintProtectionPrice = selectedPaintProtectionData ? selectedPaintProtectionData.price : 0;
    const paintProtectionName = selectedPaintProtectionData ? selectedPaintProtectionData.paintProtection_Type : "";

    const selectedWindowFilmData = windowFilms.find(windowfilm => windowfilm._id === windowselectedOption)
    const windowFilmPrice = selectedWindowFilmData ? selectedWindowFilmData.price : 0;
    const windowFilmName = selectedWindowFilmData ? selectedWindowFilmData.windowFilm_Type : "";

    const selectedPremiumSeatCoverData = premiumSeatCovers.find(cover => cover._id === seatcoverselectedOption);
    const premiumSeatCoverPrice = selectedPremiumSeatCoverData ? selectedPremiumSeatCoverData.price : 0;
    const premiumSeatCoverName = selectedPremiumSeatCoverData ? selectedPremiumSeatCoverData.premiumSeat_Type : "";

    const selectedVinylWrapData = vinylWraps.find(wrap => wrap.VinylWraps_Type === vinylWrapsSelectedOption);
    const vinylWrapName = selectedVinylWrapData ? selectedVinylWrapData.VinylWraps_Type : "";
    const vinylWrapPrice = selectedVinylWrapData ? selectedVinylWrapData.price : 0;

    const selectedLaminationData = laminationTypes.find(lamination => lamination._id === laminationSelectedOption);
    const laminationName = selectedLaminationData ? selectedLaminationData.lamination_Type : "";
    const laminationPrice = selectedLaminationData ? selectedLaminationData.price : 0;


    const selectedInteriorDecorData = interiorDecorOptions.find(decor => decor._id === interiorDecorselectedOption);
    const interiorDecorName = selectedInteriorDecorData ? selectedInteriorDecorData.interiour_Type : "";
    const interiorDecorPrice = selectedInteriorDecorData ? selectedInteriorDecorData.price : 0;

    const totalAmount = washTypePrice +
                    coatingPrice +
                    paintProtectionPrice +
                    windowFilmPrice +
                    premiumSeatCoverPrice +
                    vinylWrapPrice +
                    laminationPrice +
                    interiorDecorPrice;

    try {

      const data = {
        clientId: selectedClient, // Use the selected client's ID
        name: clientData ? clientData.clientName : "",
        // email: clientData ? clientData.clientEmail : "",
        phone: clientData ? clientData.clientContact : "",
        address: clientData ? clientData.pickupAddress : "",
        vehicle_Make: clientData ? clientData.clientcarmodelno : "",
        vehicle_Number: clientData ? clientData.clientvehicleno : "",
        vehicle_Category: selectedCategory,
        vehicle_Type: selectedVehicleType,
        wash_type: selectedWashType,
        wash_type_price: washTypePrice,
        coating: selectedCoating,
        coating_Price: coatingPrice,
        paint_protection_field: paintProtectionName,
        paint_protection_field_Price: paintProtectionPrice,
        window_films: windowFilmName,
        window_films_Price: windowFilmPrice,
        premium_seat_cover: premiumSeatCoverName,
        premium_seat_cover_Price: premiumSeatCoverPrice,
        vinly_wraps: vinylWrapName,
        vinly_wraps_Price: vinylWrapPrice,
        lamination: laminationName,
        lamination_Price: laminationPrice,
        interiour_decor: interiorDecorName,
        interiour_decor_Price: interiorDecorPrice,
        TotalAmount :totalAmount,
        treatment : treatment,

      };

      // Send POST request to the API
      const response = await axios.post(
        "https://car-wash-backend-api.onrender.com/api/jobcard",
        data
      );

      // Set the response message
      setResponseMessage(response.data.message);
      alert('Job Card Created successfully');
    } catch (error) {
      console.error("Error posting data:", error);
      setResponseMessage("An error occurred while posting data.");
    }
  };



  return (
    <>
      <div className="container">
        {/* fetching customers for craeting jobcard  */}
        <div className="abc">
          <h1>Create Job Card</h1>
          <Form.Group controlId="SelectClient">
          <Form.Label>Select Client:</Form.Label>
          <div className="relative">
            <Form.Select
              className="w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              aria-label="Select Client"
              value={selectedClient}
              onChange={handleClientChange}
            >
              <option>Select Client</option>
              {clients.map((clientName, index) => (
                <option key={index} value={clientName}>
                  {clientName}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>


          <Form.Group controlId="name">
            <Form.Label>Customer Name:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              className=""
              placeholder="Enter Full Name"
              value={clientData ? clientData.clientName : ""}
              readOnly
            />
          </Form.Group>

          {/* <Form.Group controlId="email">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              className=""
              placeholder="Enter E-mail Address"
              value={clientData ? clientData.clientEmail : ""}
              readOnly
            />
          </Form.Group> */}

          <Form.Group controlId="phone">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              className=""
              placeholder="Enter Phone Number"
              value={clientData ? clientData.clientContact : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="Address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              className=""
              placeholder="Enter  Address"
              value={clientData ? clientData.pickupAddress : ""}
              readOnly
            />
          </Form.Group>
          

        
      {clientData && (
        <>
          <Form.Group controlId="modelYear">
            <Form.Label>Vehicle Make/Model:</Form.Label>
            <Form.Control
              type="text"
              name="modelYear"
              className=""
              placeholder="Enter Vehicle Model and Year"
              value={clientData.clientcarmodelno || ""}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="vehicleNumber">
            <Form.Label>Vehicle Number:</Form.Label>
            <Form.Control
              type="text"
              name="vehicleNumber"
              className=""
              placeholder="Enter Vehicle Number"
              value={clientData.clientvehicleno || ""}
              readOnly
            />
          </Form.Group>
        </>
      )}

{/* 
          <Form.Group controlId="modelYear">
            <Form.Label>Vehicle Make/Model:</Form.Label>
            <Form.Control
              type="text"
              name="modelYear"
              className=""
              placeholder="Enter Vehicle Model and Year"
              value={clientData ? clientData.clientcarmodelno : ""}
              readOnly
            />
          </Form.Group> */}

          <Form.Group controlId="treatent">
            <Form.Label>Treatment:</Form.Label>
            <Form.Control
              type="text"
              name="treatent"
              className=""
              placeholder="Enter Treatent"
              style={{width :"50%"}}
              value={treatment}
              onChange={handleTreatmentChange}
             
            
            />
          </Form.Group>

        </div>

        {/* Cars details for creating job card  */}
        <div>
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
                <option  >Select Vehicle Category</option>
                <option value="Car">Car</option>
                <option value="bikes">Bikes</option>
              </Form.Select>
            </div>
          </Form.Group>

          {/* Conditional rendering based on selected category */}
          {selectedCategory === 'Car' && (
            <>
              <Form.Group controlId="CarVehicleType">
                <Form.Label>Vehicle Type:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Car Vehicle Type"
                    style={{ width: '50%' }}
                    value={selectedVehicleType}
                    onChange={handleVehicleTypeChange}
                  >
                    <option>Select Car Type</option>
                    {vehicleTypes.map(vehicleType => (
                      <option key={vehicleType._id} value={vehicleType.vehicle_Type}>
                        {vehicleType.vehicle_Type}
                      </option>
                    ))}
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
                    value={selectedWashType}
                    onChange={handleWashTypeChange}
                  >
                    <option>Select Wash Type</option>
                    {washTypes.map(washType => (
                      <option key={washType._id} value={washType.wash_type}>
                        {washType.wash_type}
                      </option>
                    ))}
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
                    value={selectedCoating}
                    onChange={handleCoatingChange}
                  >
                    <option value="">Coating Type</option>
                    {coatingTypes.map((coating) => (
                      <option key={coating._id} value={coating.coating_type}>
                        {coating.coating_type}
                      </option>
                    ))}
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
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select an option</option>
                    {paintProtection.map((option, index) => (
                      <option key={index} value={option._id}>{option.paintProtection_Type}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Window Films:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Window Film Type"
                    style={{ width: '50%' }}
                    value={windowselectedOption}
                    onChange={handleWindowSelectChange}
                  >
                    <option value="">Select an option</option>
                    {windowFilms.map(film => (
                      <option key={film._id} value={film._id}>{film.windowFilm_Type}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Vinyl Wraps:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Vinyl Wrap Type"
                    style={{ width: '50%' }}
                    value={vinylWrapsSelectedOption}
                    onChange={handleVinylWrapsSelectChange}
                  >
                    <option value="">Select an option</option>
                    {vinylWraps.map((wrap, index) => (
                      <option key={index} value={wrap.VinylWraps_Type}>{wrap.VinylWraps_Type}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Premium Leather Seat Covers:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Premium Leather Seat Cover Type"
                    style={{ width: '50%' }}
                    value={seatcoverselectedOption}
                    onChange={handleseatcoverSelectChange}
                  >
                    <option value="">Select an option</option>
                    {premiumSeatCovers.map((cover, index) => (
                      <option key={index} value={cover._id}>{cover.premiumSeat_Type}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group controlId="CarWashType">
                <Form.Label>Lamination:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Lamination Type"
                    style={{ width: '50%' }}
                    value={laminationSelectedOption}
                    onChange={handleLaminationSelectChange}
                  >
                    <option value="">Select an option</option>
                    {laminationTypes.map((lamination, index) => (
                      <option key={index} value={lamination._id}>{lamination.lamination_Type}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>


              <Form.Group controlId="CarWashType">
                <Form.Label>Interior Décor:</Form.Label>
                <div className="relative">
                  <Form.Select
                    className="custom-select"
                    aria-label="Select Interior Décor Type"
                    style={{ width: '50%', marginBottom: "20px" }}
                    value={interiorDecorselectedOption}
                    onChange={handleInteriorDecorSelectChange}
                  >
                    <option value="">Select an option</option>
                    {interiorDecorOptions.map((decor, index) => (
                      <option key={index} value={decor._id}>{decor.interiour_Type}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

            </>
          )}
        </div>

        <div>
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

        <div className="flex items-center justify-center">
          <div>
            <button
              type="button"
              class="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
