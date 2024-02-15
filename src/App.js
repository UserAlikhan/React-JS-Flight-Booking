import {BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "../user/src/pages/home";
import PaymentPage from "../user/src/pages/paymentPage";
import Registration from "../user/src/pages/registration";
import SeatOrder from "../user/src/pages/seatOrder";
import TicketDetails from "../user/src/pages/ticketDetails";
import Booking from "../user/src/pages/booking";
import authorization from "../user/src/pages/authorization";
import Authorization from "../user/src/pages/authorization";
import AdminMain from "../user/src/pages/adminPages/adminMain";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="paymentPage" element={<PaymentPage/>}/>
          <Route path="registration" element={<Registration/>}/>
          <Route path="seatOrder" element={<SeatOrder/>}/>
          <Route path="ticketDetails" element={<TicketDetails/>}/>
          <Route path="booking" element={<Booking/>}/>
          <Route path="authorization" element={<Authorization/>}/>
          <Route path="adminMain" element={<AdminMain/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
