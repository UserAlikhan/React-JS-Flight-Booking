import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../styles/addAirline.css'

const AddBookings = () => {
    const [booking, setBooking] = useState({
        People_id: '',
        Flights_id: '',
        BookingDate: '',
        BookingTime: '',
        SeatNumber: ''
    })

    const [people, setPeople] = useState([])
    const [flights, setFlights] = useState([])

    useEffect(() => {
        // Fetch airports and airlines data for dropdowns
        axios.get('http://localhost:8000/adminUsers')
            .then(response => {
                setPeople(response.data)
            })
            .catch(error => {
                console.error('Error fetching people ', error)
            });

        axios.get('http://localhost:8000/adminFlights')
            .then(response => {
                setFlights(response.data)
            })
            .catch(error => {
                console.error('Error fetching flights ', error)
            });

        axios.get('http://localhost:8000/adminBookings')
            .then(response => {
                setBooking(response.data)
            })
            .catch(error => {
                console.error('Error fetching bookings ', error)
            });
    }, []);

    const navigate = useNavigate()

    function updateState(prev, e){
        return {...prev, [e.target.name]: e.target.value}
    }
    function handleChange(e){
        const updatedState = updateState(booking, e)
        setBooking(updatedState)
        console.log('Booking ', booking)
    }

    async function handleClick(e){
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/adminBookings', booking)
            navigate('/adminBookings')
        } catch (error){
            console.error(error)
        }
    }

    return (
        <div className="form">
            <div className="coverFlight">
                <h1>Add New Booking</h1>

                <label>User</label>
                <select onChange={handleChange} name="People_id">
                    <option value="">Select User</option>
                    {people.map(person => (
                        <option key={person.id} value={person.id}>{person.Name}, {person.Lastname}</option>
                    ))}
                </select>

                <label>Flights</label>
                <select onChange={handleChange} name="Flights_id">
                    <option value="">Select Flight</option>
                    {flights.map(flight => (
                        <option key={flight.id} value={flight.id}>{flight.DepartureDate}, {flight.DepartureTime}</option>
                    ))}
                </select>

                <label>Booking Date:</label>
                <input type="date" onChange={handleChange} name="BookingDate" />
                <label>Booking Time:</label>
                <input type="time" onChange={handleChange} name="BookingTime" />
                <label>Seat Number:</label>
                <input type="number" onChange={handleChange} name="SeatNumber" />

                <button className="formButton" onClick={handleClick}>Add</button>
            </div>
        </div>
    )
}

export default AddBookings;
