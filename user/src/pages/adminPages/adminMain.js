import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/adminMain.css'
import AdminSideBar from "./adminSideBar";

const AdminMain = () => {

    return (
        <div className="App">
            <div className='AdminMainCover'>
                <AdminSideBar/>
                <p style={{position:"fixed", top:'15%', right: '40%', fontSize: '36px'}}>Выберите категорию</p>
            </div>
        </div>
    )
}

export default AdminMain