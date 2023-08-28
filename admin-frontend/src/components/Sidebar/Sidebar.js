import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

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

  return (
    <div>
      {/* Toggle button for mobile */}
      {showToggleButton && (
        <button className="btn btn-primary mt-3 ml-3" onClick={toggleSidebar}>
          {" "}
          Open Sidebar
        </button>
      )}

      {/* Main Navigation */}
      <header>
        {/* Sidebar */}
        <nav
          id="sidebarMenu"
          className={`collapse d-lg-block sidebar collapse bg-white ${
            isSidebarOpen ? "show" : "" // Show the sidebar if isSidebarOpen is true
          }`}
        >
          {/* Close button for mobile */}

          <div className="position-sticky">
            {isSidebarOpen && showToggleButton && (
              <button className="ml-2 btn btn-primary" onClick={closeSidebar}>
                Close Sidebar
              </button>
            )}
            <div className="list-group list-group-flush mx-3 mt-4">
              {/* Collapse 1 */}

              <ul className="list-unstyled components">
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
                      <Link to={"/addservice"}>Add Services</Link>
                    </li>
                    <li>
                      <Link to={"/deleteservice"}>Delete Service</Link>
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
                    Client
                  </a>
                  <ul className="collapse list-unstyled" id="ClientSubMenu">
                    <li>
                      <Link to={"/clientdetails"}>Client Details</Link>
                    </li>
                    <li>
                      <Link to={"/clientenquiry"}>Client Enquiry</Link>
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
                    Agent
                  </a>
                  <ul className="collapse list-unstyled" id="AgentSubMenu">
                    <li>
                      <Link to={"/addagent"}>Add Agent</Link>
                    </li>
                    <li>
                      <Link to={"/viewagent"}>View Agent</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to={"/pushnotification"}>Push Notification</Link>
                </li>
                <li>
                  <Link to={"/updatebookingstatus"}>Update Booking Status</Link>
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
                      <Link to={"/addpromotion"}>Add Promotion</Link>
                    </li>
                    <li>
                      <Link to={"/deletepromotion"}>Delete Promotion</Link>
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
                      <Link to={"/addtopservice"}>Add Top Services</Link>
                    </li>
                    <li>
                      <Link to={"/viewtopservice"}>Delete Top Service</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
