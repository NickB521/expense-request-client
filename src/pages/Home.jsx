import { getAllUsers, createUser } from "../services/UserService";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../utils/MyContext";
const Home = () => {
    const { cookies, setCookies } = useContext(MyContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.name) {
            navigate('/logged-in')
        }
    }, [cookies.name]
    )
    return (
        <>
            <div>
                <SignUpForm />
                <LoginForm />
            </div>
        </>
    )
}

export default Home;