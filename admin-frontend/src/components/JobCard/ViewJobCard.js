import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assects/logo.jpeg';
import footerImg from "../../assects/footer.jpg";
import headerImg from "../../assects/header.jpg";

const ViewJobCard = () => {
  const [jobData, setJobData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); 

  useEffect(() => {
    fetch("https://car-wash-backend-api.onrender.com/api/jobcard")

      .then((response) => response.json())
      .then((data) => setJobData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleViewClick = (job) => {
    setSelectedJob(job);
    const modal = new Modal(document.getElementById("jobModal"));
    modal.show();
  };

  

  let invoiceNumber = 1;

  const handleGeneratePDF = (job) => {
    const doc = new jsPDF();

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString();
    const headerWidth = doc.internal.pageSize.getWidth();
    const headerHeight = 25; 
    doc.addImage(headerImg, 'JPEG', 0, 0, headerWidth, headerHeight);

    doc.setFontSize(11);

    const lineHeight = 5;

    doc.text(`Job Card No. : ${invoiceNumber}`, 10, 50);
    doc.text(`Job Card Date: ${formattedDate}`, 10, 50 + lineHeight);
    doc.setDrawColor(0, 0, 255);
    doc.line(10, 60, 200, 60);
    doc.text('BILL TO', 10, 68);
    doc.text(`Client Name: ${job.name}`, 10, 68 + lineHeight);
    doc.text(`Email: ${job.email}`, 10, 68 + 2 * lineHeight);
    doc.text(`Phone: ${job.phone}`, 10, 68 + 3 * lineHeight);
    doc.text(`Address: ${job.address}`, 10, 68 + 4 * lineHeight);
    doc.text(`Vehicle Make: ${job.vehicle_Make}`, 10, 68 + 5 * lineHeight);
    doc.text(`Vehicle Number: ${job.vehicle_Number}`, 10, 68 + 6 * lineHeight);

    doc.line(10, 105, 200, 105);

    doc.text('JOB CARD DETAILS', 10, 120);

    const jobDetails = [
      ['Vehicle Category:', 'Services:', 'Price:'],
      [job.vehicle_Category],
      ['Treatment Type', job.treatment],
      ['Wash Type', job.wash_type, "Rs. " + job.wash_type_price],
      ['Coating', job.coating, "Rs. " + job.coating_Price],
      ['Paint Protection', job.paint_protection_field, "Rs. " + job.paint_protection_field_Price],
      ['Window Films', job.window_films, "Rs. " + job.window_films_Price],
      ['Vinly Warp', job.vinly_wraps, "Rs. " + job.vinly_wraps_Price],
      ['Seat Cover', job.premium_seat_cover, "Rs. " + job.premium_seat_cover_Price],
      ['Lamination', job.lamination, "Rs. " + job.lamination_Price],
      ['Interiour Decor', job.interiour_decor, "Rs. " + job.interiour_decor_Price],
      [{ content: 'Total Amount:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } }, '', "Rs. " + job.TotalAmount.toLocaleString()]
    ];

    const marginLeft = 10;
    const marginTop = 130;

    doc.autoTable({
      startY: marginTop,
      body: jobDetails,
      theme: 'grid',
      margin: { left: marginLeft }
    });

    const footerWidth = doc.internal.pageSize.getWidth();
    const footerHeight = 30;
    const footerX = 0;
    const footerY = doc.internal.pageSize.getHeight() - footerHeight;

    doc.addImage(footerImg, 'JPEG', footerX, footerY, footerWidth, footerHeight);

    doc.save(`JobCard_${invoiceNumber}.pdf`);

    invoiceNumber++;
  }


  return (
    <div className="container">
      {jobData.map((job) => (
        <div key={job._id} className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">Customer Name : {job.name}</h4>

            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <td> Job Card id : {job.JobCardId}</td>
                </tr>
                <tr>

                  <td>Email : {job.email}</td>
                </tr>

                <tr>
                  <td>Phone Number : {job.phone}</td>
                </tr>
                <tr>
                  <td>Address : {job.address}</td>
                </tr>
                <tr>
                  <td>Vehicle Make/Model : {job.vehicle_Make}</td>
                </tr>
                <tr>
                  <td>Vehicle Number : {job.vehicle_Number}</td>
                </tr>
              </tbody>
            </table>



            <h4>Job Card Details</h4>
            <table className="table table-bordered table-striped mt-3">
              <tbody>
                <tr>
                  <td>Vehicle Category</td>
                  <td>{job.vehicle_Category}</td>
                </tr>
                <tr>
                  <td>Vehicle Type</td>
                  <td>{job.vehicle_Type}</td>
                </tr>
                <tr>
                  <td>Wash Type</td>
                  <td>{job.wash_type}</td>
                  <td>Rs. {job.wash_type_price}</td>
                </tr>
                <tr>
                  <td>Coating</td>
                  <td>{job.coating}</td>
                  <td>Rs. {job.coating_Price}</td>
                </tr>
                <tr>
                  <td>Paint Protection</td>
                  <td>{job.paint_protection_field}</td>
                  <td>Rs. {job.paint_protection_field_Price}</td>
                </tr>
                <tr>
                  <td>Window</td>
                  <td>{job.window_films}</td>
                  <td>Rs. {job.window_films_Price} </td>
                </tr>
                <tr>
                  <td>Vinly Wrap</td>
                  <td>{job.vinly_wraps}</td>
                  <td>Rs. {job.vinly_wraps_Price} </td>
                </tr>

                <tr>
                  <td>Premium Seat Cover</td>
                  <td>{job.premium_seat_cover}</td>
                  <td>Rs. {job.premium_seat_cover_Price} </td>
                </tr>
                <tr>
                  <td>Lamination</td>
                  <td>{job.lamination}</td>
                  <td>Rs. {job.lamination_Price} </td>
                </tr>
                <tr>
                  <td>Interior Decor</td>
                  <td>{job.interiour_decor}</td>
                  <td>Rs. {job.interiour_decor_Price}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-3 d-flex justify-content-end">
              <strong>Total Amount: Rs. {job.TotalAmount} </strong>
            </div>





            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <button
                  type="button"
                  className="btn btn-dark"
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
