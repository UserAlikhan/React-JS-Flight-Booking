// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminMain from "./pages/adminPages/adminMain";

const PrivateRoute = ({element: Element, ...rest}) => {
    // Получение токена из local storage
    const token = localStorage.getItem("token");

    // Проверка существует ли токен и не истек ли он
    // if (!token) {
    //     return <Navigate to="/authorization" />;
    // }

    const decodedToken = jwtDecode(token);

    // Проверка роли пользователя
    const isAuthorized = decodedToken.roleUser === "admin"; // Измените на свою логику

    // const userRoles = decodedToken.roleUser;

    // return isAuthorized ? <AdminMain/> : <Navigate to={'/'}/>
    return isAuthorized ? <Element {...rest}/> : <Navigate to={'/'}/>
};

export default PrivateRoute;
