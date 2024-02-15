import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PaymentPage from "./pages/paymentPage";
import Registration from "./pages/registration";
import SeatOrder from "./pages/seatOrder";
import TicketDetails from "./pages/ticketDetails";
import Booking from "./pages/booking";
import Authorization from "./pages/authorization";
import AdminMain from "./pages/adminPages/adminMain";
import PrivateRoute from "./PrivateRoute";
import AdminAirlines from "./pages/adminPages/AdminAirlines";
import AddAirline from "./pages/addPages/addAirline";
import UpdateAirline from "./pages/addPages/updateAirline";
import UpdateAirlines from "./pages/addPages/updateAirline";
import AdminUsers from "./pages/adminPages/adminUsers";
import AddUsers from "./pages/addPages/addUsers";
import UpdateUsers from "./pages/addPages/updateUsers";
import AdminAirports from "./pages/adminPages/AdminAirports";
import AddAirports from "./pages/addPages/addAirports";
import UpdateAirports from "./pages/addPages/updateAirports";
import AdminFlights from "./pages/adminPages/AdminFlights";
import AddFlights from "./pages/addPages/addFlights";
import AdminBooking from "./pages/adminPages/AdminBooking";
import AdminBookings from "./pages/adminPages/AdminBooking";
import AddBookings from "./pages/addPages/addBooking";
import UpdateBooking from "./pages/addPages/updateBooking";
import UpdateFlights from "./pages/addPages/updateFlights";
import AdminLogs from "./pages/adminPages/AdminLogs";
import Profile from "./pages/profile";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="paymentPage" element={<PaymentPage />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path="/seatOrder" element={<SeatOrder />} />
                    <Route path="/ticketDetails/:id" element={<TicketDetails />} />
                    <Route path="booking" element={<Booking />} />
                    <Route path="authorization" element={<Authorization />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<div style={{display: 'flex', justifyContent:'center',
                        fontSize: '36px', color: 'red', marginTop: '55px'}}>Page not found!</div>} />

                    {/* Use PrivateRoute directly within Routes */}
                    <Route path='/adminMain' element={<PrivateRoute element={AdminMain}/>}>
                        <Route path='/adminMain' element={<AdminMain/>}/>
                    </Route>

                    <Route path='/adminAirlines' element={<PrivateRoute element={AdminAirlines}/>}>
                        <Route path='/adminAirlines' element={<AdminAirlines/>}/>
                    </Route>

                    <Route path='/adminAddAirlines' element={<PrivateRoute element={AddAirline}/>}>
                        <Route path='/adminAddAirlines' element={<AddAirline/>}/>
                    </Route>

                    <Route path='/adminUpdateAirline/:id' element={<PrivateRoute element={UpdateAirlines}/>}>
                        <Route path='/adminUpdateAirline/:id' element={<UpdateAirline/>}/>
                    </Route>
                    {/*#####################################################################################*/}
                    <Route path='/adminUsers' element={<PrivateRoute element={AdminUsers}/>}>
                        <Route path='/adminUsers' element={<AdminUsers/>}/>
                    </Route>

                    <Route path='/adminAddUsers' element={<PrivateRoute element={AddUsers}/>}>
                        <Route path='/adminAddUsers' element={<AddUsers/>}/>
                    </Route>

                    <Route path='/adminUpdateUser/:id' element={<PrivateRoute element={UpdateUsers}/>}>
                        <Route path='/adminUpdateUser/:id' element={<UpdateAirline/>}/>
                    </Route>
                    {/*#################################################################################*/}
                    <Route path='/adminAirports' element={<PrivateRoute element={AdminAirports}/>}>
                        <Route path='/adminAirports' element={<AdminAirports/>}/>
                    </Route>

                    <Route path='/adminAddAirports' element={<PrivateRoute element={AddAirports}/>}>
                        <Route path='/adminAddAirports' element={<AddAirports/>}/>
                    </Route>

                    <Route path='/adminUpdateAirports/:id' element={<PrivateRoute element={UpdateAirports}/>}>
                        <Route path='/adminUpdateAirports/:id' element={<UpdateAirports/>}/>
                    </Route>
                    {/*#################################################################################*/}
                    <Route path='/adminFlights' element={<PrivateRoute element={AdminFlights}/>}>
                        <Route path='/adminFlights' element={<AdminAirports/>}/>
                    </Route>

                    <Route path='/adminAddFlights' element={<PrivateRoute element={AddFlights}/>}>
                        <Route path='/adminAddFlights' element={<AddAirports/>}/>
                    </Route>

                    <Route path='/adminUpdateFlights/:id' element={<PrivateRoute element={UpdateFlights}/>}>
                        <Route path='/adminUpdateFlights/:id' element={<UpdateFlights/>}/>
                    </Route>
                    {/*#################################################################################*/}
                    <Route path='/adminBookings' element={<PrivateRoute element={AdminBookings}/>}>
                        <Route path='/adminBookings' element={<AdminBookings/>}/>
                    </Route>

                    <Route path='/adminAddBooking' element={<PrivateRoute element={AddBookings}/>}>
                        <Route path='/adminAddBooking' element={<AddBookings/>}/>
                    </Route>

                    <Route path='/adminUpdateBooking/:id' element={<PrivateRoute element={UpdateBooking}/>}>
                        <Route path='/adminUpdateBooking/:id' element={<UpdateBooking/>}/>
                    </Route>

                    <Route path='/adminLogs' element={<PrivateRoute element={AdminLogs}/>}>
                        <Route path='/adminLogs' element={<AdminLogs/>}/>
                    </Route>

                </Routes>
            </Router>
        </div>
    );
}

export default App;
