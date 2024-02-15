import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/adminMain.css'

const AdminSideBar = () => {

    return (
        <div className="sidebar">
            {/*<input type="text" placeholder="Search..." id="searchInputField"/>*/}
            <div className="categories">
                <ul>
                    <a href="/AdminAirlines">
                        <li>Airlines</li>
                    </a>
                    <a href='/AdminUsers'>
                        <li>Users</li>
                    </a>
                    <a href='/AdminFlights'>
                        <li>Tickets</li>
                    </a>
                    <a href='/adminBookings'>
                        <li>Bookings</li>
                    </a>
                    <a href='/adminLogs'>
                        <li>Logs</li>
                    </a>
                </ul>
            </div>
        </div>
    )
}

export default AdminSideBar