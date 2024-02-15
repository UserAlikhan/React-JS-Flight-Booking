import React, {useEffect, useState} from "react";
import {json, Link, useNavigate} from "react-router-dom";
import "./styles/booking.css"
import logoNew from "./images/logoNew.png"
import "boxicons/css/boxicons.min.css"
import Sidebar from "./sidebar";
import axios from 'axios'
import $ from 'jquery'
import {jwtDecode} from "jwt-decode";
import ticketDetails from "./ticketDetails";

const Booking = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(9)
    const maxButtonsToShow = 5

    const [searchFilters, setSearchFilters] = useState({
        departurePlace: '',
        arrivalPlace: '',
        departureDate: '',
        numberOfPeople: 0,
        departureAirportCodes: '',
        arrivalAirportCodes: ''
    });

    const [noTicketsMessage, setNoTicketsMessage] = useState("");
    // const [favoriteData, setFavoriteData] = useState({
    //     FlightName: "",
    //     PeopleId: 0
    // })
    const [favoriteData, setFavoriteData] = useState({})
    const [favoritePersonTickets, setFavoritePersonTickets] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/dataset')
            .then(response => {
                setData(response.data);

            })
            .catch(error => {
                console.error('Error fetching data ', error);
            });
    }, []);

    const handleInputChange = (e) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = () => {
        const filteredData = data.filter((flight) => {
            const departurePlaceMatch = flight.departureAirport.city.trim().toLowerCase().includes(searchFilters.departurePlace.trim().toLowerCase());
            const arrivalPlaceMatch = flight.arrivalAirport.city.trim().toLowerCase().includes(searchFilters.arrivalPlace.trim().toLowerCase());

            const flightDate = flight.departureAirport.time.split('T')[0]
            // console.log('FlightDate ', flightDate)
            // console.log('S F ', searchFilters.departureDate)
            // const departureDateMatch = new Date(flight.departureAirport.time).toISOString().includes(new Date(searchFilters.departureDate).toISOString())
            const departureDateMatch = flightDate === searchFilters.departureDate

            const numberOfPeopleMatch = flight.departureAirport.type == searchFilters.numberOfPeople;

            // console.log('DP ', departurePlaceMatch)
            // console.log('AP ', arrivalPlaceMatch)
            // console.log('DD ', departureDateMatch)
            // console.log('NP ', numberOfPeopleMatch)
            // console.log('D T', flight.departureAirport.type)

            return departurePlaceMatch && arrivalPlaceMatch && departureDateMatch && numberOfPeopleMatch;
        });

        console.log('FD ', filteredData);
        setFilteredData(filteredData)
        console.log('Code depart ', searchFilters.departureAirportCodes)
        console.log('Code arrival ', searchFilters.arrivalAirportCodes)

        const additionalFilteredData = filteredData.filter((flight) => {
            // Add your additional search criteria here

            const flightDepartCode = searchFilters.departureAirportCodes.length === 0 ||
                flight.departureAirport.code.trim().toLowerCase().includes(
                    searchFilters.departureAirportCodes[0].trim().toLowerCase())
            const flightArrivalCode = searchFilters.arrivalAirportCodes.length === 0 ||
                flight.arrivalAirport.code.trim().toLowerCase().includes(
                    searchFilters.arrivalAirportCodes[0].trim().toLowerCase())

            // Return true if the flight meets the additional criteria
            return flightDepartCode && flightArrivalCode;
        });

        console.log('Code depart ', searchFilters.departureAirportCodes[0])
        console.log('Code arrival ', searchFilters.arrivalAirportCodes[0])

        // Update state with the final filtered data
        setFilteredData(additionalFilteredData)

        if (additionalFilteredData.length === 0){
            setNoTicketsMessage("No tickets found. Please enter correct data!!!")
        } else {
            setNoTicketsMessage("")
        }
    };

    //calculate the index of the last card on the current page
    const indexOfLastCard = currentPage * cardsPerPage
    //calculate the index of the first card on the current page
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    // Get the current page of cards

    let currentCards;

    if (filteredData.length > 0) {
        // If at least one filter is truthy, use filtered data
        currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);
    } else {
        // If no filters are truthy, use all data
        currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
    }

    // useEffect(() => {
    //     async function fetchData(){
    //         try{
    //             const res = await axios.get("http://localhost:8000/flights")
    //             console.log('Data ', res.data)
    //             setData(res.data)
    //         }catch (error){
    //             console.error('Data fetch error ', error)
    //         }
    //     }
    //     fetchData()
    // }, []);
    //
    // console.log('Data const ', data)

    const handleFilterChange = (filters) => {
        setSearchFilters({
            ...searchFilters,
            departureAirportCodes:  filters.departureCodes,
            arrivalAirportCodes: filters.arrivalCodes
        })
    }

    function formatTime(dateTimeString) {
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        return new Date(dateTimeString).toLocaleDateString('en-US', options)
    }

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

    useEffect(() => {
        axios.get(`http://localhost:8000/favorites/${userId}`)
            .then(response => setFavoritePersonTickets(response.data))
            .catch(error => console.error('Error fetching favorites for person ', error))
    }, [favoriteData]);

    console.log('Fav tickets ', favoritePersonTickets)


    async function toggleFavorite(flightId) {

        const selectedFlight = data.find((flight) => flight.id === flightId);

        // If the flight is found, update favoriteData with its values
        if (selectedFlight) {
            setFavoriteData({
                Flight: selectedFlight.id,
                PeopleId: userId
            });
            console.log('Fav ', favoriteData)
            // Perform the API request using the updated favoriteData
            await axios.post(`http://localhost:8000/favorites`, favoriteData);
        } else {
            console.error(`Flight with ID ${flightId} not found.`);
        }
    }

    function showTickets(data) {

        return data.map((flight, index) => {
            
            const isFavorite = favoritePersonTickets.some(ticket => ticket.Ticket === flight.id)
            console.log('IsFav ', isFavorite)
            return (
                <div className="card" key={index}>
                    <img
                        src={flight.Airline_img}
                        className="card-img-top" alt="Card Image"/>
                    <div className="card-body">
                        <p>Departure Airport: {flight.departureAirport.code}</p>
                        <p>Departure Time: {formatTime(flight.departureAirport.time)}</p>
                        <p>Arrival Airport: {flight.arrivalAirport.code}</p>
                        <p>Arrival Time: {formatTime(flight.arrivalAirport.time)}</p>
                        <p>Transfers: {flight.stops}</p>
                        <div className="flight-button">
                            <a href={`/ticketDetails/${flight.id}`}>
                                <input type="button" className="btn btn-primary" name="viewDetailsButton"
                                       id="viewDetailsButtonId" value="View Details" />
                            </a>
                            {/*<button onClick={() => toggleFavorite(flight.id)}>*/}
                            {/*    Add to Favorites*/}
                            {/*</button>*/}
                        </div>
                        <a href={`###`}>
                            <input type="button" value='' id='favoriteButton' onClick={() => toggleFavorite(flight.id)}
                                className={`favorite-button ${isFavorite ? 'favorite' : ''}`}/>
                        </a>
                    </div>
                </div>
            )
        })
    }

    // const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const totalPages = Math.ceil(data.length / cardsPerPage)

    function generatePaginationButtons(){
        const buttons = []
        const startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2))

        for (let i = startPage; i<=Math.min(totalPages, startPage + maxButtonsToShow - 1); i++){
            buttons.push(
                <button key={i} onClick={() => setCurrentPage(i)} className={i === currentPage ? 'active' : ''}>
                    {i}
                </button>
            )
        }
        return buttons
    }

    function handleLogout(){
        localStorage.removeItem('token')
    }

    return (
        <div className='App'>
            <Sidebar onFilterChange={handleFilterChange}/>

            <div className="navigation">
                <div className="rightSideNavPanel">
                    <a href="/">Main Window</a>
                    <br/>
                    <a href="/booking">Tickets</a>
                    <br/>
                    <a href="###">Hotels</a>

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
                </div>
            </div>

            <div className="filterPanel">
                <label htmlFor="departurePlace" id="departurePlaceLabel">Departure Place:</label>
                <input type="text" id="departurePlace" name="departurePlace" onChange={handleInputChange} />

                <label htmlFor="arrivalPlace">Arrival Place:</label>
                <input type="text" id="arrivalPlace" name="arrivalPlace" onChange={handleInputChange} />

                <label htmlFor="departureDate">Departure Date:</label>
                <input type="date" id="departureDate" name="departureDate" onChange={handleInputChange} />

                <label htmlFor="NumberOfPeople">Number Of People:</label>
                <input type="number" id="NumberOfPeople" name="numberOfPeople" onChange={handleInputChange} />

                <input className="filterBtn" type="button" value="Find" id="showTicketsButton" onClick={handleSearch} />
            </div>

            <div className="containerForCards mt-5">
                {noTicketsMessage ? (
                    <p className="no-ticket-message">{noTicketsMessage}</p>
                ) : (
                    <div className="card-container d-flex">
                        {showTickets(currentCards)}
                    </div>
                )}
            </div>

            <div className="pagination">
                {/*{Array.from({ length: Math.ceil(data.length / cardsPerPage) }, (_, i) => (*/}
                {/*    <button key={i + 1} onClick={() => paginate(i + 1)}>*/}
                {/*        {i + 1}*/}
                {/*    </button>*/}
                {/*))}*/}
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {generatePaginationButtons()}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Booking