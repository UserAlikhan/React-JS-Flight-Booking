import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/adminMain.css';
import AdminSideBar from "./adminSideBar";

const AdminFlights = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/adminFlights')
            .then(response => {
                setFlights(response.data);
            })
            .catch(error => {
                console.error('Error fetching flights ', error);
            });
    }, []);

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:8000/adminFlights/${id}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const navigate = useNavigate();

    return (
        <div className="App">
            <div className='AdminMainCover'>
                <AdminSideBar />
                <div className="infoWindow">
                    {flights.map(flight => {
                        return (
                            <div className="detailedInfo" key={flight.id}>
                                <p>Departure Time: {flight.DepartureTime}</p>
                                <p>Departure Date: {flight.DepartureDate}</p>
                                <p>Arrival Time: {flight.ArrivalTime}</p>
                                <p>Arrival Date: {flight.ArrivalDate}</p>
                                <p>Airline: {flight.AirlineName}</p>
                                <p>Departure Airport: {flight.DepartureAirport}</p>
                                <p>Arrival Airport: {flight.ArrivalAirport}</p>

                                <div className="buttonsPlace">
                                    <input type="button" id="deleteButton" value="delete" onClick={() => handleDelete(flight.id)} />
                                    <a href={`/adminUpdateFlights/${flight.id}`}>
                                        <input type="button" id="updateButton" value="update" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}

                    <div className="addButtonPlace">
                        <a href="/adminAddFlights">
                            <input type="button" id="addButton" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminFlights;
