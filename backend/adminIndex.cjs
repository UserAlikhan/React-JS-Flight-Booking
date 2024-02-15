const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'AccontingAirTickets'
})

const router = express.Router()

router.get('/adminAirlines', (req, res) => {
    const q = 'select * from Airlines'

    db.query(q, (err, data) => {
        if (err){
            return res.json('Error adminAirlnes')
        } else {
            res.json(data)
        }
    })
})

router.post('/adminAirlines', (req, res) => {
    const q = 'INSERT INTO Airlines (`AirlineName`) VALUES (?);'

    const values = [req.body.AirlineName]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json('Airline has been added successfully!')
    })
})

router.delete('/adminAirlines/:id', (req, res) => {
    const AirlineId = req.params.id
    const q = 'delete from Airlines where id=?;'

    db.query(q, [AirlineId], (err, data) => {
        if (err) return res.json(err)
        return res.json('Airline has been deleted successfully!')
    })
})

router.put('/adminAirlines/:id', (req, res) => {
    const AirlineId = req.params.id
    const q = 'update Airlines set `AirlineName`=? where id=?;'

    const values = [
        req.body.AirlineName
    ]

    const params = values.concat(AirlineId)

    db.query(q, params, (err, data) => {
        if (err) return res.json(err)
        return res.json('Airline has been updated successfully!')
    })
})
// Admin Users
router.get('/adminUsers', (req, res) => {
    const q = 'select * from People'

    db.query(q, (err, data) => {
        if (err){
            return res.json('Error adminUsers')
        } else {
            res.json(data)
        }
    })
})

router.post('/adminUsers', (req, res) => {

    const {Name, Lastname, Email, Password} = req.body

    console.log('Req body ', Name[0], Lastname, Email, Password)

    bcrypt.hash(Password[0], 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password ', err)
            res.status(500).send('Internal Server Error')
        } else {
            console.log('Password hashed successfully')
        }

        const q = 'insert into People(Name, Lastname, Email, Password) values(?, ?, ?, ?);'

        db.query(q, [Name[0], Lastname[0], Email[0], hash], (err, data) => {
            if (err) return res.json(err)
            return res.json('User has been added successfully!')
        })

    })
})

router.delete('/adminUsers/:id', (req, res) => {
    const UserId = req.params.id
    const q = 'delete from People where id=?;'

    db.query(q, [UserId], (err, data) => {
        if (err) return res.json(err)
        return res.json('User has been deleted successfully!')
    })
})

