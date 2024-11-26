import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const Loginhost = "http://localhost:8080/api/auth/login";
    const [auth, setAuth] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation: Check if email and password are provided
        if (!auth.email || !auth.password) {
            props.showAlert("Please fill in all fields", "danger");
            return;
        }

        try {
            const response = await fetch(Loginhost, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(auth),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // Save the token to localStorage
            localStorage.setItem("authtoken", data.token);
            props.showAlert("Login successful!", "success");

            // Navigate to the home page or any other page
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            props.showAlert("Invalid credentials, please try again", "danger");
        }
    };

    const onChange = (e) => {
        setAuth({ ...auth, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f4f4f4' }}>
                <div className="container p-5 rounded-5 shadow " style={{ width: '600px',height: '400px', backgroundColor: 'white' }}>
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="email"
                                value={auth.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                value={auth.password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
