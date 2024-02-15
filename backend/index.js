const express = require('express')
const fs = require('fs')
const cors = require('cors')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const adminIndex = require('./adminIndex.cjs')

const jwt= require('jsonwebtoken')

const app = express()
const port = 8000

app.use(cors())

app.use(bodyParser.json())
// app(bodyParser.urlencoded({extended: true}))

// app.get('/saveData', (req, res) => {
//     res.json('DATA!')
// })

app.post('/saveData', (req, res) => {
    const jsonData = JSON.stringify(req.body, null, 2)

    fs.writeFile('output.json', jsonData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Internal Server Error');
        } else{
            console.log('Data written to output.json')
            res.send('Data written to output.json')
        }
    })
})

app.post('/addNewData', async (req, res) => {
    try{
        const existingData = await fs.promises.readFile('newFile.json', 'utf-8')
        const parsedData = JSON.parse(existingData)

        // const newData = JSON.stringify(req.body, null, 2)
        const newData = req.body

        parsedData.push(newData)

        const updatedData = JSON.stringify(parsedData, null, 2)

        fs.writeFileSync('newFile.json', updatedData)

        console.log('Data written to newFile.json')
    } catch (error) {
        console.error('Error processing data ', error)
    }

})

app.get('/flights', async (req, res) => {
    try {
        const data = fs.readFileSync('file.json', 'utf8');
        dataset = JSON.parse(data);
        res.json(dataset);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to read or parse JSON data' });
    }
});

app.get('/getFlight/:id', function (req, res){
    const flightId = req.params.id

    try{
        const rawData = fs.readFileSync('file.json')
        const tickets = JSON.parse(rawData)

        const foundTicket = tickets.find((ticket) => ticket.id === flightId)

        if (foundTicket){
            res.json(foundTicket)
        } else{
            res.status(400).json({error: 'Ticket not found'})
        }

    } catch(error){
        console.error('Error reading JSON file ', error)
    }
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'AccontingAirTickets'
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed ', err)
    } else {
        console.log('Connected to the database')
    }
})

app.post('/register', (req, res) => {

    console.log(req.body)
    const {name, lastname, email, password} = req.body

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password ', err)
            res.status(500).send('Internal Server Error')
        } else {
            console.log('Password hashed successfully')
        }

        const sqlQuery = 'insert into People(Name, Lastname, Email, Password) values(?, ?, ?, ?);'

        db.query(sqlQuery, [name, lastname, email, hash], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('User registered successfully');
                res.status(200).send('Registration successful');
            }
        })
    })
})

app.post('/login', (req, res) => {
    try{
        const {email, password} = req.body

        const sqlQuery = 'select * from people where Email = ?;'

        db.query(sqlQuery, [email], (err, result) => {
            if (err){
                console.error('Error checking user credentials: ', err)
                res.status(500).send('Internal Server Error')
            }

            if (result.length === 0) {
                res.status(401).json({error: 'Invalid email or password'})
            }

            const user = result[0]

            bcrypt.compare(password, user.Password, (compareError, passwordMatch) => {
                if (compareError){
                    console.error('Error comparing passwords ', compareError)
                    res.status(500).send('Internal Server error')
                }

                if(!passwordMatch){
                    res.status(401).json({error : 'Invalid email or password'})
                }

                // создание токена
                const token = jwt.sign({userId : user.id, email: user.Email, roleUser: user.role}, 'your_secret_key', {'expiresIn': '1h'})
                console.log(token)
                // res.status(200).json({ token })
                res.json(token)
            })

        })
    } catch (error){
        console.log('Error login ', error)
    }
})

app.get('/role/:email', (req, res) => {
    const query = 'select role from People where Email = ?'
    const email = req.params.email

    db.query(query, email, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get('/dataset', (req, res) => {
    try{
        const rawData = fs.readFileSync('file.json', 'utf-8')
        const data = JSON.parse(rawData)

        res.json(data)

    } catch (error){
        console.error('Error reading file.json ', error)
    }
})

app.post('/favorites', (req, res) => {
    try {
        const {Flight, PeopleId} = req.body

        console.log('Flight ', Flight, PeopleId)
        const sqlQuery = 'insert into FavouriteTicket(Ticket, People_id) values(?, ?)'

        db.query(sqlQuery, [Flight, PeopleId], (err, result) => {
            if (err) return res.json(err)
            return res.json('Favorites has been added successfully')
        })
    } catch (error){
        console.error('Error adding favorites')
    }
})

app.get('/favorites/:id', (req, res) => {

    const PersonId = req.params.id

    try{
        const sqlQuery = 'select * from FavouriteTicket where People_id=?;'

        db.query(sqlQuery, PersonId, (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        })
    } catch (error){
        console.error(error)
    }
})

app.get('/seats', (req, res) => {

    try{
        const sqlQuery = 'select * from Seats;'

        db.query(sqlQuery, (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        })
    } catch (error){
        console.error(error)
    }
})

app.post('/seats', (req, res) => {

    const PeopleId = req.body

    try{
        const sqlQuery = 'insert into Seats(SeatNumber, People_id) values (?, ?)'

        db.query(sqlQuery, PeopleId, (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        })

    } catch (error) {
        console.error(error)
    }
})

app.use('/', adminIndex)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})