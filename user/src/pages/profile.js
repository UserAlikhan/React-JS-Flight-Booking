import React, {useEffect, useState} from "react";
import './styles/profile.css'
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const Profile = () => {

    const [favorite, SetFavorite] = useState([])
    const [tickets, setTickets] = useState([])
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token ', decodedToken.userId)
            const userP = decodedToken; // Replace with the actual key in your token
            return userP;
        }
        return null;
    };

    const userParam = getUserIdFromToken();
    console.log('Token ', userParam)

    useEffect(() => {
        axios.get(`http://localhost:8000/favorites/${userParam.userId}`)
            .then(response => {
                SetFavorite(response.data)
            })

        axios.get('http://localhost:8000/dataset')
            .then(response => {
                setTickets(response.data)
            })
    }, []);


    const getFavoriteTicketsFromAll = () => {
        return tickets.filter(ticket => favorite.some(fav => fav.Ticket === ticket.id));
    };

    const favoriteTickets = getFavoriteTicketsFromAll();

    console.log('Fav tickets ', favoriteTickets)

    return (
        <div className="profile-container">
            <div className="profileCover">
                <div className="user-info">
                    <h2>User Information</h2>
                    <p>
                        <strong>Email:</strong> {userParam.email}
                    </p>
                    <p>
                        <strong>Role:</strong> {userParam.roleUser}
                    </p>
                </div>

                <h2 id='FavTicket'>Favorite Tickets</h2>
                <div className="ticket-scroll-panel" style={{width: '100%'}}>
                    {favoriteTickets.map((ticket) => (
                        <div key={ticket.id} className="ticket-card">
                            <p>
                                <strong>Departure city:</strong> {ticket.departureAirport.city}
                            </p>
                            <p>
                                <strong>Arrival city:</strong> {ticket.arrivalAirport.city}
                            </p>
                            <p>
                                <strong>Airline Name:</strong> {ticket.flight_name}
                            </p>
                            <a href={`/ticketDetails/${ticket.id}`}>
                                <input type="button" className="btn btn-primary" name="viewDetailsButton"
                                       id="viewDetailsButtonId" value="View Details" />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="prevPage">
                    <a href="/booking">Get Back to the Booking</a>
                </div>
            </div>

        </div>
    );
};

export default Profile;
