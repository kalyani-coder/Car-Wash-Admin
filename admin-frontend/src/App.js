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
import AddClients from "./components/Client/AddClients";
import JobCard from "./components/JobCard/JobCard";
import ViewJobCard from "./components/JobCard/ViewJobCard";
import Master from "./components/CreateMaster/Master";
import UpdateMaster from "./components/CreateMaster/UpdateMaster";
import Login from "./components/Login/Login";
import Login2 from "./components/Login/Login2";
import ProtectRoute from "./components/ProtectedRoute.js/ProtectedRoute"
import PageNotFound from "./components/PageNotFound/PageNotFound";


function App() {
  return (
    <>
      <Router>
      {/* sidebar seperately call on each component  */}
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Login2 />} />
          <Route path="/home" element={<ProtectRoute element={<Login/>}/>} />
          <Route path="/clientdetails" element={<ProtectRoute element={<CustomerDetailsCard/>}/>} />
          <Route path="/customer/:id" element={<ProtectRoute element={<DetailedCustomerInfoPage/>}/>} />
          <Route path="/pushnotification" element={<ProtectRoute element={<PushNotification/>}/>} />
          <Route path="/updatebookingstatus" element={<ProtectRoute element={<UpdateStatus/>}/>} />
          <Route path="/addservice" element={<ProtectRoute element={<AddService/>}/>} />
          <Route path="/addpromotion" element={<ProtectRoute element={<AddPromotion/>}/>} />
          <Route path="/deletepromotion" element={<ProtectRoute element={<DeletePromotion/>}/>} />
          <Route path="/clientenquiry" element={<ProtectRoute element={<ClientEnquiry/>}/>} />
          <Route path="/addclients" element={<ProtectRoute element={<AddClients/>}/>} />
          <Route path="/deleteservice" element={<ProtectRoute element={<ServiceView/>}/>} />
          <Route path="/addtopservice" element={<ProtectRoute element={<AddTopService/>}/>} />
          <Route path="/addagent" element={<ProtectRoute element={<AddAgentPage/>}/>} />
          <Route path="/viewagent" element={<ProtectRoute element={<ViewAgentPage/>}/>} />
          <Route path="/agent-details/:id" element={<ProtectRoute element={<AgentDetailsPage/>}/>} />
          <Route path="/viewtopservice" element={<ProtectRoute element={<ViewTopServices/>}/>} />
          <Route path="/addstocks" element={<ProtectRoute element={<AddStocks/>}/>} />
          <Route path="/viewavailablestocks" element={<ProtectRoute element={<ViewAvailableStocks/>}/>} />
          <Route path="/availabledate" element={<ProtectRoute element={<Availabledate/>}/>} />
          <Route path="/addoffers" element={<ProtectRoute element={<Addoffers/>}/>} />
          <Route path="/viewoffers" element={<ProtectRoute element={<ViewOffers/>}/> } />
          <Route path="/viewlatestbookings" element={<ProtectRoute element={<ViewLatestBooking/>}/> } />
          <Route path="/viewpendingbookings" element={<ProtectRoute element={<ViewPendingBookings/>}/> } />
          <Route path="/viewcancledbookings" element={<ProtectRoute element={<ViewCancledBookings/>}/>} />
          <Route path="/viewongoingbookings" element={<ProtectRoute element={<ViewOnGoingBookings/>}/> } />
          <Route path="/jobcard" element={<ProtectRoute element={<JobCard/>}/> } />
          <Route path="viewjobcard" element={<ProtectRoute element={<ViewJobCard/>}/>} />
          <Route path="/master" element={<ProtectRoute element={<Master/>}/>} />
          <Route path="/updatemaster" element={<ProtectRoute element={<UpdateMaster/>}/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
