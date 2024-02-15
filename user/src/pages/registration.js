// import React, {useState} from "react";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
// import {response} from "express";
//
// const Registration = () => {
//
//   const [name, setName] = useState('')
//   const [lastname, setLastname] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//
//   const handleRegister = () => {
//     axios.post('http://localhost:8000/addNewData/register', {name, lastname, email, password})
//         .then(response => {
//           console.log('Response data ', response.data)
//         })
//         .catch(error => {
//           console.error('Registration error ', error)
//         })
//   }
//
//   return (
//         <div className="container h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//               <div className="card bg-dark text-white" style={{height: 'auto', width: '550px' ,borderRadius: '1rem'}}>
//                 <div className="card-body p-5 text-center">
//
//                   <div className="mb-md-5 mt-md-4 pb-5">
//
//                     <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
//                     <p className="text-white-50 mb-5">Please enter your login and password!</p>
//
//                     <div className="form-outline form-white mb-4">
//                       <input type="password" id="typePasswordX" className="form-control form-control-lg" />
//                       <label className="form-label" htmlFor="typePasswordX">Name</label>
//                     </div>
//
//                     <div className="form-outline form-white mb-4">
//                       <input type="password" id="typePasswordX" className="form-control form-control-lg" />
//                       <label className="form-label" htmlFor="typePasswordX">LastName</label>
//                     </div>
//
//                     <div className="form-outline form-white mb-4">
//                       <input type="email" id="typeEmailX" className="form-control form-control-lg" />
//                       <label className="form-label" htmlFor="typeEmailX">Email</label>
//                     </div>
//
//                     <div className="form-outline form-white mb-4">
//                       <input type="password" id="typePasswordX" className="form-control form-control-lg" />
//                       <label className="form-label" htmlFor="typePasswordX">Password</label>
//                     </div>
//
//                     <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleRegister}>Sign Up</button>
//
//                     <div className="d-flex justify-content-center text-center mt-4 pt-1">
//
//                       <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
//                     </div>
//
//                   </div>
//
//                   <div>
//                     <p className="mb-0">Do you have an account? <a href="authorization.html" className="text-white-50 fw-bold">Sign In</a>
//                     </p>
//                   </div>
//
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//     )
// }
//
// export default Registration

import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './styles/authorization.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
const Registration = () => {

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleRegister() {
        axios.post('http://localhost:8000/register', {name, lastname, email, password})
            .then(response => {
                console.log('Response data ', response.data)
        })
            .catch(error => {
                console.error('Registration error ', error)
        })
    }

    return (
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{height: 'auto', width: '550px' ,borderRadius: '1rem'}}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                <div className="form-outline form-white mb-4">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                           id="typePasswordX" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typePasswordX">Name</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}
                                           id="typePasswordX" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typePasswordX">LastName</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                           id="typeEmailX" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                           id="typePasswordX" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                                </div>

                                <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleRegister}>Sign Up</button>

                                <div className="d-flex justify-content-center text-center mt-4 pt-1">

                                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                </div>

                            </div>

                            <div>
                                <p className="mb-0">Do you have an account? <a href="/authorization" className="text-white-50 fw-bold">Sign In</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration