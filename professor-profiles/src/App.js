import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddProfessor from './AddProfessor';
import ProfessorList from './ProfessorList';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/create">Create Profile</Link>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Login</Link>
                </nav>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <div>
                                <h1>Welcome to the Professor Profiles App</h1>
                                <ProfessorList />
                            </div>
                        } 
                    />
                    <Route path="/create" element={<AddProfessor />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<PrivateRoute><AddProfessor /></PrivateRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;