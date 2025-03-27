import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import CourseDetail from './pages/CourseDetail';
import GuestLayout from './components/GuestLayout';
import Signup from './pages/Signup';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },

    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/courses',
                element: <Courses />,
            },
            {
                path: '/courses/:slug',
                element: <CourseDetail />,
            },
            {
                path: '/courses/:slug/lessons/:lessonId',
                element: <Lesson />,
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/signup',
                element: <Signup />,
            },
        ],
    },
]);

export default router
