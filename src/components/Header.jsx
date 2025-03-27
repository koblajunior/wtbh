import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { logoutUser } = useContext(AuthContext);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogout = async (e) => {
        e.preventDefault();
        setError(''); // Clear error 

        const logoutSuccess = await logoutUser();

        if (logoutSuccess) {
            navigate('/login'); // Redirect to login page
        } else {
            setError('Logout failed. Please try again.');
        }
    };

    return (
        <div className="nk-header nk-header-fixed is-light">
            <div className="container-fluid">
                <div className="nk-header-wrap">
                    <div className="nk-menu-trigger d-xl-none ms-n1">
                        <Link to="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu">
                            <em className="icon ni ni-menu"></em>
                        </Link>
                    </div>
                    <div className="nk-header-brand d-xl-none">
                        <Link to="/" className="logo-link">
                            <img className="logo-light logo-img" src="/assets/images/logo.png" alt="logo" />
                            <img className="logo-dark logo-img" src="/assets/images/logo-dark.png" alt="logo-dark" />
                        </Link>
                    </div>
                    <div className="nk-header-tools">
                        <ul className="nk-quick-nav">
                            <li className="dropdown user-dropdown">
                                <a href="#" className="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                                    <div className="user-toggle">
                                        <div className="user-avatar sm">
                                            <em className="icon ni ni-user-alt"></em>
                                        </div>
                                        <div className="user-info d-none d-xl-block">
                                            <div className="user-name dropdown-indicator">
                                                {user?.name || 'User'}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
                                    <div className="dropdown-inner">
                                        <ul className="link-list">
                                            <li>
                                                <Link onClick={handleLogout}>
                                                    <em className="icon ni ni-signout"></em>
                                                    <span>Sign out</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
