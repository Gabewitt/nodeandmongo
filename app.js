const { MongoClient } = require('mongodb');


async function main() {

    const uri = 'mongodb+srv://gabwitt123:WsvDIrF4Np6nEJy5@clustertest.zrks5.mongodb.net/?retryWrites=true&w=majority&appName=Clustertest';



    const client = new MongoClient(uri);

    try {
        await client.connect(); 

        await createProfile(client, {
           name: "Professor Pedro Braga",
           university: "Cambridge University",
           discription: "Data analysis for 3-body problem"
        })

        /*await createMultipleProfiles(client, [
            {
                name: "Professor Ted O'Connor",
                university: "King's College London",
                awards: "Nobel Prize in Physics",
                discription: "The study of dark matter around black holes"
            },
            {
                name: "Professor Gabriel Wittenberg",
                university: "ETH Zurich",
                awards: "Nobel Prize",
                discription: "The study of subatomic particle collision at CERN",
            },
            {
                name: "Professor Paul Chainieux",
                university: "Imperial College London",
                discription: "Superconductive matierials"

            }




        ]);*/

        await findOneProfessorByName(client,"Professor Paul Chainieux");

        //await updateProfessorByName(client, "Professor Paul Chainieux", { university: "Harvard University" });


    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }


}

main().catch(console.error);

async function updateProfessorByName(client, nameOfProfessor, updatedProfessor) {
    const result = await client.db("professors").collection("profiles").updateOne({ name: nameOfProfessor }, { $set: updatedProfessor});

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} documents was/were updated`);

}

 


async function findOneProfessorByName(client, nameOfProfessor) {
    const result = await client.db("professors").collection("profiles").findOne({name: nameOfProfessor});

    if (result) {
        console.log(`Found a professor in the collection with the name '${nameOfProfessor}'`);
        console.log(result);
    } else {
        console.log(`No professors found with the name '${nameOfProfessor}'`);
    }

}


async function createMultipleProfiles(client, newProfiles) {
    const result = await client.db("professors").collection("profiles").insertMany(newProfiles);

    console.log(`${result.insertedCount} new profiles created with the follwing id(s):`);
    console.log(result.insertedIds);


}


async function createProfile(client, newProfile) {
    const result = await client.db("professors").collection("profiles").insertOne(newProfile)

    console.log(`New profile created with the following id: ${result.insertedId}`)

}


async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log('Databases:');
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}