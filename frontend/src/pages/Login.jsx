import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            alert("Login Failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-2xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    Team Task Manager
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={loginUser}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/signup")}
                    className="w-full mt-3 border border-blue-600 text-blue-600 p-3 rounded-lg"
                >
                    Create Account
                </button>

            </div>

        </div>

    );

}

export default Login;