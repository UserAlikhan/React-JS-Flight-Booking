import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/adminMain.css'
import AdminSideBar from "./adminSideBar";

const AdminAirlines = () => {
    const [airlines, setAirlines] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/adminAirlines')
            .then(response => {
                setAirlines(response.data)
            })
            .catch(error => {
                console.error('Error fetching airlines ', error)
            })
    }, []);

    console.log('Airlines ', airlines)

    async function handleDelete(id) {
        try{
            await axios.delete('http://localhost:8000/adminAirlines/'+id)
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
                    {airlines.map(airline => {
                        return <div className="detailedInfo">
                            <p>{airline.AirlineName}</p>

                            <div className="buttonsPlace">
                                <input type="button" id="deleteButton" value="delete" onClick={function () {handleDelete(airline.id)}}/>
                                <a href={`/adminUpdateAirline/${airline.id}`}>
                                    <input type="button" id="updateButton" value="update"/>
                                </a>
                            </div>
                        </div>
                    })}

                    <div className="addButtonPlace">
                        <a href="/adminAddAirlines">
                            <input type="button" id="addButton"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAirlines