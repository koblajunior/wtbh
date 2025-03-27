import React from "react";
import { Link, Outlet } from "react-router-dom";

const GuestLayout = () => {
    return (
        <div className="nk-app-root">
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
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestLayout;
