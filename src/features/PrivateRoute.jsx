import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authReducer";

const PrivateRoute = ({ children }) => {
    const token = useSelector(selectCurrentToken);
    const isauth = () => {
        if (token) {
            return true;
        }
        return false;
    };
    const authed = isauth();
    return authed ? children : <Navigate to="/" />
}

export default PrivateRoute;