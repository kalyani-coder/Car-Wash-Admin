import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Sidebar() {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar on mobile devices
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // State to store the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width state when the window size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Show the toggle button on mobile devices (window width below 768 pixels)
  const showToggleButton = windowWidth < 988;

  const handleLogout = () => {
    // Perform any additional logout logic if needed

    // Redirect to the specified URL after logout
    window.location.href = 'https://carwash-admin.onrender.com';
  }
  return (
    <div>
      {/* Toggle button for mobile */}
      {showToggleButton && (
        // <button className="btn btn-primary mt-3 ml-3" onClick={toggleSidebar}>
        //   {" "}
        //   Open Sidebar
        // </button>

        // ********for button not icons 


        //  for open side bar usign icons
        <FontAwesomeIcon
          className=" mt-3 ml-3"
          icon={faBars}
          onClick={toggleSidebar}

          style={{ cursor: 'pointer', marginLeft: "18px", color: "black", fontSize: "35px" }}

        />


      )}

      <div className="container mt-3 text-center" style={{ fontFamily: 'Arial, sans-serif', color: "black" }}>
        <li>
          <h1>Welcome To Admin Dashboard</h1>
        </li>


      </div>
      {/* Main Navigation */}
      <header>
        {/* Sidebar */}
        <nav
          id="sidebarMenu"
          className={`collapse d-lg-block sidebar collapse bg-white ${isSidebarOpen ? "show" : "" // Show the sidebar if isSidebarOpen is true
            }`}
        >
          {/* Close button for mobile */}

          <div className="position-sticky">
            {isSidebarOpen && showToggleButton && (
              // <button className="ml-2 btn btn-primary" onClick={closeSidebar}>
              //   Close Sidebar
              // </button>
              // for button not use icons 

              // for using react icons use this icons code 
              <FontAwesomeIcon
                className="ml-2"
                onClick={closeSidebar}
                icon={faTimes}
                style={{ cursor: 'pointer', marginLeft: "18px", color: "black", fontSize: "40px" }}

              />
            )}
            <div className="list-group list-group-flush mx-3 mt-4">
              {/* Collapse 1 */}
              <ul className="list-unstyled components">
                <li>
                  <Link to={"/"} onClick={closeSidebar}>Home</Link>
                </li>
                <li className="active">
                  <a
                    href="#ServiceSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Services
                  </a>
                  <ul className="collapse list-unstyled" id="ServiceSubMenu">
                    <li>
                      <Link to={"/addservice"} onClick={closeSidebar}>Add Services</Link>
                    </li>
                    <li>
                      <Link to={"/deleteservice"} onClick={closeSidebar}>View Services</Link>
                    </li>
                  </ul>
                </li>
                <li className="active">
                  <a
                    href="#ClientSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Customers
                  </a>
                  <ul className="collapse list-unstyled" id="ClientSubMenu">
                    <li>
                      <Link to={'/addclients'}  onClick={closeSidebar}>Add Customers</Link>
                    </li>
                    <li>
                      <Link to={"/clientdetails"} onClick={closeSidebar}>Customer Details</Link>
                    </li>
                    <li>
                      <Link to={"/clientenquiry"} onClick={closeSidebar}>Customer Enquiry</Link>
                    </li>
                  </ul>
                </li>
                <li className="active">
                  <a
                    href="#AgentSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Employee
                  </a>
                  <ul className="collapse list-unstyled" id="AgentSubMenu">
                    <li>
                      <Link to={"/addagent"} onClick={closeSidebar}>Add Employee</Link>
                    </li>
                    <li>
                      <Link to={"/viewagent"} onClick={closeSidebar}>View Employee</Link>
                    </li>
                  </ul>
                </li>

                <li className="active">
                  <a
                    href="#addoffers"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Add Offers
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id="addoffers"
                  >
                    <li>
                      <Link to={"/addoffers"} onClick={closeSidebar}>Add Offers</Link>
                    </li>
                    <li>
                      <Link to={"/viewoffers"} onClick={closeSidebar}>View Offers</Link>
                    </li>
                  </ul>

                </li>

              

                <li className="active">
                  <a
                    href="#pageSubmenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Promotion
                  </a>
                  <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                      <Link to={"/addpromotion"} onClick={closeSidebar}>Add Promotion</Link>
                    </li>
                    <li>
                      <Link to={"/deletepromotion"} onClick={closeSidebar}>Delete Promotion</Link>
                    </li>
                  </ul>
                </li>
                <li className="active">
                  <a
                    href="#TopServicesSubMenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Top Services
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id="TopServicesSubMenu"
                  >
                    <li>
                      <Link to={"/addtopservice"} onClick={closeSidebar}>Add Top Services</Link>
                    </li>
                    <li>
                      <Link to={"/viewtopservice"} onClick={closeSidebar}>View Top Service</Link>
                    </li>
                  </ul>
                </li>


                

                <li className="active">
                  <a
                    href="#viewavailablestocks"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Check Available Stocks
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id="viewavailablestocks"
                  >
                    <li>
                      <Link to={"/addstocks"} onClick={closeSidebar}>Add Stocks</Link>
                    </li>
                    <li>
                      <Link to={"/viewavailablestocks"} onClick={closeSidebar}>View vailable Stocks</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to={"/availabledate"} onClick={closeSidebar}>Available date</Link>
                </li>

                <li>
                  <Link to={"/pushnotification"} onClick={closeSidebar}>Push Notification</Link>
                </li>
                <li>
                  <Link to={"/updatebookingstatus"} onClick={closeSidebar}>Update Booking Status</Link>
                </li>

                
                <li className="active">
                  <a
                    href="#GenerateJobCard"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Generate Job Card
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id="GenerateJobCard"
                  >
                    <li>
                      <Link to={"/jobcard"} onClick={closeSidebar}>Create Job Card</Link>
                    </li>
                    <li>
                      <Link to={"/viewjobcard"} onClick={closeSidebar}>View Job Card</Link>
                    </li>
                  </ul>
                </li>




                <li className="active">
                  <a
                    href="#master"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Master
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id="master"
                  >
                    <li>
                    <Link to={"/master"} onClick={closeSidebar}>Create Master</Link>
                    </li>
                    <li>
                    <Link to={"/updatemaster"} onClick={closeSidebar}>Update Master</Link>
                    </li>
                  </ul>
                </li>





                {/* <li>
                      <Link to={"/master"} onClick={closeSidebar}>Master</Link>
                    </li>

                    <li>
                      <Link to={"/updatemaster"} onClick={closeSidebar}>Update Master</Link>
                    </li> */}


                
                <li>
                <Link className="logout bg-danger" onClick={handleLogout}>
                  Logout
                </Link>
                </li>

                {/* <button
                  onClick={handleLogout}
                  className="Logout-admin"
                  style={{
                    backgroundColor: 'red',
                    padding: '10px',
                    width:'100%',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    
                  }}
                >
                  Logout
                </button> */}


              </ul>

            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
