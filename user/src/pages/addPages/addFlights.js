import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/addAirline.css';

const AddFlights = () => {
    const [flightParameters, setFlightParameters] = useState({
        DepartureTime: "",
        DepartureDate: "",
        ArrivalTime: "",
        ArrivalDate: "",
        Airline_id: "",
        Departure_Airport_id: "",
        Arrival_Airport_id: ""
    });

    const [airports, setAirports] = useState([]);
    const [airlines, setAirlines] = useState([]);

    useEffect(() => {
        // Fetch airports and airlines data for dropdowns
        axios.get('http://localhost:8000/adminAirports')
            .then(response => {
                setAirports(response.data);
            })
            .catch(error => {
                console.error('Error fetching airports ', error);
            });

        axios.get('http://localhost:8000/adminAirlines')
            .then(response => {
                setAirlines(response.data);
            })
            .catch(error => {
                console.error('Error fetching airlines ', error);
            });
    }, []);

    const navigate = useNavigate();

    function updateState(prev, e) {
        return { ...prev, [e.target.name]: e.target.value };
    }

    function handleChange(e) {
        const updatedState = updateState(flightParameters, e);
        setFlightParameters(updatedState);
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/adminFlights', flightParameters);
            navigate('/adminFlights');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form">
                    <div className="coverFlight">
                        <h1>Add New Flight</h1>
                        <label>Departure Time:</label>
                        <input type="time" onChange={handleChange} name="DepartureTime" />
                        <label>Departure Date:</label>
                        <input type="date" onChange={handleChange} name="DepartureDate" />
                        <label>Arrival Time:</label>
                        <input type="time" onChange={handleChange} name="ArrivalTime" />
                        <label>Arrival Date:</label>
                        <input type="date" onChange={handleChange} name="ArrivalDate" />

                        <label>Airline</label>
                <select onChange={handleChange} name="Airline_id">
                    <option value="">Select Airline</option>
                    {airlines.map(airline => (
                        <option key={airline.id} value={airline.id}>{airline.AirlineName}</option>
                    ))}
                </select>

                <label>Departure Airport:</label>
                <select onChange={handleChange} name="Departure_Airport_id">
                    <option value="">Select Departure Airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.City}, {airport.Country}</option>
                    ))}
                </select>

                <label>Arrival Airport:</label>
                <select onChange={handleChange} name="Arrival_Airport_id">
                    <option value="">Select Arrival Airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.City}, {airport.Country}</option>
                    ))}
                </select>

                <button className="formButton" onClick={handleClick}>Add</button>
            </div>
        </div>
    );
}

export default AddFlights;
