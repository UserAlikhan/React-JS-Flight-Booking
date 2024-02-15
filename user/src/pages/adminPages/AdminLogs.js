import axios from "axios";
import React, {useEffect, useState} from "react";
import '../styles/adminMain.css'
import AdminSideBar from "./adminSideBar";

const AdminLogs = () => {

    const [logs, setLogs] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/logs')
            .then(response => setLogs(response.data))
            .catch(error => console.error('Logs fetching error ', error))
    }, []);

    return (
        <div className="App">
            <div className='AdminMainCover'>
                <AdminSideBar/>
                <div className="changelog">
                    <div className="header">
                        <div>TableName</div>
                        <div>Action</div>
                        <div>Row_id</div>
                        <div>ChangeDate</div>
                    </div>

                    <div className="LogDataContainer">
                        {logs.map(log => (
                            <div className="LogData">
                                <div>{log.TableName}</div>
                                <div>{log.action}</div>
                                <div>{log.row_id}</div>
                                <div>{log.change_date}</div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogs