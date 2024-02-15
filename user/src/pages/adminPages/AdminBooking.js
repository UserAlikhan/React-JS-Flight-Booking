import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/adminMain.css'
import AdminSideBar from "./adminSideBar";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/adminBookings')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings ', error);
            });
    }, []);

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:8000/adminBookings/${id}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const navigate = useNavigate();

    console.log(bookings[1])

    return (
        <div className="App">
            <div className='AdminMainCover'>
                <AdminSideBar />
                <div className="infoWindow">
                    {bookings.map(booking => (
                        <div className="detailedInfo" key={booking.id}>
                            <p>Booking Date: {booking.BookingDate}</p>
                            <p>Booking Time: {booking.BookingTime}</p>
                            <p>Seat Number: {booking.SeatNumber}</p>
                            <p>Person: {booking.PersonName}</p>
                            <p>Departure Time: {booking.DepartureTime}</p>
                            <p>Departure Date: {booking.DepartureDate}</p>
                            <p>Arrival Time: {booking.ArrivalTime}</p>
                            <p>Arrival Date: {booking.ArrivalDate}</p>
                            {/*<p>Airline: {booking.AirlineName}</p>*/}
                            <p>Departure Airport: {booking.DepartureAirport}</p>
                            <p>Arrival Airport: {booking.ArrivalAirport}</p>

                            <div className="buttonsPlace">
                                <input type="button" id="deleteButton" value="delete" onClick={() => handleDelete(booking.id)} />
                                {/* Add an update link */}
                                <a href={`/adminUpdateBooking/${booking.id}`}>
                                    <input type="button" id="updateButton" value="update" />
                                </a>
                            </div>
                        </div>
                    ))}

                    <div className="addButtonPlace">
                        {/* Add a link to the page for adding new bookings */}
                        <a href="/adminAddBooking">
                            <input type="button" id="addButton" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminBookings;
