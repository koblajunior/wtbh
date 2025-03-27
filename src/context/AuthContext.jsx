import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup, logout as logoutAction } from '../api/auth';
import { loginSuccess, logout } from '../store/authSlice';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    const loginUser = async (email, password) => {
        try {
            const response = await login(dispatch, email, password);

            // Check if the response is valid and contains a successful status
            // console.log(response.status);
            if (response && response.success) {
                // Success case
                return { success: true, message: '' }; // Indicating successful login
            } else {
                // Failure case: Ensure that response and message exist before accessing them
                const errorMessage = response.message || "Unknown error"; // Use message from response
                console.error("Login failed:", errorMessage);

                return { success: false, message: errorMessage };
            }
        } catch (error) {
            // Catching any errors during the login process
            console.error("Login failed:", error);
            return { success: false, message: error.message || "An error occurred." };
        }
    };



    const signupUser = async (name, email, password, confirmPassword) => {
        try {
            // Call the signup function, passing the required parameters
            const response = await signup(dispatch, name, email, password, confirmPassword);

            // Check the response to determine if the signup was successful
            if (response && response.success) {
                // Success case
                return { success: true, message: '' }; // Indicating successful login
            } else {
                // Failure case: Ensure that response and message exist before accessing them
                const errorMessage = response.message || "Unknown error"; // Use message from response
                console.error("Signup failed:", errorMessage);

                return { success: false, message: errorMessage };
            }
        } catch (error) {
            console.error("Signup failed:", error); // Log the error for debugging
            return { success: false, message: error.message || "An error occurred." };
        }
    };



    const logoutUser = async () => {
        try {
            // Call the logout function in `api/auth` to handle backend logout if needed
            const response = await logoutAction(dispatch);

            if (response && response.status === 200) {
                // Success case
                return true; // Indicating successful signup
            } else {
                // Failure case
                console.error("Logout failed:", response);
                return false; // Indicating failure
            }

        } catch (error) {
            console.error('Logout failed:', error.message || error);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginUser,
                signupUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
