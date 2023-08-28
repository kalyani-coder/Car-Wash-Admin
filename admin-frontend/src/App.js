import logo from "./logo.svg";
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
import DeleteService from "./components/Service/DeleteService";
import AddTopService from "./components/TopService/AddTopService";

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
          <Route path="/deleteservice" element={<DeleteService />} />
          <Route path="/addtopservice" element={<AddTopService />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
