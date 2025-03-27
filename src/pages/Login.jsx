import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { api, setAuthHeader } from '../api';
import { useSelector } from 'react-redux';
import GuestLayout from '../components/GuestLayout';
import Head from '../components/Head';

const Login = () => {
    const { user, token } = useSelector((state) => state.auth);
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state


    useEffect(() => {
        // Redirect if user is not authenticated
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(''); // Clear error
        setLoading(true); // Set loading to true when the form is submitted

        // Call the loginUser function and await the result
        const { success, message } = await loginUser(email, password);

        setLoading(false); // Set loading to false once the request completes

        if (success) {
            navigate('/dashboard'); // Redirect to courses after successful login
        } else {
            // Display the error message if login fails
            setError(message);
        }
    };

    const handleSignupNavigation = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    return ( 
        <div className="nk-app-root">
              <Head title="Login" />
            <div className="nk-main">
                <div className="nk-wrap nk-wrap-nosidebar">
                    <div className="nk-content">
                        <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                            <div className="brand-logo pb-4 text-center">
                                <Link href="html/index.html" className="logo-link">
                                    <img className="logo-light logo-img logo-img-lg" src="/assets/images/logo.png" alt="logo" />
                                    <img className="logo-dark logo-img logo-img-lg" src="/assets/images/logo-dark.png" alt="logo-dark" />
                                </Link>
                            </div>
                            <div className="card">
                                <div className="card-inner card-inner-lg">
                                  
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">Sign-In</h4>
                                            <div className="nk-block-des">
                                                <p>Sign in with your email and password.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">Email</label>
                                            </div>
                                            <div className="form-control-wrap">
                                                <input
                                                    className="form-control form-control-lg"
                                                    id="default-01"
                                                    placeholder="Enter your email address"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="l_password">Password</label>
                                                {/* <Link className="link link-primary link-sm" href="#">Forgot Password?</Link> */}
                                            </div>
                                            <div className="form-control-wrap">
                                                <Link to="#" className="form-icon form-icon-right passcode-switch lg" data-target="l_password">
                                                    <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                                    <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                                </Link>
                                                <input
                                                    type="password"
                                                    id="l_password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                className="btn btn-lg btn-primary btn-block"
                                                type="submit" disabled={loading}>
                                                {loading ? 'Signing in...' : 'Sign in'}
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
                                        New on our platform? &nbsp;
                                        <Link to="/signup">
                                            Create an account
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
