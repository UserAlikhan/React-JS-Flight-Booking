import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/addAirline.css'; // Ensure you have the correct styles

const UpdateFlights = () => {
    const [flight, setFlight] = useState({
        DepartureTime: '',
        DepartureDate: '',
        ArrivalTime: '',
        ArrivalDate: '',
        Airline_id: '',
        Departure_Airport_id: '',
        Arrival_Airport_id: ''
    });

    const [airlines, setAirlines] = useState([]);
    const [airports, setAirports] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const flightId = location.pathname.split('/')[2];

    useEffect(() => {
        // Fetch airlines and airports data for dropdowns
        const fetchData = async () => {
            try {
                const airlinesResponse = await axios.get('http://localhost:8000/adminAirlines');
                setAirlines(airlinesResponse.data);

                const airportsResponse = await axios.get('http://localhost:8000/adminAirports');
                setAirports(airportsResponse.data);

                const flightResponse = await axios.get(`http://localhost:8000/adminFlights/${flightId}`);
                const existingFlightData = flightResponse.data[0];
                setFlight(existingFlightData);
            } catch (error) {
                console.error('Error fetching data ', error);
            }
        };

        fetchData();
    }, [flightId]);

    function updateState(prev, e) {
        const updatedState = { ...prev };

        if (e.target.value !== "") {
            updatedState[e.target.name] = e.target.value;
        }

        return updatedState;
    }

    function handleChange(e) {
        const updatedState = updateState(flight, e);
        setFlight(updatedState);
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/adminFlights/${flightId}`, flight);
            navigate('/adminFlights');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form">
            <div className="coverFlight">
                <h1>Update Flight</h1>
                <label>Departure Time:</label>
                <input type="time" onChange={handleChange} name="DepartureTime" value={flight.DepartureTime} />

                <label>Departure Date:</label>
                <input type="date" onChange={handleChange} name="DepartureDate" value={flight.DepartureDate} />

                <label>Arrival Time:</label>
                <input type="time" onChange={handleChange} name="ArrivalTime" value={flight.ArrivalTime} />

                <label>Arrival Date:</label>
                <input type="date" onChange={handleChange} name="ArrivalDate" value={flight.ArrivalDate} />

                <label>Airline:</label>
                <select onChange={handleChange} name="Airline_id" value={flight.Airline_id}>
                    <option value="">Select Airline</option>
                    {airlines.map(airline => (
                        <option key={airline.id} value={airline.id}>{airline.AirlineName}</option>
                    ))}
                </select>

                <label>Departure Airport:</label>
                <select onChange={handleChange} name="Departure_Airport_id" value={flight.Departure_Airport_id}>
                    <option value="">Select Departure Airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.City}</option>
                    ))}
                </select>

                <label>Arrival Airport:</label>
                <select onChange={handleChange} name="Arrival_Airport_id" value={flight.Arrival_Airport_id}>
                    <option value="">Select Arrival Airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.City}</option>
                    ))}
                </select>

                <button className="formButton" onClick={handleClick}>Update</button>
            </div>
        </div>
    );
};

export default UpdateFlights;
