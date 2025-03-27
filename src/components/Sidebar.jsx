import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { api, setAuthHeader } from '../api';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const [courses, setCourses] = useState([]);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();

    // Fetch courses and lessons data
    useEffect(() => {
        const fetchCoursesAndLessons = async () => {
            try {
                setAuthHeader(token);
                const response = await api.get('/courses-lessons');
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses and lessons:', error);
                setLoading(false);
            }
        };

        if (token) fetchCoursesAndLessons();
    }, [token]);

    // Dynamically set the expanded course based on the current URL
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const courseSlug = pathParts[2]; // Extract course slug from URL
        const lessonSlug = pathParts[4]; // Extract lesson ID from URL (if available)

        if (courseSlug) {
            setExpandedCourse(courseSlug); // Expand the course in the sidebar
        } else {
            setExpandedCourse(null); // Reset if not on a course or lesson page
        }
    }, [location.pathname]);

    // Toggle expanded course manually
    const handleCourseToggle = (courseSlug) => {
        setExpandedCourse((prev) => (prev === courseSlug ? null : courseSlug));
    };

    return (
        <div className="nk-sidebar nk-sidebar-fixed is-light" data-content="sidebarMenu">
            <div className="nk-sidebar-element nk-sidebar-head">
                <div className="nk-sidebar-brand">
                    <Link to="/" className="logo-link nk-sidebar-logo">
                        <img className="logo-light logo-img" src="/assets/images/logo.png" alt="logo" />
                        <img className="logo-dark logo-img" src="/assets/images/logo-dark.png" alt="logo-dark" />
                        <img className="logo-small logo-img logo-img-small" src="/assets/images/logo-small.png" alt="logo-small" />
                    </Link>
                </div>
                <div className="nk-menu-trigger me-n2">
                    <Link to="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu">
                        <em className="icon ni ni-arrow-left"></em>
                    </Link>
                    <Link to="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu">
                        <em className="icon ni ni-menu"></em>
                    </Link>
                </div>
            </div>
            <div className="nk-sidebar-element">
                <div className="nk-sidebar-content">
                    <div className="nk-sidebar-menu" data-simplebar>
                        <ul className="nk-menu">
                            <li className="nk-menu-item">
                                <Link to="/" className="nk-menu-link">
                                    <span className="nk-menu-icon">
                                        <em className="icon ni ni-dashboard"></em>
                                    </span>
                                    <span className="nk-menu-text">Dashboard</span>
                                </Link>
                            </li>

                            {!loading ? (
                                courses.map((course) => {
                                    const isActiveCourse = expandedCourse === course.slug;

                                    return (
                                        <React.Fragment key={course.slug}>
                                            <li
                                                className={`nk-menu-item has-sub ${isActiveCourse ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCourseToggle(course.slug);
                                                }}
                                            >
                                                <Link to="#" className="nk-menu-link nk-menu-toggle">
                                                    <span className="nk-menu-icon">
                                                        <em className="icon ni ni-book"></em>
                                                    </span>
                                                    <span className="nk-menu-text">{course.title.split(' - ')[0]}</span>
                                                </Link>
                                            </li>

                                            {isActiveCourse && (
                                                <ul className="nk-menu-sub">
                                                    {course.lessons.length > 0 ? (
                                                        course.lessons.map((lesson) => {
                                                            const isActiveLesson =
                                                                location.pathname === `/courses/${course.slug}/lessons/${lesson.lid}`;
                                                            return (
                                                                <li
                                                                    className={`nk-menu-item ${isActiveLesson ? 'active current-page' : ''}`}
                                                                    key={lesson.lid}
                                                                >
                                                                    <Link
                                                                        to={`/courses/${course.slug}/lessons/${lesson.lid}`}
                                                                        className="nk-menu-link"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <span className="nk-menu-text">{lesson.title}</span>
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="nk-menu-sub-loading">No lessons available</div>
                                                    )}
                                                </ul>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <div style={{ padding: '15px' }}>
                                    <Skeleton height={40} count={6} />
                                </div>
                            )}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
