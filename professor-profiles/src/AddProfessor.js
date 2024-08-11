import React, { useState } from 'react';

function AddProfessor() {
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [description, setDescription] = useState('');
    const [awards, setAwards] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newProfessor = { 
            name, 
            university, 
            description, 
            awards 
        };

        try {
            const response = await fetch('http://localhost:5004/api/professors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProfessor),
            });

            if(response.ok) {
                alert('Professor profile created successfully!');
            } else {
                alert('Failed to create professor profile.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating professor profile.');
        }
    };

    return (
       

        <form onSubmit={handleSubmit}>
            <div>
                <h1>Create a New Professor Profile</h1>
                {/* Rest of your form code */}
            </div>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>University:</label>
                <input 
                    type="text" 
                    value={university} 
                    onChange={(e) => setUniversity(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Description:</label>
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Awards:</label>
                <input 
                    type="text" 
                    value={awards} 
                    onChange={(e) => setAwards(e.target.value)} 
                />
            </div>
            <button type="submit">Create Professor</button>
        </form>
    );
}

export default AddProfessor;