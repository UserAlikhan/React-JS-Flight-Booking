import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/adminMain.css'
import AdminSideBar from "./adminSideBar";

const AdminUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/adminUsers')
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.error('Error fetching users ', error)
            })
    }, []);

    console.log('users ', users)

    async function handleDelete(id) {
        try{
            await axios.delete('http://localhost:8000/adminUsers/'+id)
            window.location.reload()
        } catch (error){
            console.error(error)
        }

    }

    return (
        <div className="App">
            <div className='AdminMainCover'>
                <AdminSideBar/>
                <div className="infoWindow">
                    {users.map(user => {
                        return <div className="detailedInfo">
                            <p>{user.Name}</p>
                            <p>{user.Lastname}</p>
                            <p>{user.Email}</p>
                            <p>{user.Password}</p>

                            <div className="buttonsPlace">
                                <input type="button" id="deleteButton" value="delete" onClick={function () {handleDelete(user.id)}}/>
                                <a href={`/adminUpdateUser/${user.id}`}>
                                    <input type="button" id="updateButton" value="update"/>
                                </a>
                            </div>
                        </div>
                    })}

                    <div className="addButtonPlace">
                        <a href="/adminAddUsers">
                            <input type="button" id="addButton"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUsers