import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/adminMain.css'
import AdminSideBar from "./adminSideBar";

const AdminAirports = () => {
    const [airports, setAirports] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/adminAirports')
            .then(response => {
                setAirports(response.data)
            })
            .catch(error => {
                console.error('Error fetching airports ', error)
            })
    }, []);

    console.log('Airports ', airports)

    async function handleDelete(id) {
        try{
            await axios.delete('http://localhost:8000/adminAirports/'+id)
            window.location.reload()
        } catch (error){
            console.error(error)
        }

    }

    return (
        <div className="App">
            <div className='AdminMainCover'>
                <AdminSideBar/>
                <div className="infoWindow">
                    {airports.map(airport => {
                        return <div className="detailedInfo">
                            <p>{airport.City}</p>
                            <p>{airport.Country}</p>

                            <div className="buttonsPlace">
                                <input type="button" id="deleteButton" value="delete" onClick={function () {handleDelete(airport.id)}}/>
                                <a href={`/adminUpdateAirports/${airport.id}`}>
                                    <input type="button" id="updateButton" value="update"/>
                                </a>
                            </div>
                        </div>
                    })}

                    <div className="addButtonPlace">
                        <a href="/adminAddAirports">
                            <input type="button" id="addButton"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAirports