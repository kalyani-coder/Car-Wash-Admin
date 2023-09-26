import "./App.css";


import AddService from "./components/Service/AddService";
import Sidebar from "./components/Sidebar/Sidebar";
import UpdateStatus from "./components/Status/UpdateStatus";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDetailsCard from "./components/Client/CustomerDetailsCard";
import DetailedCustomerInfoPage from "./components/Client/DetailedCustomerInfoPage";
import PushNotification from "./components/Notification/PushNotification";
import AddPromotion from "./components/Promotion/AddPromotion";
import DeletePromotion from "./components/Promotion/DeletePromotion";
import ClientEnquiry from "./components/Client/ClientEnquiry";

import AddTopService from "./components/TopService/AddTopService";
import AddAgentPage from "./components/Agent/AddAgent";
import ViewAgentPage from "./components/Agent/ViewAgent";
import AgentDetailsPage from "./components/Agent/AgentDetailsPage";
import ServiceView from "./components/Service/ViewService";
import ViewTopServices from "./components/TopService/ViewTopService";
import AddStocks from './components/viewStockavailable/AddStocks'
import ViewAvailableStocks from './components/viewStockavailable/ViewAvailableStocks'
import Availabledate from "./components/Availabledate/Availabledate";
import Addoffers from "./components/AddOffers/Addoffers";
import ViewOffers from "./components/AddOffers/ViewOffers";
import ViewLatestBooking from "./components/ViewAllBookings/ViewLatestBooking";
import ViewPendingBookings from "./components/ViewAllBookings/ViewPendingBookings";
import ViewCancledBookings from "./components/ViewAllBookings/ViewCancledBookings";
import ViewOnGoingBookings from "./components/ViewAllBookings/ViewOnGoingBookings";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/clientdetails" element={<CustomerDetailsCard />} />
          <Route path="/customer/:id" element={<DetailedCustomerInfoPage />} />
          <Route path="/pushnotification" element={<PushNotification />} />
          <Route path="/updatebookingstatus" element={<UpdateStatus />} />
          <Route path="/addservice" element={<AddService />} />
          <Route path="/addpromotion" element={<AddPromotion />} />
          <Route path="/deletepromotion" element={<DeletePromotion />} />
          <Route path="/clientenquiry" element={<ClientEnquiry />} />
          <Route path="/deleteservice" element={<ServiceView />} />
          <Route path="/addtopservice" element={<AddTopService />} />
          <Route path="/addagent" element={<AddAgentPage />} />
          <Route path="/viewagent" element={<ViewAgentPage />} />
          <Route path="/agent-details/:id" element={<AgentDetailsPage />} />
          <Route path="/viewtopservice" element={<ViewTopServices />} />
          <Route path="/addstocks" element={<AddStocks />} />
          <Route path="/viewavailablestocks" element={<ViewAvailableStocks />} />
          <Route path="/availabledate" element={<Availabledate />} />
          <Route path="/addoffers" element={<Addoffers />} />
          <Route path="/viewoffers" element={<ViewOffers /> } />
          <Route path="/viewlatestbookings" element={<ViewLatestBooking /> } />
          <Route path="/viewpendingbookings" element={<ViewPendingBookings /> } />
          <Route path="/viewcancledbookings" element={<ViewCancledBookings /> } />
          <Route path="/viewongoingbookings" element={<ViewOnGoingBookings /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
