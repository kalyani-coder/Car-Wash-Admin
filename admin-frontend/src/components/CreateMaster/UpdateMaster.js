import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const UpdateMaster = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedVehicleType, setEditedVehicleType] = useState('');
  const [editedPrice, setEditedPrice] = useState('');



  const handleEdit = () => {
    setEditedVehicleType(selectedVehicle.vehicle_Type);
    setEditedPrice(selectedVehicle.price);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/vehicletype/${selectedVehicle._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehicle_Type: editedVehicleType,
          price: editedPrice
        })
      });

      if (response.ok) {
        console.log(`Vehicle type with ID ${selectedVehicle._id} updated successfully`);
        setEditMode(false);
        setShowModal(false);
        // Optionally, you can refresh the data or update the state after successful update
        // For example, refetch the data from the server or update the state with the updated data
      } else {
        console.error('Failed to update vehicle type');
      }
    } catch (error) {
      console.error('Error updating vehicle type:', error);
    }
  };

  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        // Assuming data structure is { carDetails: [...] }
        setVehicleTypes(data.carDetails);
      })
      .catch(error => console.error('Error fetching vehicle types:', error));
  }, []);

  const handleCategoryChange = event => {
    const selectedId = event.target.value;
    setSelectedCategory(selectedId);
    setSelectedVehicle(vehicleTypes.find(vehicle => vehicle._id === selectedId));
    setEditMode(false); // Exit edit mode when selecting a new vehicle type
  };

  const handleDelete = async () => {
    if (!selectedVehicle) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/vehicletype/${selectedVehicle._id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Vehicle type with ID ${selectedVehicle._id} deleted successfully`);
        alert("Deleted vehicle type successfully");
        setSelectedVehicle(null);
      } else {
        console.error('Failed to delete vehicle type');
      }
    } catch (error) {
      console.error('Error deleting vehicle type:', error);
    }
  };



  // wash type All Functionality 

  const [selectedWashType, setSelectedWashType] = useState("");
  const [washTypes, setWashTypes] = useState([]);
  const [editedWashType, setEditedWashType] = useState("");
  const [editedWashPrice, setEditedWashPrice] = useState("");
  const [showWashModal, setShowWashModal] = useState(false);

  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        // Assuming data structure is { carDetails: [...] }
        setWashTypes(data.carWashTypes);
      })
      .catch(error => console.error('Error fetching vehicle types:', error));
  }, []);
  const handleWashTypeChange = (e) => {
    setSelectedWashType(e.target.value);
  };

 const handleEditWashType = () => {
    // Find the selected wash type from the washTypes array
    const selectedWash = washTypes.find(wash => wash._id === selectedWashType);
    // Set the edited wash type and price in state
    setEditedWashType(selectedWash.wash_type);
    setEditedWashPrice(selectedWash.price);
    // Show the modal
    setShowWashModal(true);
  };
  

  const handleDeleteWashType = async () => {
    if (!selectedWashType) return;
  
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/washtype/${selectedWashType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Wash type with ID ${selectedWashType} deleted successfully`);
        alert("Deleted wash type successfully");
        // Optionally, you can refresh the data or update the state after successful deletion
        // For example, refetch the data from the server or update the state to remove the deleted wash type
        setSelectedWashType("");
      } else {
        console.error('Failed to delete wash type');
      }
    } catch (error) {
      console.error('Error deleting wash type:', error);
    }
  };
  

  const handleCloseWashModal = () => {
    setShowWashModal(false);
  };

  const handleSaveWashChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/washtype/${selectedWashType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wash_type: editedWashType,
          price: editedWashPrice
        })
      });
  
      if (response.ok) {
        console.log(`Wash type with ID ${selectedWashType} updated successfully`);
        // Optionally, you can refresh the data or update the state after successful update
        // For example, refetch the data from the server or update the state with the updated data
        setShowWashModal(false);
      } else {
        console.error('Failed to update wash type');
      }
    } catch (error) {
      console.error('Error updating wash type:', error);
    }
  };



  // coating types all fiunctionality 

  const [selectedCoatingType, setSelectedCoatingType] = useState("");
  const [coatingTypes, setCoatingTypes] = useState([]);
  const [editedCoatingType, setEditedCoatingType] = useState("");
  const [editedCoatingPrice, setEditedCoatingPrice] = useState("");
  const [showCoatingModal, setShowCoatingModal] = useState(false);

  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        setCoatingTypes(data.carCoatingTypes);
      })
      .catch(error => console.error('Error fetching car coating types:', error));
  }, []);

  const handleCoatingTypeChange = (e) => {
    setSelectedCoatingType(e.target.value);
  };

  const handleEditCoatingType = () => {
    const selectedCoating = coatingTypes.find(coating => coating._id === selectedCoatingType);
    setEditedCoatingType(selectedCoating.coating_type);
    setEditedCoatingPrice(selectedCoating.price || "");
    setShowCoatingModal(true);
  };


  const handleDeleteCoatingType = async () => {
    if (!selectedCoatingType) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/coating/${selectedCoatingType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Car coating type with ID ${selectedCoatingType} deleted successfully`);
        alert("Deleted car coating type successfully");
        setSelectedCoatingType("");
      } else {
        console.error('Failed to delete car coating type');
      }
    } catch (error) {
      console.error('Error deleting car coating type:', error);
    }
  };

  const handleCloseCoatingModal = () => {
    setShowCoatingModal(false);
  };
  

  const handleSaveCoatingChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/coating/${selectedCoatingType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coating_type: editedCoatingType,
          price: editedCoatingPrice
        })
      });

      if (response.ok) {
        console.log(`Car coating type with ID ${selectedCoatingType} updated successfully`);
        setShowCoatingModal(false);
      } else {
        console.error('Failed to update car coating type');
      }
    } catch (error) {
      console.error('Error updating car coating type:', error);
    }
  };



  const [selectedPaintProtectionType, setSelectedPaintProtectionType] = useState("");
  const [paintProtectionTypes, setPaintProtectionTypes] = useState([]);
  const [editedPaintProtectionType, setEditedPaintProtectionType] = useState("");
  const [editedPaintProtectionPrice, setEditedPaintProtectionPrice] = useState("");
  const [showPaintProtectionModal, setShowPaintProtectionModal] = useState(false);


  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        setPaintProtectionTypes(data.carPaintProtectionTypes);
      })
      .catch(error => console.error('Error fetching car paint protection types:', error));
  }, []);

  const handlePaintProtectionTypeChange = (e) => {
    setSelectedPaintProtectionType(e.target.value);
  };

  const handleEditPaintProtectionType = () => {
    const selectedPaintProtection = paintProtectionTypes.find(paintProtection => paintProtection._id === selectedPaintProtectionType);
    setEditedPaintProtectionType(selectedPaintProtection.paintProtection_Type);
    setEditedPaintProtectionPrice(selectedPaintProtection.price || "");
    setShowPaintProtectionModal(true);
  };

  const handleDeletePaintProtectionType = async () => {
    if (!selectedPaintProtectionType) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/paintprotectiontype/${selectedPaintProtectionType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Car paint protection type with ID ${selectedPaintProtectionType} deleted successfully`);
        alert("Deleted car paint protection type successfully");
        setSelectedPaintProtectionType("");
      } else {
        console.error('Failed to delete car paint protection type');
      }
    } catch (error) {
      console.error('Error deleting car paint protection type:', error);
    }
  };

  const handleClosePaintProtectionModal = () => {
    setShowPaintProtectionModal(false);
  };

  const handleSavePaintProtectionChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/paintprotection/${selectedPaintProtectionType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paintProtection_Type: editedPaintProtectionType,
          price: editedPaintProtectionPrice
        })
      });

      if (response.ok) {
        console.log(`Car paint protection type with ID ${selectedPaintProtectionType} updated successfully`);
        setShowPaintProtectionModal(false);
      } else {
        console.error('Failed to update car paint protection type');
      }
    } catch (error) {
      console.error('Error updating car paint protection type:', error);
    }
  };


  const [selectedWindowFilmType, setSelectedWindowFilmType] = useState("");
  const [windowFilmsTypes, setWindowFilmsTypes] = useState([]);
  const [editedWindowFilmType, setEditedWindowFilmType] = useState("");
  const [editedWindowFilmPrice, setEditedWindowFilmPrice] = useState("");
  const [showWindowFilmModal, setShowWindowFilmModal] = useState(false);


  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        setWindowFilmsTypes(data.carWindowFilmsTypes);
      })
      .catch(error => console.error('Error fetching car window films types:', error));
  }, []);

  const handleWindowFilmTypeChange = (e) => {
    setSelectedWindowFilmType(e.target.value);
  };

  const handleEditWindowFilmType = () => {
    const selectedWindowFilm = windowFilmsTypes.find(windowFilm => windowFilm._id === selectedWindowFilmType);
    setEditedWindowFilmType(selectedWindowFilm.windowFilm_Type);
    setEditedWindowFilmPrice(selectedWindowFilm.price || "");
    setShowWindowFilmModal(true);
  };

  const handleDeleteWindowFilmType = async () => {
    if (!selectedWindowFilmType) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/windowfilm/${selectedWindowFilmType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Car window film type with ID ${selectedWindowFilmType} deleted successfully`);
        alert("Deleted car window film type successfully");
        setSelectedWindowFilmType("");
      } else {
        console.error('Failed to delete car window film type');
      }
    } catch (error) {
      console.error('Error deleting car window film type:', error);
    }
  };

  const handleCloseWindowFilmModal = () => {
    setShowWindowFilmModal(false);
  };

  const handleSaveWindowFilmChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/windowfilm/${selectedWindowFilmType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          windowFilm_Type: editedWindowFilmType,
          price: editedWindowFilmPrice
        })
      });

      if (response.ok) {
        console.log(`Car window film type with ID ${selectedWindowFilmType} updated successfully`);
        setShowWindowFilmModal(false);
      } else {
        console.error('Failed to update car window film type');
      }
    } catch (error) {
      console.error('Error updating car window film type:', error);
    }
  };


  const [selectedVinylWrapsType, setSelectedVinylWrapsType] = useState("");
  const [vinylWrapsTypes, setVinylWrapsTypes] = useState([]);
  const [editedVinylWrapsType, setEditedVinylWrapsType] = useState("");
  const [editedVinylWrapsPrice, setEditedVinylWrapsPrice] = useState("");
  const [showVinylWrapsModal, setShowVinylWrapsModal] = useState(false)


  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        setVinylWrapsTypes(data.carVinylWrapsTypes);
      })
      .catch(error => console.error('Error fetching car vinyl wraps types:', error));
  }, []);

  const handleVinylWrapsTypeChange = (e) => {
    setSelectedVinylWrapsType(e.target.value);
  };

  const handleEditVinylWrapsType = () => {
    const selectedVinylWraps = vinylWrapsTypes.find(vinylWraps => vinylWraps._id === selectedVinylWrapsType);
    setEditedVinylWrapsType(selectedVinylWraps.VinylWraps_Type);
    setEditedVinylWrapsPrice(selectedVinylWraps.price || "");
    setShowVinylWrapsModal(true);
  };

  const handleDeleteVinylWrapsType = async () => {
    if (!selectedVinylWrapsType) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/vinalwraps/${selectedVinylWrapsType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Car vinyl wraps type with ID ${selectedVinylWrapsType} deleted successfully`);
        alert("Deleted car vinyl wraps type successfully");
        setSelectedVinylWrapsType("");
      } else {
        console.error('Failed to delete car vinyl wraps type');
      }
    } catch (error) {
      console.error('Error deleting car vinyl wraps type:', error);
    }
  };

  const handleCloseVinylWrapsModal = () => {
    setShowVinylWrapsModal(false);
  };

  const handleSaveVinylWrapsChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/vinalwraps/${selectedVinylWrapsType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          VinylWraps_Type: editedVinylWrapsType,
          price: editedVinylWrapsPrice
        })
      });

      if (response.ok) {
        console.log(`Car vinyl wraps type with ID ${selectedVinylWrapsType} updated successfully`);
        setShowVinylWrapsModal(false);
      } else {
        console.error('Failed to update car vinyl wraps type');
      }
    } catch (error) {
      console.error('Error updating car vinyl wraps type:', error);
    }
  };


  const [selectedPremiumSeatType, setSelectedPremiumSeatType] = useState("");
  const [premiumSeatTypes, setPremiumSeatTypes] = useState([]);
  const [editedPremiumSeatType, setEditedPremiumSeatType] = useState("");
  const [editedPremiumSeatPrice, setEditedPremiumSeatPrice] = useState("");
  const [showPremiumSeatModal, setShowPremiumSeatModal] = useState(false);

  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        setPremiumSeatTypes(data.carPremiumSeatTypes);
      })
      .catch(error => console.error('Error fetching car premium seat types:', error));
  }, []);

  const handlePremiumSeatTypeChange = (e) => {
    setSelectedPremiumSeatType(e.target.value);
  };

  const handleEditPremiumSeatType = () => {
    const selectedPremiumSeat = premiumSeatTypes.find(premiumSeat => premiumSeat._id === selectedPremiumSeatType);
    setEditedPremiumSeatType(selectedPremiumSeat.premiumSeat_Type);
    setEditedPremiumSeatPrice(selectedPremiumSeat.price || "");
    setShowPremiumSeatModal(true);
  };

  const handleDeletePremiumSeatType = async () => {
    if (!selectedPremiumSeatType) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/premiumseat/${selectedPremiumSeatType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Car premium seat type with ID ${selectedPremiumSeatType} deleted successfully`);
        alert("Deleted car premium seat type successfully");
        setSelectedPremiumSeatType("");
      } else {
        console.error('Failed to delete car premium seat type');
      }
    } catch (error) {
      console.error('Error deleting car premium seat type:', error);
    }
  };

  const handleClosePremiumSeatModal = () => {
    setShowPremiumSeatModal(false);
  };

  const handleSavePremiumSeatChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/premiumseat/${selectedPremiumSeatType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          premiumSeat_Type: editedPremiumSeatType,
          price: editedPremiumSeatPrice
        })
      });

      if (response.ok) {
        console.log(`Car premium seat type with ID ${selectedPremiumSeatType} updated successfully`);
        setShowPremiumSeatModal(false);
      } else {
        console.error('Failed to update car premium seat type');
      }
    } catch (error) {
      console.error('Error updating car premium seat type:', error);
    }
  };

  const [selectedLaminationType, setSelectedLaminationType] = useState("");
  const [laminationTypes, setLaminationTypes] = useState([]);
  const [editedLaminationType, setEditedLaminationType] = useState("");
  const [editedLaminationPrice, setEditedLaminationPrice] = useState("");
  const [showLaminationModal, setShowLaminationModal] = useState(false);


  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        setLaminationTypes(data.carLaminationTypes);
      })
      .catch(error => console.error('Error fetching car lamination types:', error));
  }, []);

  const handleLaminationTypeChange = (e) => {
    setSelectedLaminationType(e.target.value);
  };

  const handleEditLaminationType = () => {
    const selectedLamination = laminationTypes.find(lamination => lamination._id === selectedLaminationType);
    setEditedLaminationType(selectedLamination.lamination_Type);
    setEditedLaminationPrice(selectedLamination.price || "");
    setShowLaminationModal(true);
  };

  const handleDeleteLaminationType = async () => {
    if (!selectedLaminationType) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/lamination/${selectedLaminationType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Car lamination type with ID ${selectedLaminationType} deleted successfully`);
        alert("Deleted car lamination type successfully");
        setSelectedLaminationType("");
      } else {
        console.error('Failed to delete car lamination type');
      }
    } catch (error) {
      console.error('Error deleting car lamination type:', error);
    }
  };

  const handleCloseLaminationModal = () => {
    setShowLaminationModal(false);
  };

  const handleSaveLaminationChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/lamination/${selectedLaminationType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lamination_Type: editedLaminationType,
          price: editedLaminationPrice
        })
      });

      if (response.ok) {
        console.log(`Car lamination type with ID ${selectedLaminationType} updated successfully`);
        setShowLaminationModal(false);
      } else {
        console.error('Failed to update car lamination type');
      }
    } catch (error) {
      console.error('Error updating car lamination type:', error);
    }
  };


  const [selectedInteriorType, setSelectedInteriorType] = useState("");
  const [interiorTypes, setInteriorTypes] = useState([]);
  const [editedInteriorType, setEditedInteriorType] = useState("");
  const [editedInteriorPrice, setEditedInteriorPrice] = useState("");
  const [showInteriorModal, setShowInteriorModal] = useState(false);


  useEffect(() => {
    fetch('https://car-wash-backend-api.onrender.com/api/master/mainmaster')
      .then(response => response.json())
      .then(data => {
        setInteriorTypes(data.carInteriorTypes);
      })
      .catch(error => console.error('Error fetching car interior types:', error));
  }, []);

  const handleInteriorTypeChange = (e) => {
    setSelectedInteriorType(e.target.value);
  };

  const handleEditInteriorType = () => {
    const selectedInterior = interiorTypes.find(interior => interior._id === selectedInteriorType);
    setEditedInteriorType(selectedInterior.interiour_Type);
    setEditedInteriorPrice(selectedInterior.price || "");
    setShowInteriorModal(true);
  };

  const handleDeleteInteriorType = async () => {
    if (!selectedInteriorType) return;

    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/interior/${selectedInteriorType}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log(`Car interior type with ID ${selectedInteriorType} deleted successfully`);
        alert("Deleted car interior type successfully");
        setSelectedInteriorType("");
      } else {
        console.error('Failed to delete car interior type');
      }
    } catch (error) {
      console.error('Error deleting car interior type:', error);
    }
  };

  const handleCloseInteriorModal = () => {
    setShowInteriorModal(false);
  };

  const handleSaveInteriorChanges = async () => {
    try {
      const response = await fetch(`https://car-wash-backend-api.onrender.com/api/master/interior/${selectedInteriorType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          interiour_Type: editedInteriorType,
          price: editedInteriorPrice
        })
      });

      if (response.ok) {
        console.log(`Car interior type with ID ${selectedInteriorType} updated successfully`);
        setShowInteriorModal(false);
      } else {
        console.error('Failed to update car interior type');
      }
    } catch (error) {
      console.error('Error updating car interior type:', error);
    }
  };


  return (
    <div className='container'>
      <h1>Update And Delete Master</h1>
      <Form.Group controlId="vehicletype">
        <Form.Label>Vehicle Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Vehicle Category"
            style={{ width: '50%' }}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Vehicle Category</option>
            {vehicleTypes.map(vehicle => (
              <option key={vehicle._id} value={vehicle._id}>{vehicle.vehicle_Type}</option>
            ))}
          </Form.Select><br />
          {selectedVehicle && (
            <div>
              <Button variant="info" onClick={handleEdit}>Edit</Button>
              <Button variant="danger" onClick={handleDelete}>Delete Vehicle Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vehicle Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editVehicleType">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Control
              type="text"
              value={editedVehicleType}
              onChange={e => setEditedVehicleType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedPrice}
              onChange={e => setEditedPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>




      <Form.Group controlId="washtype">
        <Form.Label>Wash Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Wash Type"
            style={{ width: '50%' }}
            value={selectedWashType}
            onChange={handleWashTypeChange}
          >
            <option value="">Select Wash Type</option>
            {washTypes.map(wash => (
              <option key={wash._id} value={wash._id}>{wash.wash_type}</option>
            ))}
          </Form.Select><br />
          {selectedWashType && (
            <div>
              <Button variant="info" onClick={handleEditWashType}>Edit</Button>
              <Button variant="danger" onClick={handleDeleteWashType}>Delete Wash Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showWashModal} onHide={handleCloseWashModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Wash Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editWashType">
            <Form.Label>Wash Type</Form.Label>
            <Form.Control
              type="text"
              value={editedWashType}
              onChange={e => setEditedWashType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editWashPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedWashPrice}
              onChange={e => setEditedWashPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWashModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveWashChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>


      <Form.Group controlId="coatingType">
        <Form.Label>Car Coating Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Coating Type"
            style={{ width: '50%' }}
            value={selectedCoatingType}
            onChange={handleCoatingTypeChange}
          >
            <option value="">Select Coating Type</option>
            {coatingTypes.map(coating => (
              <option key={coating._id} value={coating._id}>{coating.coating_type}</option>
            ))}
          </Form.Select><br />
          {selectedCoatingType && (
            <div>
              <Button variant="info" onClick={handleEditCoatingType}>Edit</Button>
              <Button variant="danger" onClick={handleDeleteCoatingType}>Delete Coating Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showCoatingModal} onHide={handleCloseCoatingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Coating Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editCoatingType">
            <Form.Label>Coating Type</Form.Label>
            <Form.Control
              type="text"
              value={editedCoatingType}
              onChange={e => setEditedCoatingType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editCoatingPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedCoatingPrice}
              onChange={e => setEditedCoatingPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCoatingModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveCoatingChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>



      <Form.Group controlId="paintProtectionType">
        <Form.Label>Car Paint Protection Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Paint Protection Type"
            style={{ width: '50%' }}
            value={selectedPaintProtectionType}
            onChange={handlePaintProtectionTypeChange}
          >
            <option value="">Select Paint Protection Type</option>
            {paintProtectionTypes.map(paintProtection => (
              <option key={paintProtection._id} value={paintProtection._id}>{paintProtection.paintProtection_Type}</option>
            ))}
          </Form.Select><br />
          {selectedPaintProtectionType && (
            <div>
              <Button variant="info" onClick={handleEditPaintProtectionType}>Edit</Button>
              <Button variant="danger" onClick={handleDeletePaintProtectionType}>Delete Paint Protection Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showPaintProtectionModal} onHide={handleClosePaintProtectionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Paint Protection Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editPaintProtectionType">
            <Form.Label>Paint Protection Type</Form.Label>
            <Form.Control
              type="text"
              value={editedPaintProtectionType}
              onChange={e => setEditedPaintProtectionType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editPaintProtectionPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedPaintProtectionPrice}
              onChange={e => setEditedPaintProtectionPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePaintProtectionModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSavePaintProtectionChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>


      <Form.Group controlId="windowFilmType">
        <Form.Label>Car Window Film Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Window Film Type"
            style={{ width: '50%' }}
            value={selectedWindowFilmType}
            onChange={handleWindowFilmTypeChange}
          >
            <option value="">Select Window Film Type</option>
            {windowFilmsTypes.map(windowFilm => (
              <option key={windowFilm._id} value={windowFilm._id}>{windowFilm.windowFilm_Type}</option>
            ))}
          </Form.Select><br />
          {selectedWindowFilmType && (
            <div>
              <Button variant="info" onClick={handleEditWindowFilmType}>Edit</Button>
              <Button variant="danger" onClick={handleDeleteWindowFilmType}>Delete Window Film Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showWindowFilmModal} onHide={handleCloseWindowFilmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Window Film Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editWindowFilmType">
            <Form.Label>Window Film Type</Form.Label>
            <Form.Control
              type="text"
              value={editedWindowFilmType}
              onChange={e => setEditedWindowFilmType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editWindowFilmPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedWindowFilmPrice}
              onChange={e => setEditedWindowFilmPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWindowFilmModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveWindowFilmChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>



      <Form.Group controlId="vinylWrapsType">
        <Form.Label>Car Vinyl Wraps Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Vinyl Wraps Type"
            style={{ width: '50%' }}
            value={selectedVinylWrapsType}
            onChange={handleVinylWrapsTypeChange}
          >
            <option value="">Select Vinyl Wraps Type</option>
            {vinylWrapsTypes.map(vinylWraps => (
              <option key={vinylWraps._id} value={vinylWraps._id}>{vinylWraps.VinylWraps_Type}</option>
            ))}
          </Form.Select><br />
          {selectedVinylWrapsType && (
            <div>
              <Button variant="info" onClick={handleEditVinylWrapsType}>Edit</Button>
              <Button variant="danger" onClick={handleDeleteVinylWrapsType}>Delete Vinyl Wraps Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showVinylWrapsModal} onHide={handleCloseVinylWrapsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vinyl Wraps Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editVinylWrapsType">
            <Form.Label>Vinyl Wraps Type</Form.Label>
            <Form.Control
              type="text"
              value={editedVinylWrapsType}
              onChange={e => setEditedVinylWrapsType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editVinylWrapsPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedVinylWrapsPrice}
              onChange={e => setEditedVinylWrapsPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVinylWrapsModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveVinylWrapsChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>


      <Form.Group controlId="premiumSeatType">
        <Form.Label>Car Premium Seat Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Premium Seat Type"
            style={{ width: '50%' }}
            value={selectedPremiumSeatType}
            onChange={handlePremiumSeatTypeChange}
          >
            <option value="">Select Premium Seat Type</option>
            {premiumSeatTypes.map(premiumSeat => (
              <option key={premiumSeat._id} value={premiumSeat._id}>{premiumSeat.premiumSeat_Type}</option>
            ))}
          </Form.Select><br />
          {selectedPremiumSeatType && (
            <div>
              <Button variant="info" onClick={handleEditPremiumSeatType}>Edit</Button>
              <Button variant="danger" onClick={handleDeletePremiumSeatType}>Delete Premium Seat Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showPremiumSeatModal} onHide={handleClosePremiumSeatModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Premium Seat Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editPremiumSeatType">
            <Form.Label>Premium Seat Type</Form.Label>
            <Form.Control
              type="text"
              value={editedPremiumSeatType}
              onChange={e => setEditedPremiumSeatType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editPremiumSeatPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedPremiumSeatPrice}
              onChange={e => setEditedPremiumSeatPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePremiumSeatModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSavePremiumSeatChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>


      <Form.Group controlId="laminationType">
        <Form.Label>Car Lamination Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Lamination Type"
            style={{ width: '50%' }}
            value={selectedLaminationType}
            onChange={handleLaminationTypeChange}
          >
            <option value="">Select Lamination Type</option>
            {laminationTypes.map(lamination => (
              <option key={lamination._id} value={lamination._id}>{lamination.lamination_Type}</option>
            ))}
          </Form.Select><br />
          {selectedLaminationType && (
            <div>
              <Button variant="info" onClick={handleEditLaminationType}>Edit</Button>
              <Button variant="danger" onClick={handleDeleteLaminationType}>Delete Lamination Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showLaminationModal} onHide={handleCloseLaminationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Lamination Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editLaminationType">
            <Form.Label>Lamination Type</Form.Label>
            <Form.Control
              type="text"
              value={editedLaminationType}
              onChange={e => setEditedLaminationType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editLaminationPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedLaminationPrice}
              onChange={e => setEditedLaminationPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLaminationModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveLaminationChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>



      <Form.Group controlId="interiorType">
        <Form.Label>Car Interior Type Update And Delete:</Form.Label>
        <div className="relative">
          <Form.Select
            className="custom-select"
            aria-label="Select Interior Type"
            style={{ width: '50%' }}
            value={selectedInteriorType}
            onChange={handleInteriorTypeChange}
          >
            <option value="">Select Interior Type</option>
            {interiorTypes.map(interior => (
              <option key={interior._id} value={interior._id}>{interior.interiour_Type}</option>
            ))}
          </Form.Select><br />
          {selectedInteriorType && (
            <div>
              <Button variant="info" onClick={handleEditInteriorType}>Edit</Button>
              <Button variant="danger" onClick={handleDeleteInteriorType}>Delete Interior Type</Button>
            </div>
          )}
        </div>
      </Form.Group>

      <Modal show={showInteriorModal} onHide={handleCloseInteriorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Interior Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editInteriorType">
            <Form.Label>Interior Type</Form.Label>
            <Form.Control
              type="text"
              value={editedInteriorType}
              onChange={e => setEditedInteriorType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editInteriorPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={editedInteriorPrice}
              onChange={e => setEditedInteriorPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInteriorModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveInteriorChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default UpdateMaster;
