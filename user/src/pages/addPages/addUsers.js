import React, {useState} from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/addAirline.css'

const AddUsers = () => {

    const [userParameters, setUserParameters] = useState({
        Name: "",
        Lastname: "",
        Email: "",
        Password: ""
    })

    const navigate = useNavigate()
    function updateState(prev, e){
        return Object.assign({}, prev, {[e.target.name]: [e.target.value]})
    }
    function handleChange(e) {
        const updatedState = updateState(userParameters, e)
        setUserParameters(updatedState)
    }
    async function handleClick(e) {
        e.preventDefault()
        try{
            await axios.post('http://localhost:8000/adminUsers', userParameters)
            navigate('/adminUsers')
        } catch (error){
            console.error(error)
        }
    }

    return (
        <div className="form">
            <div className="coverAirline">
                <h1>Add New User</h1>
                <input type="text" placeholder="Name" onChange={handleChange} name="Name"/>
                <input type="text" placeholder="Lastname" onChange={handleChange} name="Lastname"/>
                <input type="email" placeholder="Email" onChange={handleChange} name="Email"/>
                <input type="password" placeholder="Password" onChange={handleChange} name="Password"/>
                <button className="formButton" onClick={handleClick}>Add</button>
            </div>
        </div>
    )
}

export default AddUsers