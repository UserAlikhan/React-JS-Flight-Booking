import React, {useEffect, useState} from "react";
import axios from "axios";
import "./styles/booking.css"
import logoNew from "./images/logoNew.png";
import $ from 'jquery'

const SideBar = ({ onFilterChange }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [uniqueDepartureCodes, setUniqueDepartureCodes] = useState(new Set())
    const [uniqueArrivalCodes, setUniqueArrivalCodes] = useState(new Set())
    const [uniqueBaggage, setUniqueBaggage] = useState(new Set())
    const [uniqueAirline, setUniqueAirline] = useState(new Set())
    const [uniqueTransfers, setUniqueTransfers] = useState(new Set())

    useEffect(() => {
        axios
            .get("http://localhost:8000/dataset")
            .then((response) => {
                setData(response.data)

                const uniqueCodesDeparture = new Set(response.data.map(flight => flight.departureAirport.code))
                setUniqueDepartureCodes(uniqueCodesDeparture)

                const uniqueCodesArrival = new Set(response.data.map(flight => flight.arrivalAirport.code))
                setUniqueArrivalCodes(uniqueCodesArrival)

                const uniqueCodesBaggage = new Set(response.data.map(flight => flight.baggage && flight.baggage.checkIn ? flight.baggage.checkIn.text : 'N/A'))
                setUniqueBaggage(uniqueCodesBaggage)

                setUniqueAirline(new Set(response.data.map(flight => flight.flight_name)))

                setUniqueTransfers(new Set(response.data.map(flight => flight.stops)))
            })
            .catch((error) => {
                console.error("Error fetching data ", error);
            });
    }, []);


    useEffect(() => {
        // Фильтрация данных при изменении searchTerm
        if (searchTerm.trim() === "") {
            $("#searchResults").empty(); // Очищаем результаты поиска, если строка поиска пуста
        } else {
            const filteredData = data.filter((flight) =>
                // flight.flight_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                flight.departureAirport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                flight.arrivalAirport.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
            renderSearchResults(filteredData);
        }
    }, [searchTerm, data]);

    const renderSearchResults = (results) => {
        const searchResultsContainer = $("#searchResults");
        searchResultsContainer.empty();

        console.log('Results ', results)

        results.forEach((result) => {
            const resultItem = $(`
                <li class="resultItem" key=${result.id}>
                    ${result.departureAirport.city} - ${result.arrivalAirport.city} - ${result.departureAirport.time}
                </li>
            `);
            searchResultsContainer.append(resultItem);
        });
    };

    const handleFilterChange = () => {
        onFilterChange({
            departureCodes: Array.from(document.querySelectorAll('#componentList input:checked')).map(checkbox => checkbox.value),
            arrivalCodes: Array.from(document.querySelectorAll('#componentListArrival input:checked')).map(checkbox => checkbox.value),

        })
    }

    const menuBtnChange = () => {
        setIsOpen(!isOpen)
    };

    const handleToggleList = (btn, listName) => {
        var componentList = document.getElementById(listName);

        if (componentList) {
            componentList.style.display = (componentList.style.display === 'none') ? 'block' : 'none';
            if (componentList.style.display === 'none') {
                componentList.className = 'bx bx-down-arrow-alt';
            } else {
                componentList.className = 'bx bx-up-arrow-alt';
            }
        }
    };

    return (
        <div className={`sidebarBooking ${isOpen ? 'open' : ''}`}>
            <div className="logo_contentBooking">
                <img src={logoNew} alt="profilePhoto" />
                {`bx bx-menu ${isOpen ? 'open' : ''}`}
                <i className={`bx bx-menu ${isOpen ? 'open' : ''}`} onClick={menuBtnChange} id="btn"></i>
            </div>
            <ul className="nav_list">
                <li>
                    <i className='bx bx-search'></i>
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    {searchTerm.trim() !== "" && <ul id="searchResults"></ul>}
                    <span className="tooltipBooking">Search</span>

                </li>
                {/*// <!-- Departure Airport -->*/}
                <li>
                    <a href="###">
                        <i className='bx bx-paper-plane' ></i>
                        <span className="links_nameBooking">Departure Airport</span>
                        {/*<i className={`bx ${sidebarOpen ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}*/}
                        {/*   id="fetchBtn"*/}
                        {/*   onClick={() => handleToggleList(this, 'componentList')}/>*/}
                        <i className='bx bx-up-arrow-alt' id="fetchBtn" onClick={() => handleToggleList(this, `componentList`)}></i>
                    </a>

                    <div className="dropdownBooking">
                        <ul id="componentList" className="component_listBooking">
                            {[...uniqueDepartureCodes].map((code, index) => (
                                <li key={index}>
                                    <p>{code}</p>
                                    <input type="checkbox" onChange={handleFilterChange} value={code}/>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <span className="tooltipBooking">Departure Airport</span>
                </li>
                {/*// <!-- Arrival Airport -->*/}
                <li>
                    <a href="###">
                        <i className="bx bx-paper-plane"></i>
                        <span className="links_nameBooking">Arrival Airport</span>
                        <i className='bx bx-up-arrow-alt' id="fetchBtn" onClick={() => handleToggleList(this, `componentListArrival`)}></i>
                    </a>

                    <div className="dropdownBooking">
                        <ul id="componentListArrival" className="component_listBooking">
                            {[...uniqueArrivalCodes].map((code, index) => (
                                <li key={index}>
                                    <p>{code}</p>
                                    <input type="checkbox" onChange={handleFilterChange} value={code}/>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <span className="tooltipBooking">Arrival Airport</span>
                </li>
                {/*// <!-- Additional Luggage -->*/}
                <li>
                    <a href="###">
                        <i className='bx bxs-shopping-bags'></i>
                        <span className="links_nameBooking">Luggage</span>
                        <i className='bx bx-up-arrow-alt' id="fetchBtn" onClick={() => handleToggleList(this, `componentListLuggage`)}></i>
                    </a>

                    <div className="dropdownBooking">
                        <ul id="componentListLuggage" className="component_listBooking">
                            {[... uniqueBaggage].map((code, index) => (
                                <li key={index}>
                                    <p>{code}</p>
                                    <input type="checkbox" value={code}/>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <span className="tooltipBooking">Additional Luggage</span>
                </li>
                {/*// <!-- Airlines -->*/}
                <li>
                    <a href="###">
                        <i className="bx bx-paper-plane"></i>
                        <span className="links_nameBooking">Airlines</span>
                        <i className="bx bx-up-arrow-alt" id="fetchBtn" onClick={() => handleToggleList(this, `componentListAirlines`)}></i>
                    </a>

                    <div className="dropdownBooking">
                        <ul id="componentListAirlines" className="component_listBooking">
                            {[... uniqueAirline].map((code, index) => (
                                <li key={index}>
                                    <p>{code}</p>
                                    <input type="checkbox" value={code}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <span className="tooltipBooking">Airlines</span>
                </li>
                {/* Transfers */}
                <li>
                    <a href="###">
                        <i className='bx bx-body' ></i>
                        <span className="links_nameBooking">Transfers</span>
                        <i className='bx bx-up-arrow-alt' id="fetchBtn" onClick={() => handleToggleList(this, `componentListTransfers`)}></i>
                    </a>
                    <div className="dropdownBooking">
                        <ul id="componentListTransfers" className="component_listBooking">
                            {[... uniqueTransfers].map((code, index) => (
                                <li key={index}>
                                    <p>{code}</p>
                                    <input type="checkbox" value={code}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <span className="tooltipBooking">Transfers</span>
                </li>

                <li>
                    <a href="###">
                        <i className='bx bx-user' ></i>
                        <span className="links_nameBooking">User</span>
                    </a>
                    <span className="tooltipBooking">User</span>
                </li>

                {/*<li className="profile">*/}
                {/*    <div className="profile_details">*/}
                {/*        <img src={logoNew} alt="profilePhoto"/>*/}
                {/*        <div className="name">Name</div>*/}
                {/*    </div>*/}
                {/*</li>*/}
                <li className="logout">
                    <a href="###" className="logoutComponents">
                        <i className="bx bx-log-out"></i>
                    </a>
                    <span className="tooltipBooking">Log Out</span>
                </li>
            </ul>
        </div>
    );
};

export default SideBar