import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap's Modal component
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ViewJobCard = () => {
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job

  useEffect(() => {
    fetch("https://car-wash-backend-api.onrender.com/api/jobcard")
      .then((response) => response.json())
      .then((data) => setJobData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle "View" button click and set the selected job
  const handleViewClick = (job) => {
    setSelectedJob(job);
    // Show the Bootstrap modal
    const modal = new Modal(document.getElementById("jobModal"));
    modal.show();
  };

  const handleGeneratePDF = (job) => {
    const pdf = new jsPDF();
    
    // Add client details
    const clientDetails = `
      Client Name: ${job.name}
      Email: ${job.email}
      Phone: ${job.phone}
      Address: ${job.address}
    `;
    pdf.text(clientDetails, 10, 10);

    // Add job card content in table format
    const tableData = [
      ['Job Card ID', 'Vehicle Category', 'Vehicle Type'],
      [job.JobCardId, job.vehicle_Category, job.vehicle_Type],
      ['Email', 'Phone'],
      [job.email, job.phone],
      ['Address', 'Vehicle Make/Model'],
      [job.address, job.vehicle_Make],
      ['Vehicle Number', 'Coating'],
      [job.vehicle_Number, job.coating],
      ['Paint Protection Films', 'Window Films'],
      ['...', '...'] // Add more data as needed
    ];

    pdf.autoTable({
      head: [['Job Details']],
      body: tableData,
      startY: 30
    });

    pdf.save(`job_${job._id}.pdf`);
  };
  return (
    <div className="container">
      {jobData.map((job) => (
        <div key={job._id} className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">Customer Name : {job.name}</h4>
            <table className="table table-bordered table-striped mb-3">
              <tbody>
                <tr>
                  <td> Job Card id : {job.JobCardId}</td>
                  <td> Vehicle Category: {job.vehicle_Category} </td>
                </tr>
                <tr>
                  <td>Email : {job.email}</td>
                  <td> Vehicle Type:{job.vehicle_Type}</td>
                </tr>
                <tr>
                  <td>Phone Number : {job.phone}</td>
                  <td>Wash Type: {job.wash_type}</td>
                  <td>Wash Price: {job.wash_type_price}</td>
                </tr>
                <tr>
                  <td>Address : {job.address}</td>
                  <td>Coating:{job.coating} </td>
                  <td>Coating Price:{job.coating_Price} </td>
                </tr>
                <tr>
                  <td>Vehicle Make/Model : {job.vehicle_Make}</td>
                  <td>Paint Protection Films: {job.vehicle_Make}</td>
                </tr>
                <tr>
                  <td>Vehicle Number : {job.vehicle_Number}</td>
                  <td>Window Films: </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleViewClick(job)}
                >
                  View
                </button>
              </div>

              <div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleGeneratePDF(job)}
              >
                Generate PDF
              </button>
            </div>
              
            </div>
          </div>
        </div>
      ))}

      {/* Bootstrap Modal for displaying job details */}
      <div
        className="modal fade"
        id="jobModal"
        tabIndex="-1"
        aria-labelledby="jobModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="jobModalLabel">
                Job Card Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Display the selected job details */}
              {selectedJob && (
                <>
                  <h4>Customer Name: {selectedJob.name}</h4>
                  <p> Job Card id : {selectedJob.JobCardId}</p>
                  <p>Email: {selectedJob.email}</p>
                  <p>Phone Number: {selectedJob.phone}</p>
                  <p>Address : {selectedJob.address}</p>
                  <p>Vehicle Make/Model : {selectedJob.vehicle_Make}</p>
                  <p>Vehicle Number : {selectedJob.vehicle_Number}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobCard;
