import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/addAirline.css';

const AddAirline = () => {
    const [airportParameters, setAirportParameters] = useState({
        City: "",
        Country: ""
    });

    const navigate = useNavigate();

    function updateState(prev, e) {
        return { ...prev, [e.target.name]: e.target.value };
    }

    function handleChange(e) {
        const updatedState = updateState(airportParameters, e);
        setAirportParameters(updatedState);
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/adminAirports', airportParameters);
            navigate('/adminAirports');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form">
            <div className="coverAirline">
                <h1>Add New Airport</h1>
                <input type="text" placeholder="City" onChange={handleChange} name="City" />
                <input type="text" placeholder="Country" onChange={handleChange} name="Country" />
                <button className="formButton" onClick={handleClick}>Add</button>
            </div>
        </div>
    );
};

export default AddAirline;
