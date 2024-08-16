import React, { useState, useEffect } from 'react';

function ProfessorList() {
    const [professors, setProfessors] = useState([]); // Initialize as an array
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() !== '') { // Only search if there's a query
            setLoading(true);
            fetch(`http://localhost:5005/api/professors/search?name=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setProfessors(data);
                    } else {
                        setProfessors([]);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching professors:', error);
                    setProfessors([]);
                    setLoading(false);
                });
        } else {
            setProfessors([]); // Clear the list if the search query is empty
        }
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search professors by name..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {professors.length > 0 ? (
                        professors.map(professor => (
                            <li key={professor._id}>{professor.name}</li>
                        ))
                    ) : (
                        searchQuery && <li>No professors found</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default ProfessorList;