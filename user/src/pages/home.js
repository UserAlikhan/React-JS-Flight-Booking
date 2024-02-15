import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./styles/home.css"
import logoNew from "./images/logoNew.png"
import flightImg from "./images/flightHome.jpg"
import {jwtDecode} from "jwt-decode";

const home = () => {

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token ', decodedToken.userId)
            const userId = decodedToken.userId; // Replace with the actual key in your token
            return userId;
        }
        return null;
    };
    
    const userId = getUserIdFromToken();

    function handleLogout(){
        localStorage.removeItem('token')
    }

    return (
        <div className="App">
            <div className="navigationPanel">
                <div className="logo">
                    <img src={logoNew} alt="Logo"/>
                </div>
                <div className="Pages">
                    <a href="/booking">Tickets</a>
                    <a href="/booking">Booking</a>
                    {userId ? (
                        <>
                            <Link to="/profile">Profile</Link>
                            <br />
                            <button id={'LogoutBtn'} onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/authorization" className="regAndAuth">
                                Authorization
                            </Link>
                            <Link to="/registration" className="regAndAuth">
                                Registration
                            </Link>
                        </>
                    )}
                    <a href="/booking">
                        <input type="button" value="Book Now" id="BookNowButton"/>
                    </a>
                </div>
            </div>

            <div className="containerHome">
                <div className="pageInfo">
                    <h1>Purchase of air tickets</h1>
                    <p>Watch and buy air tickets for your unforgettable travels</p>
                    <a href="/booking">
                        <input type="button" value="Make Your Trip" id="MakeYourTripButton"/>
                    </a>
                </div>
                <div className="imgPanel">
                    <img src={flightImg} alt="planeImg"/>
                </div>
            </div>
        </div>
    )
}

export default home