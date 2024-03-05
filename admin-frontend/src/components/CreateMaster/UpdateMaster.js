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
      const response = await fetch(`http://localhost:8000/api/master/vehicletype/${selectedVehicle._id}`, {
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
    fetch('http://localhost:8000/api/master/mainmaster')
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
      const response = await fetch(`http://localhost:8000/api/master/vehicletype/${selectedVehicle._id}`, {
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
  



  return (
    <div className='container'>
      <h1>Create Master</h1>
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
          </Form.Select><br/>
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

     
       
    </div>
  );
}

export default UpdateMaster;
