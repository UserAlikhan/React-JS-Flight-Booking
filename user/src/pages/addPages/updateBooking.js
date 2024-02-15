import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/addAirline.css'; // Ensure you have the correct styles

const UpdateBooking = () => {
    const [booking, setBooking] = useState({
        People_id: '',
        Flights_id: '',
        BookingDate: '',
        BookingTime: '',
        SeatNumber: ''
    });

    const [people, setPeople] = useState([]);
    const [flights, setFlights] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const bookingId = location.pathname.split('/')[2];

    useEffect(() => {
        // Fetch people and flights data for dropdowns
        const fetchData = async () => {
            try {
                const peopleResponse = await axios.get('http://localhost:8000/adminUsers');
                setPeople(peopleResponse.data);

                const flightsResponse = await axios.get('http://localhost:8000/adminFlights');
                setFlights(flightsResponse.data);

                const bookingResponse = await axios.get(`http://localhost:8000/adminBookings/${bookingId}`);
                const existingBookingData = bookingResponse.data[0];
                setBooking(existingBookingData);
            } catch (error) {
                console.error('Error fetching data ', error);
            }
        };

        fetchData();
    }, [bookingId]);

    function updateState(prev, e) {
        const updatedState = { ...prev };

        if (e.target.value !== "") {
            updatedState[e.target.name] = e.target.value;
        }

        return updatedState;
    }

    function handleChange(e) {
        const updatedState = updateState(booking, e);
        setBooking(updatedState);
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/adminBookings/${bookingId}`, booking);
            navigate('/adminBookings');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form">
            <div className="coverBooking">
                <h1>Update Booking</h1>
                <label>User:</label>
                <select onChange={handleChange} name="People_id" value={booking.People_id}>
                    <option value="">Select User</option>
                    {people.map(person => (
                        <option key={person.id} value={person.id}>{person.Name}, {person.Lastname}</option>
                    ))}
                </select>

                <label>Flight:</label>
                <select onChange={handleChange} name="Flights_id" value={booking.Flights_id}>
                    <option value="">Select Flight</option>
                    {flights.map(flight => (
                        <option key={flight.id} value={flight.id}>{flight.DepartureDate}, {flight.DepartureTime}</option>
                    ))}
                </select>

                <label>Booking Date:</label>
                <input type="date" onChange={handleChange} name="BookingDate" value={booking.BookingDate} />

                <label>Booking Time:</label>
                <input type="time" onChange={handleChange} name="BookingTime" value={booking.BookingTime} />

                <label>Seat Number:</label>
                <input type="number" onChange={handleChange} name="SeatNumber" value={booking.SeatNumber} />

                <button className="formButton" onClick={handleClick}>Update</button>
            </div>
        </div>
    );
};

export default UpdateBooking;
