import React, {useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios"
import '../styles/addAirline.css'

const UpdateUsers = () =>{

    const [User, setUser] = useState({
        Name: '',
        Lastname: '',
        Email: '',
        Password: ''
    })

    const navigate= useNavigate()
    const location = useLocation()

    const UserId = location.pathname.split('/')[2]

    function updateState(prev, e) {
        const updatedState = Object.assign({}, prev)

        if (e.target.value !== ""){
            updatedState[e.target.name] = e.target.value
        }

        return updatedState
    }

    function handleChange(e){
        const UpdateState = updateState(User, e)
        setUser(UpdateState)
    }

    async function handleClick(){
        try{
            await axios.put('http://localhost:8000/adminUsers/' + UserId, User)
            navigate('/AdminUsers')
        } catch (error){
            console.error(error)
        }
    }

    return (
        <div className="form">
            <div className="coverAirline">
                <h1>Update User</h1>
                <input type="text" placeholder="Name" onChange={handleChange} name="Name"/>
                <input type="text" placeholder="Lastname" onChange={handleChange} name="Lastname"/>
                <input type="email" placeholder="Email" onChange={handleChange} name="Email"/>
                <input type="text" placeholder="Password" onChange={handleChange} name="Password"/>
                <button className="formButton" onClick={handleClick}>Update</button>
            </div>
        </div>
    )
}
export default UpdateUsers