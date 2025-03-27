import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail'; // Create this component
import Lesson from './pages/Lesson';
import Dashboard from './pages/Dashboard';
// import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:slug" element={<CourseDetail />} /> {/* New route */}
                    <Route path="/courses/:slug/lessons/:lessonId" element={<Lesson />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
