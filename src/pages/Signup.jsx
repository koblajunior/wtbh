import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GuestLayout from '../components/GuestLayout';
import Head from '../components/Head';

const Signup = () => {
    const { signupUser } = useContext(AuthContext);
    const [name, setName] = useState('');  // Add state for the name field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Add loading state

    const validatePassword = (password) => {
        // Password must be at least 8 characters long, contain uppercase, lowercase, numbers, and special characters
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check password strength
        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
            );
            return;
        }

        setError(''); // Clear error
        setLoading(true); // Set loading to true when the form is submitted

        // Pass the name, email, password, and confirmPassword
        const { success, message } = await signupUser(name, email, password, confirmPassword);

        setLoading(false); // Set loading to false once the request completes

        // Only navigate if signup is successful
        if (success) {
            navigate('/dashboard'); // Redirect to courses after signup
        } else {
            setError(message);
        }


    };

    const handleLoginNavigation = () => {
        navigate('/login'); // Navigate to login page
    };

    return (
        <div className="card-inner card-inner-lg">
            <Head title="Signup" />
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h4 className="nk-block-title">Sign up</h4>
                    <div className="nk-block-des">
                        <p>Create a new account</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Full name</label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">Email</label>
                    </div>

                    <div className="form-control-wrap">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        {/* <Link className="link link-primary link-sm" href="#">Forgot Password?</Link> */}
                    </div>
                    <div className="form-control-wrap">
                        <Link to="#"
                            className="form-icon form-icon-right passcode-switch lg"
                            data-target="password">
                            <em className="passcode-icon icon-show icon ni ni-eye"></em>
                            <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                        </Link>
                        <input
                            className="form-control form-control-lg"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                        {/* <Link className="link link-primary link-sm" href="#">Forgot Password?</Link> */}
                    </div>
                    <div className="form-control-wrap">
                        <Link to="#"
                            className="form-icon form-icon-right passcode-switch lg"
                            data-target="confirmpassword">
                            <em className="passcode-icon icon-show icon ni ni-eye"></em>
                            <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                        </Link>

                        <input type="password"
                            className="form-control form-control-lg"
                            id="confirmpassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        ></input>
                    </div>
                </div>
                <div className="form-group">
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit" disabled={loading}>
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>
                </div>
                {error &&
                    <div className="example-alert">
                        <div className="alert alert-danger alert-icon">
                            <em className="icon ni ni-cross-circle"></em>
                            <strong>
                                {error}
                            </strong>
                        </div>
                    </div>
                }
            </form>
            <div className="form-note-s2 text-center pt-4">
                Already have an account?&nbsp;
                <Link to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;
