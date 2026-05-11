import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Member"
    });

    const signupUser = async () => {

        try {

            await axios.post(
                "https://team-task-manager-production-a903.up.railway.app/api/auth/signup",
                formData
            );

            alert("Signup Successful");

            navigate("/");

        } catch (error) {

            alert("Signup Failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-2xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
                    Create Account
                </h1>

                <input
                    placeholder="Name"
                    className="w-full p-3 border rounded-lg mb-4"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg mb-4"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg mb-4"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value
                        })
                    }
                />

                <select
                    className="w-full p-3 border rounded-lg mb-4"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            role: e.target.value
                        })
                    }
                >

                    <option>Member</option>
                    <option>Admin</option>

                </select>

                <button
                    onClick={signupUser}
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
                >
                    Signup
                </button>

            </div>

        </div>

    );

}

export default Signup;