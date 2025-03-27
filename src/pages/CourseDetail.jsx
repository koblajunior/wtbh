import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api, setAuthHeader } from '../api';
import { AuthContext } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import Head from '../components/Head';

const CourseDetail = () => {
    const { logoutUser } = useContext(AuthContext);
    const { user, token } = useSelector((state) => state.auth);
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if user is not authenticated
        if (!user) {
            navigate('/login');
        } else {
            setAuthHeader(token);
            const fetchCourse = async () => {
                try {
                    const response = await api.get(`/courses/${slug}`);
                    setCourse(response.data);

                } catch (error) {
                    setError('Failed to load course details.');
                }
            };

            fetchCourse();
        }
    }, [slug, user, token, navigate]);




    return (
        <>
            {course ? (
                <div className="nk-block-head nk-block-head-sm">
                    <Head title={!course ? "Course" : course.title} />
                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h3 className="nk-block-title page-title">{course.title}</h3>
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
                                            <button onClick={() => navigate(`/courses`)} className="btn btn-primary">
                                                <em className="icon ni ni-reports"></em>
                                                <span>Courses</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nk-block">
                        <div className="nk-block-des">
                            <p>&nbsp;</p>
                            <div className="card card-bordered card-preview">
                                <div className="card-inner">
                                    <div className="preview-block">
                                        <p className="lead">
                                            {course.description}
                                            <br /><br />
                                        </p>
                                    </div>
                                    <div className="preview-block">
                                        <h4 className="lead">
                                            <Link to={`${course.workbook_url}`} target="_blank">DOWNLOAD WORKBOOK</Link>
                                        </h4>
                                        <p>&nbsp;</p>
                                        <h4 className="title nk-block-title">
                                            LESSONS
                                        </h4>
                                        {course.lessons && course.lessons.length > 0 ? (
                                            <ul>
                                                {course.lessons.map((lesson) => (
                                                    <li key={lesson.lid}>
                                                        <Link to={`/courses/${slug}/lessons/${lesson.lid}`}>
                                                            - <strong>{lesson.title}</strong>
                                                        </Link> {lesson.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No lessons available for this course.</p>
                                        )}

                                    </div>
                                </div>
                            </div>
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

export default CourseDetail;
