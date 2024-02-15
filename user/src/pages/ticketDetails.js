import React, {useEffect, useRef, useState} from 'react';
import './styles/ticketDetails.css'
import plane from './images/PlaneAtMap.png'
import logo from './images/logoNew.png'
import axios from 'axios'
import {useLocation} from "react-router-dom";
import * as XLSX from 'xlsx';

const TicketDetails = () => {

    const mapRef = useRef(null)
    const [data, setData] = useState([])

    const location = useLocation()
    const flightId = location.pathname.split('/')[2]

    useEffect(() => {
        if (!mapRef.current) {
            initializeMap();
            mapRef.current = true;
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            try{
                const res = await axios.get(`http://localhost:8000/getFlight/${flightId}`)
                console.log('Data ', data)
                setData(res.data)

            } catch (error){
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, []);

    // function showDetails(flight) {
    //
    //     return (
    //         <div className="card_body">
    //             <div className="departure_details">
    //                 <h2>Departure Details</h2>
    //                 <ul>
    //                     <li><strong>Time:</strong> {flight.departureAirport.time}</li>
    //                     <li><strong>Date:</strong> {flight.departureAirport.time}</li>
    //                     <li><strong>Country / City:</strong> {flight.departureAirport.country.label} - {flight.departureAirport.city}</li>
    //                     <li><strong>Airport:</strong> {flight.departureAirport.label}</li>
    //                 </ul>
    //             </div>
    //
    //             <div className="destination_details">
    //                 <h2>Destination Details</h2>
    //                 <ul>
    //                     <li><strong>Date:</strong> {flight.arrivalAirport.time}</li>
    //                     <li><strong>Time:</strong> {flight.arrivalAirport.time}</li>
    //                     <li><strong>Country / City:</strong> {flight.arrivalAirport.country.label} - {flight.arrivalAirport.city}</li>
    //                     <li><strong>Airport:</strong> {flight.arrivalAirport.label}</li>
    //                 </ul>
    //             </div>
    //         </div>
    //     )
    // }

    function fillInTheData(data) {

        if (!data || Object.keys(data).length === 0) {
            return <div>Loading...</div>

        } else {
            return (
                <div className="details">
                    <h1>From {data.departureAirport.city} to {data.arrivalAirport.city} Flight</h1>

                    <div className="baggage_included">
                        <i className="bx bxs-shopping-bags" style={{color: 'green'}}></i>
                        <p>Baggage: {data.baggage.cabin.text} per passenger</p>
                    </div>

                    <div className="card_head">
                        <img src={data.Airline_img} alt="airlineImg" style={{display: 'flex', alignItems: 'center'}}/>
                        <p className="airline-name">{data.flight_name}</p>
                    </div>

                    <div className="card_body">
                        <div className="departure_details">
                            <h2>Departure Details</h2>
                            <ul>
                                <li><strong>Time:</strong> {data.departureAirport.time}</li>
                                <li><strong>Date:</strong> {data.departureAirport.time}</li>
                                <li><strong>Country /
                                    City:</strong> {data.departureAirport.country.label} - {data.departureAirport.city}
                                </li>
                                <li><strong>Airport:</strong> {data.departureAirport.label}</li>
                            </ul>
                        </div>

                        <div className="destination_details">
                            <h2>Destination Details</h2>
                            <ul>
                                <li><strong>Date:</strong> {data.arrivalAirport.time}</li>
                                <li><strong>Time:</strong> {data.arrivalAirport.time}</li>
                                <li><strong>Country /
                                    City:</strong> {data.arrivalAirport.country.label} - {data.arrivalAirport.city}</li>
                                <li><strong>Airport:</strong> {data.arrivalAirport.label}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="booking">
                        <a href={`/seatOrder`}>
                            <input type="button" value="Reserve" id="BookingDetails"/>
                        </a>
                    </div>

                    <div className="map" id="map" style={{width: '1000px', height: '500px'}}>
                        {/* Map content */}
                    </div>
                    <button onClick={handleExportToExcel}>Export to Excel</button>
                </div>
        )
        }
    }

    console.log('X ', data.City_coordinates_x)
    console.log('Y ', data.City_coordinates_y)

    const initializeMap = () => {
        // Use the ymaps object provided by Yandex Maps API
        window.ymaps.ready(() => {
            const myMap = new window.ymaps.Map("map", {
                center: [48.8566, 2.3522],
                zoom: 4,
                type: 'yandex#hybrid'
            });

            // Creating departure and destination points
            const departurePoint = [48.8566, 2.3522]; // Париж
            const destinationPoint = [40.7128, -74.0060]; // Нью-Йорк
            // const departurePoint = data.City_coordinates_x; // Париж
            // const destinationPoint = data.City_coordinates_y; // Нью-Йорк

            // Creating route line
            const routeLine = new window.ymaps.Polyline([departurePoint, destinationPoint], {}, {
                strokeColor: "#FF0000",
                strokeWidth: 5,
                strokeOpacity: 0.7
            });

            // Find the coordinates of the beginning and the end of the route line
            const routeCoordinates = routeLine.geometry.getCoordinates();
            const startPoint = routeCoordinates[0];
            const endPoint = routeCoordinates[1];

            // Find the middle coordinate of the route line
            const middlePoint = [
                (startPoint[0] + endPoint[0]) / 2,
                (startPoint[1] + endPoint[1]) / 2
            ];

            // Creating a marker for the departure point
            const departureMarker = new window.ymaps.Placemark(departurePoint, { iconCaption: 'Paris' }, { preset: 'islands#dotIcon' });
            const destinationMarker = new window.ymaps.Placemark(destinationPoint, { iconCaption: 'New-York' }, { preset: 'islands#dotIcon' });

            // Adding an image of a plane as an icon
            const planeIcon = new window.ymaps.Placemark(middlePoint, {}, {
                iconLayout: 'default#image',
                iconImageHref: plane,
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -20]
            });

            // Adding all created items to the map
            myMap.geoObjects.add(routeLine);
            myMap.geoObjects.add(departureMarker);
            myMap.geoObjects.add(destinationMarker)
            myMap.geoObjects.add(planeIcon);

            myMap.controls.get('trafficControl').options.set('visible', false)
            myMap.controls.get('searchControl').options.set('visible', false);
            myMap.controls.get('typeSelector').options.set('visible', false);
            myMap.controls.get('rulerControl').options.set('visible', false);
            myMap.controls.get('geolocationControl').options.set('visible', false);
        });
    };
    // const displayBaggageInfo = (isAvailable) => {
    //     var baggageElement = document.querySelector('.baggage_included')
    //
    //     if(baggageElement){
    //         if(isAvailable){
    //             baggageElement.innerHTML = '<i class="bx bxs-shopping-bags" style="color: green;"></i><p>Baggage: 30 kg per passenger</p>'
    //         } else{
    //             baggageElement.innerHTML = '<i class="bx bxs-shopping-bags" style="color: red;"></i><p>Luggage is not available</p>'
    //         }
    //     } else {
    //         console.error('Element with class "baggage_included" not found.')
    //     }
    //
    // };

    const handleExportToExcel = () => {
        const fileName = 'flight_details.xlsx';
        const excelData = [
            {
                'Departure Details': `Time: ${data.departureAirport.time}, Date: ${data.departureAirport.time}, Country / City: ${data.departureAirport.country.label} - ${data.departureAirport.city}, Airport: ${data.departureAirport.label}`,
                'Destination Details': `Date: ${data.arrivalAirport.time}, Time: ${data.arrivalAirport.time}, Country / City: ${data.arrivalAirport.country.label} - ${data.arrivalAirport.city}, Airport: ${data.arrivalAirport.label}`,
            },
        ];

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    };

    const saveAs = (blob, fileName) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    return (
        <div className="App">
            {/* Your JSX code here */}
            <div className="navigation">
                <div className="rightSideNavPanel">
                    <a href="/">Main Window</a>
                    <br/>
                    <a href="/booking">Tickets</a>
                    <br/>
                    <a href="###">Hotels</a>

                    <a href="/authorization" className="regAndAuth">Authorization</a>
                    <a href="/registration" className="regAndAuth">Registration</a>
                </div>
            </div>

            {fillInTheData(data)}
        </div>
    );
};

export default TicketDetails;