router.put('/adminUsers/:id', (req, res) => {
    const userId = req.params.id;

    // Get the existing user data from the database
    const getUserQuery = 'SELECT * FROM People WHERE id = ?';

    db.query(getUserQuery, [userId], (error, result) => {
        if (error) {
            console.error('Error fetching user data: ', error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 0) {
            return res.status(404).send('User not found');
        }

        // Use the existing data as a base
        const existingUserData = result[0];

        // Extract values from the request body or use existing values if not provided
        const updatedName = req.body.Name || existingUserData.Name;
        const updatedLastname = req.body.Lastname || existingUserData.Lastname;
        const updatedEmail = req.body.Email || existingUserData.Email;

        // Check if the password is provided, and hash it if necessary
        const updatedPassword = req.body.Password
            ? bcrypt.hashSync(req.body.Password, 10)
            : existingUserData.Password;

        // Update the user in the database
        const updateQuery = 'UPDATE People SET Name=?, Lastname=?, Email=?, Password=? WHERE id=?';

        const params = [updatedName, updatedLastname, updatedEmail, updatedPassword, userId];

        db.query(updateQuery, params, (err, data) => {
            if (err) {
                console.error('Error updating user: ', err);
                return res.status(500).send('Internal Server Error');
            }

            return res.json('User has been updated successfully!');
        });
    });
});

// Admin Airports
router.get('/adminAirports', (req, res) => {
    const q = 'select * from Airports';

    db.query(q, (err, data) => {
        if (err) {
            return res.json('Error adminAirports');
        } else {
            res.json(data);
        }
    });
});

// Add a new airport
router.post('/adminAirports', (req, res) => {
    const { City, Country } = req.body;

    const q = 'insert into Airports(City, Country) values(?, ?);';

    db.query(q, [City, Country], (err, data) => {
        if (err) return res.json(err);
        return res.json('Airport has been added successfully!');
    });
});

// Delete an airport
router.delete('/adminAirports/:id', (req, res) => {
    const airportId = req.params.id;
    const q = 'delete from Airports where id=?;';

    db.query(q, [airportId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Airport has been deleted successfully!');
    });
});

// Update an airport
router.put('/adminAirports/:id', (req, res) => {
    const airportId = req.params.id;

    // Get the existing airport data from the database
    const getAirportQuery = 'SELECT * FROM Airports WHERE id = ?';

    db.query(getAirportQuery, [airportId], (error, result) => {
        if (error) {
            console.error('Error fetching airport data: ', error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 0) {
            return res.status(404).send('Airport not found');
        }

        // Use the existing data as a base
        const existingAirportData = result[0];

        // Extract values from the request body or use existing values if not provided
        const updatedCity = req.body.City || existingAirportData.City;
        const updatedCountry = req.body.Country || existingAirportData.Country;

        // Update the airport in the database
        const updateQuery = 'UPDATE Airports SET City=?, Country=? WHERE id=?';

        const params = [updatedCity, updatedCountry, airportId];

        db.query(updateQuery, params, (err, data) => {
            if (err) {
                console.error('Error updating airport: ', err);
                return res.status(500).send('Internal Server Error');
            }

            return res.json('Airport has been updated successfully!');
        });
    });
});

// Admin Flights
router.get('/adminFlights', (req, res) => {
    const q = 'SELECT Flights.id, Flights.DepartureTime, Flights.DepartureDate, Flights.ArrivalTime, Flights.ArrivalDate, Airline_id, Departure_Airport_id, \n' +
        'Arrival_Airport_id, ar.AirlineName AS AirlineName, Airports.City AS DepartureAirport, a.City AS ArrivalAirport FROM Flights \n' +
        'INNER JOIN Airports ON Flights.Departure_Airport_id = Airports.id \n' +
        'LEFT JOIN Airlines ar on Flights.Airline_id = ar.id\n' +
        'LEFT JOIN Airports a ON Flights.Arrival_Airport_id = a.id;';

    db.query(q, (err, data) => {
        if (err) {
            return res.json('Error adminFlights');
        } else {
            res.json(data);
        }
    });
});

// Add a new flight
router.post('/adminFlights', (req, res) => {
    const { DepartureTime, DepartureDate, ArrivalTime, ArrivalDate, Airline_id, Departure_Airport_id, Arrival_Airport_id } = req.body;

    const q = 'INSERT INTO Flights (DepartureTime, DepartureDate, ArrivalTime, ArrivalDate, Airline_id, Departure_Airport_id, Arrival_Airport_id) VALUES (?, ?, ?, ?, ?, ?, ?);';

    db.query(q, [DepartureTime, DepartureDate, ArrivalTime, ArrivalDate, Airline_id, Departure_Airport_id, Arrival_Airport_id], (err, data) => {
        if (err) return res.json(err);
        return res.json('Flight has been added successfully!');
    });
});

// Delete a flight
router.delete('/adminFlights/:id', (req, res) => {
    const flightId = req.params.id;
    const q = 'DELETE FROM Flights WHERE id=?;';

    db.query(q, [flightId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Flight has been deleted successfully!');
    });
});

// Update a flight
router.put('/adminFlights/:id', (req, res) => {
    const flightId = req.params.id;

    // Get the existing flight data from the database
    const getFlightQuery = 'SELECT * FROM Flights WHERE id = ?';

    db.query(getFlightQuery, [flightId], (error, result) => {
        if (error) {
            console.error('Error fetching flight data: ', error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 0) {
            return res.status(404).send('Flight not found');
        }

        // Use the existing data as a base
        const existingFlightData = result[0];

        // Extract values from the request body or use existing values if not provided
        const updatedDepartureTime = req.body.DepartureTime || existingFlightData.DepartureTime;
        const updatedDepartureDate = req.body.DepartureDate || existingFlightData.DepartureDate;
        const updatedArrivalTime = req.body.ArrivalTime || existingFlightData.ArrivalTime;
        const updatedArrivalDate = req.body.ArrivalDate || existingFlightData.ArrivalDate;
        const updatedAirlineId = req.body.Airline_id || existingFlightData.Airline_id;
        const updatedDepartureAirportId = req.body.Departure_Airport_id || existingFlightData.Departure_Airport_id;
        const updatedArrivalAirportId = req.body.Arrival_Airport_id || existingFlightData.Arrival_Airport_id;

        // Update the flight in the database
        const updateQuery = 'UPDATE Flights SET DepartureTime=?, DepartureDate=?, ArrivalTime=?, ArrivalDate=?, Airline_id=?, Departure_Airport_id=?, Arrival_Airport_id=? WHERE id=?';

        const params = [updatedDepartureTime, updatedDepartureDate, updatedArrivalTime, updatedArrivalDate, updatedAirlineId, updatedDepartureAirportId, updatedArrivalAirportId, flightId];

        db.query(updateQuery, params, (err, data) => {
            if (err) {
                console.error('Error updating flight: ', err);
                return res.status(500).send('Internal Server Error');
            }

            return res.json('Flight has been updated successfully!');
        });
    });
});

// Admin Bookings
// Get all bookings with detailed information
router.get('/adminBookings', (req, res) => {

    const q = 'SELECT \n' +
        '    Booking.id,\n' +
        '    People_id,\n' +
        '    Flights_id,\n' +
        '    BookingDate,\n' +
        '    BookingTime,\n' +
        '    SeatNumber,\n' +
        '    People.Name AS PersonName,\n' +
        '    Flights.DepartureTime,\n' +
        '    Flights.DepartureDate,\n' +
        '    Flights.ArrivalTime,\n' +
        '    Flights.ArrivalDate,\n' +
        '    Airline_id,\n' +
        '    Departure_Airport_id,\n' +
        '    Arrival_Airport_id,\n' +
        '    ar.AirlineName AS AirlineName,\n' +
        '    Airports.City AS DepartureAirport,\n' +
        '    a.City AS ArrivalAirport\n' +
        'FROM Booking\n' +
        'INNER JOIN People ON Booking.People_id = People.id\n' +
        'INNER JOIN Flights ON Booking.Flights_id = Flights.id\n' +
        'INNER JOIN Airports ON Flights.Departure_Airport_id = Airports.id\n' +
        'LEFT JOIN Airlines ar ON Flights.Airline_id = ar.id\n' +
        'LEFT JOIN Airports a ON Flights.Arrival_Airport_id = a.id;'

    db.query(q, (err, data) => {
        if (err) {
            return res.json('Error adminBookings');
        } else {
            res.json(data);
        }
    });
});

// Add a new booking
router.post('/adminBookings', (req, res) => {
    const { People_id, Flights_id, BookingDate, BookingTime, SeatNumber } = req.body;

    console.log('Admin Booking: ', People_id, Flights_id, BookingDate, BookingTime, SeatNumber)

    const q = 'INSERT INTO Booking (People_id, Flights_id, BookingDate, BookingTime, SeatNumber) VALUES (?, ?, ?, ?, ?);';

    db.query(q, [People_id, Flights_id, BookingDate, BookingTime, SeatNumber], (err, data) => {
        if (err) return res.json(err);
        return res.json('Booking has been added successfully!');
    });
});

// Delete a booking
router.delete('/adminBookings/:id', (req, res) => {
    const bookingId = req.params.id;
    console.log('BookingId ', bookingId)
    const q = 'delete from Booking where id = ?;'

    db.query(q, [bookingId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Booking has been deleted successfully!');
    });
});

// Update a booking
router.put('/adminBookings/:id', (req, res) => {
    const bookingId = req.params.id;

    // Get the existing booking data from the database
    const getBookingQuery = 'SELECT * FROM Booking WHERE id = ?';

    db.query(getBookingQuery, [bookingId], (error, result) => {
        if (error) {
            console.error('Error fetching booking data: ', error);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length === 0) {
            return res.status(404).send('Booking not found');
        }

        // Use the existing data as a base
        const existingBookingData = result[0];

        // Extract values from the request body or use existing values if not provided
        const updatedPeopleId = req.body.People_id || existingBookingData.People_id;
        const updatedFlightsId = req.body.Flights_id || existingBookingData.Flights_id;
        const updatedSeatNumber = req.body.SeatNumber || existingBookingData.SeatNumber;
        const updatedBookingDate = req.body.BookingDate || existingBookingData.BookingDate;
        const updatedBookingTime = req.body.BookingTime || existingBookingData.BookingTime;

        // Update the booking in the database
        const updateQuery = 'UPDATE Booking SET People_id=?, Flights_id=?, BookingDate=?, BookingTime=?, SeatNumber=? WHERE id=?';

        const params = [updatedPeopleId, updatedFlightsId, updatedBookingDate, updatedBookingTime, updatedSeatNumber, bookingId];

        db.query(updateQuery, params, (err, data) => {
            if (err) {
                console.error('Error updating booking: ', err);
                return res.status(500).send('Internal Server Error');
            }

            return res.json('Booking has been updated successfully!');
        });
    });
});

router.get('/logs', (req, res) => {

    const sqlQuery = 'select * from ChangeLog;'

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json('Error Logs');
        } else {
            res.json(data);
        }
    });
})


module.exports = router;



module.exports = router