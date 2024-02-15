import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/addAirline.css';

const UpdateAirlines = () => {
    const [airport, setAirport] = useState({
        City: '',
        Country: ''
    });

    const navigate = useNavigate();
    const location = useLocation();

    const airportId = location.pathname.split('/')[2];

    useEffect(() => {
        // Fetch existing airport data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/adminAirports/${airportId}`);
                const existingAirportData = response.data[0];
                setAirport(existingAirportData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [airportId]);

    function handleChange(e) {
        const updatedState = { ...airport, [e.target.name]: e.target.value };
        setAirport(updatedState);
    }

    async function handleClick() {
        try {
            await axios.put(`http://localhost:8000/adminAirports/${airportId}`, airport);
            navigate('/adminAirports');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form">
            <div className="coverAirline">
                <h1>Update Airport</h1>
                <input type="text" placeholder="City" onChange={handleChange} name="City" value={airport.City} />
                <input type="text" placeholder="Country" onChange={handleChange} name="Country" value={airport.Country} />
                <button className="formButton" onClick={handleClick}>Update</button>
            </div>
        </div>
    );
};

export default UpdateAirlines;
