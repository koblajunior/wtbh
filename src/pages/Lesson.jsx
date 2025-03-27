import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { api, setAuthHeader } from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import Head from '../components/Head';

const Lesson = ({ onCourseChange }) => {
    const { logoutUser } = useContext(AuthContext);
    const { user, token } = useSelector((state) => state.auth);
    const { slug, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [nextLessonId, setNextLessonId] = useState(null);
    const [previousLessonId, setPreviousLessonId] = useState(null);
    const [nextCourseSlug, setNextCourseSlug] = useState(null);
    const [nextCourseLessonId, setNextCourseLessonId] = useState(null);
    const [error, setError] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            setAuthHeader(token);

            const fetchLesson = async () => {
                try {
                    // Fetch course data
                    const courseResponse = await api.get(`/courses/${slug}`);
                    const course = courseResponse.data;

                    if (!course) {
                        setError('Course not found. Redirecting...');
                        // setTimeout(() => navigate('/'), 3000);
                        return;
                    }

                    // Fetch lesson data
                    const lessonResponse = await api.get(`/courses/${course.id}/lessons/${lessonId}`);
                    if (lessonResponse.data) {
                        setLesson(lessonResponse.data.lesson);
                        setIsCompleted(lessonResponse.data.completed);

                        // Set next and previous lesson IDs
                        setNextLessonId(lessonResponse.data.nextLessonId || null);
                        setPreviousLessonId(lessonResponse.data.previousLessonId || null);
                    } else {
                        throw new Error('Lesson data is invalid.');
                    }

                    // Fetch next course and its first lesson if last lesson
                    if (!lessonResponse.data.nextLessonId) {
                        const coursesResponse = await api.get('/courses-lessons');
                        const courses = coursesResponse.data;
                        const currentIndex = courses.findIndex((c) => c.slug === slug);

                        if (currentIndex !== -1 && currentIndex + 1 < courses.length) {
                            const nextCourse = courses[currentIndex + 1];
                            setNextCourseSlug(nextCourse.slug);
                            // const nextCourseLessonsResponse = await api.get(`/courses/${nextCourse.id}/lessons`);
                            // const nextCourseLessons = nextCourseLessonsResponse.data.lessons;
                            // if (nextCourseLessons?.length > 0) {
                            //     setNextCourseLessonId(nextCourseLessons[0].id);
                            // }
                        }
                    }
                } catch (error) {
                    console.error('Error fetching lesson:', error);
                    setError('An error occurred while fetching the lesson.');
                }
            };

            fetchLesson();
        }
    }, [user, slug, lessonId, navigate]);

    const markComplete = async () => {
        try {
            const response = await api.post(`/lessons/${lessonId}/complete`);
            if (response.data.success) {
                setIsCompleted(true);

                if (nextLessonId) {
                    navigate(`/courses/${slug}/lessons/${nextLessonId}`);
                } else if (nextCourseSlug && nextCourseLessonId) {
                    if (onCourseChange) onCourseChange(nextCourseSlug);
                    navigate(`/courses/${nextCourseSlug}/lessons/${nextCourseLessonId}`);
                }
            }
        } catch (error) {
            console.error('Error marking lesson as complete:', error);
        }
    };

    return (
        <>
            {lesson ? (
                <div>
                    <Head title={!lesson ? "Lessons" : lesson.title} />
                    <div className="nk-block-head nk-block-head-sm">
                        <div className="nk-block-between">
                            <div className="nk-block-head-content">
                                <h3 className="nk-block-title page-title">{lesson.title}</h3>
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
                                                    <span>All Courses</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nk-block">
                        <div
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />
                    </div>
                    <div className="nk-block">
                        <ul className="nk-block-tools g-3">
                            <li>
                                <button onClick={markComplete}
                                    disabled={isCompleted} className="btn btn-outline-primary" >
                                    <em className="icon ni ni-check"></em>
                                    <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
                                </button>
                            </li>
                            {nextLessonId ? (
                                <li className="nk-block-tools-opt">
                                    <button onClick={() => navigate(`/courses/${slug}/lessons/${nextLessonId}`)} className="btn btn-primary">

                                        <span>Next Lesson</span>
                                        <em className="icon ni ni-arrow-right"></em>
                                    </button>
                                </li>
                            ) : nextCourseSlug ? (

                                <li className="nk-block-tools-opt">
                                    <button onClick={() => {
                                        if (onCourseChange) onCourseChange(nextCourseSlug);
                                        navigate(`/courses/${nextCourseSlug}`);
                                    }} className="btn btn-primary">

                                        <em className="icon ni ni-reports"></em>
                                        <span>Next Course</span>
                                    </button>
                                </li>
                            ) : (

                                <button disabled className="btn btn-primary">No More Lessons or Courses</button>
                            )}
                        </ul>
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

export default Lesson;
