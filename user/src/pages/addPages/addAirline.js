import React, {useState} from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/addAirline.css'

const AddAirline = () => {

    const [airlineParameters, setAirlineParameters] = useState({
        AirlineName: ""
    })

    const navigate = useNavigate()
    function updateState(prev, e){
        return Object.assign({}, prev, {[e.target.name]: [e.target.value]})
    }
    function handleChange(e) {
        const updatedState = updateState(airlineParameters, e)
        setAirlineParameters(updatedState)
    }
    async function handleClick(e) {
        e.preventDefault()
        try{
            await axios.post('http://localhost:8000/adminAirlines', airlineParameters)
            navigate('/adminAirlines')
        } catch (error){
            console.error(error)
        }
    }

    return (
        <div className="form">
            <div className="coverAirline">
                <h1>Add New Airline</h1>
                <input type="Airline Name" placeholder="title" onChange={handleChange} name="AirlineName"/>
                <button className="formButton" onClick={handleClick}>Add</button>
            </div>
        </div>
    )
}

export default AddAirline