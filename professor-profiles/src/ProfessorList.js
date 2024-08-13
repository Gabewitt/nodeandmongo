import React, { useState, useEffect } from 'react';

function ProfessorList() {
    const [professors, setProfessors] = useState([]);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        if (showList) {
            fetch('http://localhost:5005/api/professors')
                .then(response => response.json())
                .then(data => setProfessors(data))
                .catch(error => console.error('Error fetching professors:', error));
        }
    }, [showList]);

    return (
        <div>
            <button onClick={() => setShowList(!showList)}>
                {showList ? 'Hide Professors' : 'Show Professors'}
            </button>
            {showList && (
                <ul>
                    {professors.map(professor => (
                        <li key={professor._id}>{professor.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProfessorList;