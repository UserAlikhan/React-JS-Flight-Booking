import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './styles/authorization.css'
import {jwtDecode} from "jwt-decode";
// import 'bootstrap/dist/css/bootstrap.min.css'
const Authorization = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    async function getUserRole() {
        try{
            const userRole = await axios.get(`http://127.0.0.1:8000/role/${email}`)
            setRole(userRole.data[0].role)
            // return userRole

        } catch (error) {
            console.error('Login error ', error)
        }
    }

    useEffect(() => {
        getUserRole()
    }, [email]);
    async function handleLogin () {
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                email, password
            })

            // const role = getUserRole()
            console.log('Role ', role)

            if (role === 'admin'){
                console.log('Admin!!!')
            } else {
                console.log('USER!!!')
            }

            console.log('Response ',response.data)

            const token  = response.data

            localStorage.setItem('token', token)

            const tokenC = localStorage.getItem('token')
            const decodeToken = jwtDecode(tokenC)

            console.log('TokenC ', decodeToken)

            // navigate('/')
        } catch (error){
            console.error('Login error ', error)
        }
    }

    return (
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{height: 'auto', width: '550px', borderRadius: '1rem'}}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" className="form-control form-control-lg"
                                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" className="form-control form-control-lg"
                                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                                </div>

                                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleLogin}>Login</button>

                                <div className="d-flex justify-content-center text-center mt-4 pt-1">

                                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                </div>

                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <a href="/registration" className="text-white-50 fw-bold">Sign Up</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authorization