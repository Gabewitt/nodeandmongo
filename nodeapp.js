const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://gabwitt123:Elvis123@clustertest.zrks5.mongodb.net/?retryWrites=true&w=majority&appName=Clustertest';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('professors');
        const profiles = database.collection('profiles');

        // Route to create a new professor profile
        app.post('/api/professors', async (req, res) => {
            const newProfessor = req.body;
            try {
                const result = await profiles.insertOne(newProfessor);
                res.status(201).json({ id: result.insertedId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ message: 'Error creating profile' });
            }
        });

        // Route to get all professor names
        app.get('/api/professors', async (req, res) => {
            try {
                const professors = await profiles.find({}, { projection: { name: 1 } }).toArray();
                res.json(professors);
            } catch (e) {
                console.error(e);
                res.status(500).json({ message: 'Error fetching professors' });
            }
        });

        // Route to search for professors by name
        app.get('/api/professors/search', async (req, res) => {
            const { name } = req.query;

            try {
                const query = name ? { name: { $regex: name, $options: 'i' } } : {};
                const professors = await profiles.find(query, { projection: { name: 1 } }).toArray();
                res.json(professors);
            } catch (e) {
                console.error(e);
                res.status(500).json({ message: 'Error searching for professors' });
            }
        });

        const PORT = process.env.PORT || 5007;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}



run().catch(console.error);