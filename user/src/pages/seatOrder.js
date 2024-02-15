import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import planeSeats from './images/PlaneSeatOrder.png'
import './styles/seatOrder.css'
import button from "bootstrap/js/src/button";
import {jwtDecode} from "jwt-decode";

const SeatOrder = () => {

    const [data, setData] = useState([])
    const  [selectedSeats, setSelectedSeats] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/seats`)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching favorites for person ', error))
    }, []);

    console.log('Fav tickets ', data)

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

    function toggleSeat(seatNumber) {
        // Dummy logic to toggle the color
        const seatButton = document.getElementById(`seat-button${seatNumber}`);
        seatButton.classList.toggle('selected');

        setSelectedSeats(prevSeats => {
            if (prevSeats.includes(seatNumber)) {
                return prevSeats.filter(seat => seat !== seatNumber);
            } else {
                return [...prevSeats, seatNumber];
            }
        });
    }

    console.log('SS ', selectedSeats)

    function generateSeatButtons(rowNumber, startSeat, endSeat) {
        const seatButtons = [];

        for (let seatNumber = startSeat; seatNumber <= endSeat; seatNumber++) {
            seatButtons.push(
                <input
                    key={seatNumber}
                    type="button"
                    className="seat-button"
                    id={`seat-button${seatNumber}`}
                    onClick={() => toggleSeat(seatNumber)}
                    value={seatNumber}
                />
            );
        }


        return (
            <div className={`${rowNumber}`}>
                {seatButtons}
            </div>
        );
    }

    async function handleOnClick(){
        try{
            await axios.post('http://localhost:8000/seats', [selectedSeats[0], userId])
        } catch (error){
            console.error(error)
        }
    }


    return (
        <div className="App">
            <div className="seatOderCover">
                <div className="airplane">
                    <img src={planeSeats} alt="Airplane" width="230px" height="930px" id="PlaneImg"/>

                    {generateSeatButtons('first-row', 1, 20)}
                    {generateSeatButtons('second-row', 21, 40)}
                    {generateSeatButtons('third-row', 41, 60)}
                    {generateSeatButtons('fourth-row', 61, 80)}

                </div>

                <div className="InfoWindow">
                    <div className="mainInfo">
                        <ul>
                            <li>Airline: Turkish Airlines</li>
                            <li>Plane Model: AirBus FGf12NM</li>
                            <li>Type ticket: Business</li>
                            <li>Luggage: Available</li>
                        </ul>
                    </div>

                    <div className="detailInfo">
                        <ul>
                            <li>Seat Number: {selectedSeats.join(', ')}</li>
                            <li>Price: {selectedSeats.length * 144}$</li>
                        </ul>
                        <a href="/paymentPage">
                            <input type="button" value="Pay" id="PayButton" onClick={handleOnClick}/>
                        </a>
                    </div>
                </div>

                <div className="prevPage">
                    <a href="/ticketDetails">Get Back to the Details</a>
                </div>
            </div>

            {/*<script>*/}
            {/*    function toggleSeat(button) {*/}
            {/*        button.classList.toggle('selected')}*/}
            {/*</script>*/}
        </div>
    )
}

export default SeatOrder