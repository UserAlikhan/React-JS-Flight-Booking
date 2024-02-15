import React, {useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios"
import '../styles/addAirline.css'

const UpdateAirlines = () =>{

    const [Airline, setAirline] = useState({
        AirlineName: ''
    })

    const navigate = useNavigate()
    const location = useLocation()

    const AirlineId = location.pathname.split('/')[2]

    function updateState(prev, e) {
        const updatedState = Object.assign({}, prev)

        if (e.target.value !== ""){
            updatedState[e.target.name] = e.target.value
        }

        return updatedState
    }

    function handleChange(e){
        const UpdateState = updateState(Airline, e)
        setAirline(UpdateState)
    }

    async function handleClick(){
        try{
            await axios.put('http://localhost:8000/adminAirlines/' + AirlineId, Airline)
            navigate('/adminAirlines')
        } catch (error){
            console.error(error)
        }
    }

    return (
        <div className="form">
            <div className="coverAirline">
                <h1>Update Airline</h1>
                <input type="text" placeholder="Airline Name" onChange={handleChange} name="AirlineName"/>
                <button className="formButton" onClick={handleClick}>Update</button>
            </div>
        </div>
    )
}
export default UpdateAirlines