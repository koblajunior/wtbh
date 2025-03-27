import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { api, setAuthHeader } from '../api';
import { AuthContext } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import Head from '../components/Head';

const Courses = () => {
    const { logoutUser } = useContext(AuthContext);
    const { user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Redirect if user is not authenticated
        if (!user) {
            navigate('/login');
        } else {
            setAuthHeader(token);
            const fetchCourses = async () => {
                try {
                    const response = await api.get('/courses');
                    setCourses(response.data.courses);
                } catch (error) {
                    // console.error('Error fetching courses:', error);
                    setError('Failed to load courses.');
                }
            };

            fetchCourses();
        }
    }, [user, navigate]);



    return (
        <>
            {courses ? (
                <div className="nk-block-head nk-block-head-sm">
                    <Head title="Courses" />
                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h3 className="nk-block-title page-title">Courses</h3>
                        </div>
                        <div className="nk-block-head-content">

                            <div className="toggle-wrap nk-block-tools-toggle" >
                                <Link href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu">
                                    <em className="icon ni ni-more-v"></em>
                                </Link>
                                <div className="toggle-expand-content" data-content="pageMenu">
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <button onClick={() => navigate(-1)} className="btn btn-outline-light bg-white d-none d-sm-inline-flex">
                                                <em className="icon ni ni-arrow-left"></em>
                                                <span>Back</span>
                                            </button>
                                        </li>
                                        <li className="nk-block-tools-opt">
                                            <button onClick={() => navigate(`/dashboard`)} className="btn btn-primary">
                                                <em className="icon ni ni-reports"></em>
                                                <span>Dashboard</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nk-block">
                        <p>&nbsp;</p>
                        <div className="row g-gs">
                            {courses.map((course) => (
                                <div className="col-sm-6 col-lg-4 col-xxl-3" key={course.slug}>
                                    <div className="card">
                                        <div className="card-inner">
                                            <Link to={`/courses/${course.slug}`}>
                                                <h5 className="card-title">{course.title}</h5>
                                            </Link>
                                            <Link to={`/courses/${course.slug}`} className="card-link">View Lessons</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="nk-block-head nk-block-head-sm">
                    <div className="nk-block">
                        <div className="nk-block-des">
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">{error || 'Loading...'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Courses;
