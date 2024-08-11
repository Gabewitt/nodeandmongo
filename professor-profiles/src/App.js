import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProfessor from './AddProfessor';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Professor Profiles App</h1>} />
                    <Route path="/create" element={<AddProfessor />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;