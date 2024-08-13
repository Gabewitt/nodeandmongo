import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddProfessor from './AddProfessor';
import ProfessorList from './ProfessorList'; 

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <div>
                                <h1>Welcome to the Professor Profiles App</h1>
                                <Link to="/create">
                                    <button>Create New Professor Profile</button>
                                </Link>
                                <ProfessorList /> {/* Add the ProfessorList component here */}
                            </div>
                        } 
                    />
                    <Route path="/create" element={<AddProfessor />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;