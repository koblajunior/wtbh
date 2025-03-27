import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { api, setAuthHeader } from '../api';
import { AuthContext } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import Head from '../components/Head';

const Dashboard = () => {
    // const { logoutUser } = useContext(AuthContext);
    const { user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [workbooks, setWorkBooks] = useState([]);
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
                    setWorkBooks(response.data.workbooks);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };

            fetchCourses();
        }
    }, [user, navigate]);




    return (
        <>
            {courses ? (
                <div className="nk-block-head nk-block-head-sm">
                    <Head title="Dashboard" />
                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h3 className="nk-block-title page-title">Dashboard</h3>
                            <div className="nk-block-des text-soft">
                                <p className="lead">
                                    This course will give you all need to get to work as well as share advice from experts in the publishing field. You will get the inside scoop on editing, publishing, marketing, and branding, as well as how to self-publish your own book.

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="nk-block">
                        <p>&nbsp;</p>
                        <h4 className="title nk-block-title pb-3">
                            Courses
                        </h4>
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

                    <div className="nk-block">
                        <p>&nbsp;</p>
                        <h4 className="title nk-block-title pb-3">
                            Workbook
                        </h4>
                        <div className="row g-gs">
                            {workbooks.map((workbook) => (
                                <div className="col-sm-6 col-lg-4 col-xxl-3" key={workbook.title}>
                                    <div className="card">
                                        <div className="card-inner">
                                            <Link to={`${workbook.url}`} className="card-link lead" target="_blank">{workbook.title}</Link>
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

export default Dashboard;
