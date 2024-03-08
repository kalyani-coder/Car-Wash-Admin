import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap's Modal component
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assects/logo.jpeg'

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

  // const handleGeneratePDF = (job) => {
  //   const pdf = new jsPDF();

  //   // Add client details
  //   const clientDetails = `
  //     Client Name: ${job.name}
  //     Email: ${job.email}
  //     Phone: ${job.phone}
  //     Address: ${job.address}
  //   `;
  //   pdf.text(clientDetails, 10, 10);

  //   // Add job card content in table format
  //   const tableData = [
  //     ['Job Card ID', 'Vehicle Category', 'Vehicle Type'],
  //     [job.JobCardId, job.vehicle_Category, job.vehicle_Type],
  //     ['Email', 'Phone'],
  //     [job.email, job.phone],
  //     ['Address', 'Vehicle Make/Model'],
  //     [job.address, job.vehicle_Make],
  //     ['Vehicle Number', 'Coating'],
  //     [job.vehicle_Number, job.coating],
  //     ['Paint Protection Films', 'Window Films'],
  //     ['...', '...'] // Add more data as needed
  //   ];

  //   pdf.autoTable({
  //     head: [['Job Details']],
  //     body: tableData,
  //     startY: 30
  //   });

  //   pdf.save(`job_${job._id}.pdf`);
  // };

  // const handleGeneratePDF = (job) => {
  //   const pdf = new jsPDF();

  //   const jobDetails = [
  //     [{ content: 'Job Card Details', styles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' }, colSpan: 2 }],
  //     ['Job Card ID:', job.JobCardId],
  //     ['Client Name:', job.name],
  //     ['Email:', job.email],
  //     ['Phone:', job.phone],
  //     ['Address:', job.address],
  //     ['Vehicle Make:', job.vehicle_Make],
  //     ['Vehicle Number:', job.vehicle_Number],
  //     ['Vehicle Category:', job.vehicle_Category],
  //     ['Vehicle Type:', job.vehicle_Type],
  //     ['Wash Type:', job.wash_type],
  //     ['Wash Type Price:', job.wash_type_price],
  //     ['Coating:', job.coating],
  //     ['Coating Price:', job.coating_Price],
  //     ['Paint Protection Films:', job.paint_protection_field],
  //     ['Paint Protection Films Price:', job.paint_protection_field_Price],
  //     ['Window Films:', job.window_films],
  //     ['Window Films Price:', job.window_films_Price],
  //     ['Vinyl Wraps:', job.vinly_wraps],
  //     ['Vinyl Wraps Price:', job.vinly_wraps_Price],
  //     ['Premium Seat Cover:', job.premium_seat_cover],
  //     ['Premium Seat Cover Price:', job.premium_seat_cover_Price],
  //     ['Lamination:', job.lamination],
  //     ['Lamination Price:', job.lamination_Price],
  //     ['Interior Decor:', job.interiour_decor],
  //     ['Interior Decor Price:', job.interiour_decor_Price,],
  //     [{ content: 'Total Amount:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } }, job.TotalAmount.toLocaleString() + " Rs"]


    
  //   ];

  //   const marginLeft = 10;
  //   const marginTop = 10;

  //   pdf.autoTable({
  //     startY: marginTop,
  //     body: jobDetails,
  //     theme: 'grid',
  //     margin: { left: marginLeft }
  //   });

  //   pdf.save(`job_${job._id}.pdf`);
  // };

  let invoiceNumber = 1; 

  const handleGeneratePDF = (job) => {
    const doc = new jsPDF();

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString(); 

    doc.setFillColor(60,181,205);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 7, 'F');

    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'JPEG', 5, 12, 26, 26); 

    doc.setFillColor(211, 211, 211);

    doc.setFontSize(11);
    doc.text('Navnath Gunjawate', 140, 15);
    doc.text('Ambrosia Alley, Amanora Park Town', 140, 20);
    doc.text('411028', 140, 25);
    doc.text('P 7560039600', 140, 30);
    doc.text('www.Glossgenic.com', 140, 35);

    doc.text(`Invoice Number: ${invoiceNumber}`, 10, 50);
    doc.text(`Invoice Date: ${formattedDate}`, 10, 55); 

    doc.setDrawColor(0, 0, 255); 
    doc.line(10, 60, 200, 60); 

    doc.text('BILL TO', 10, 68); 

    doc.text(`Client Name: ${job.name}`, 10, 75);
    doc.text(`Email: ${job.email}`, 10, 80);
    doc.text(`Phone: ${job.phone}`, 10, 85);
    doc.text(`Address: ${job.address}`, 10, 90);
    doc.text(`Vehicle Make: ${job.vehicle_Make}`, 10, 95);
    doc.text(`Vehicle Number: ${job.vehicle_Number}`, 10, 100);

    doc.line(10, 105, 200, 105);

    doc.text('JOB CARD DETAILS', 10, 120); 

    const jobDetails = [
        ['Vehicle Category:', job.vehicle_Category],
        ['Vehicle Type:', job.vehicle_Type],
        ['Wash Type:', job.wash_type],
        ['Wash Type Price:', job.wash_type_price],
        ['Coating:', job.coating],
        ['Coating Price:', job.coating_Price],
        ['Paint Protection Films:', job.paint_protection_field],
        ['Paint Protection Films Price:', job.paint_protection_field_Price], 
        ['Window Films:', job.window_films],
        ['Window Films Price:', job.window_films_Price], 
        ['Vinyl Wraps:', job.vinly_wraps],
        ['Vinyl Wraps Price:', job.vinly_wraps_Price], 
        ['Premium Seat Cover:', job.premium_seat_cover],
        ['Premium Seat Cover Price:', job.premium_seat_cover_Price],
        ['Lamination:', job.lamination],
        ['Lamination Price:', job.lamination_Price],
        ['Interior Decor:', job.interiour_decor],
        ['Interior Decor Price:', job.interiour_decor_Price],
        [{ content: 'Total Amount:', styles: { fillColor: [169, 169, 169], textColor: [0, 0, 0] } }, job.TotalAmount.toLocaleString() + " Rs"]
    ];

    const marginLeft = 10;
    const marginTop = 130;

    doc.autoTable({
        startY: marginTop,
        body: jobDetails,
        theme: 'grid',
        margin: { left: marginLeft }
    });

    // const totalAmountX = 52; 
    // const totalAmountY = marginTop + (jobDetails.length * 7) + 15; 

    // doc.text('TOTAL AMOUNT:', totalAmountX, totalAmountY); 
    // doc.text(`${job.TotalAmount.toLocaleString() + " Rs"}`, totalAmountX + 40, totalAmountY); 

    doc.save(`invoice_${invoiceNumber}.pdf`);

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
                  <td>{job.wash_type_price} Rs</td>
                </tr>
                <tr>
                  <td>Coating</td>
                  <td>{job.coating}</td>
                  <td>{job.coating_Price} Rs</td>
                </tr>
                <tr>
                  <td>Paint Protection</td>
                  <td>{job.paint_protection_field}</td>
                  <td>{job.paint_protection_field_Price} Rs</td>
                </tr>
                <tr>
                  <td>Window</td>
                  <td>{job.window_films}</td>
                  <td>{job.window_films_Price} Rs</td>
                </tr>
                <tr>
                  <td>Vinly Wrap</td>
                  <td>{job.vinly_wraps}</td>
                  <td>{job.vinly_wraps_Price} Rs</td>
                </tr>

                <tr>
                  <td>Premium Seat Cover</td>
                  <td>{job.premium_seat_cover}</td>
                  <td>{job.premium_seat_cover_Price} Rs</td>
                </tr>
                <tr>
                  <td>Lamination</td>
                  <td>{job.lamination}</td>
                  <td>{job.lamination_Price} Rs</td>
                </tr>
                <tr>
                  <td>Interior Decor</td>
                  <td>{job.interiour_decor}</td>
                  <td>{job.interiour_decor_Price} Rs</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-3 d-flex justify-content-end">
              <strong>Total Amount: {job.TotalAmount} Rs</strong>
            </div>





            <div className="d-flex justify-content-between align-items-center mt-4">
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
