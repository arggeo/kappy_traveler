// Package & Custom imports
require('dotenv').config({path:'../.env'});
const mongoose = require('mongoose');

async function dbConnection(){
    const dbUser = process.env.MONGO_USERNAME;
    const dbPass = process.env.MONGO_PASSWORD;
    const dbURI = `mongodb+srv://${dbUser}:${dbPass}@cluster0.x56ri.mongodb.net/?retryWrites=true&w=majority`;
    
    // Connection to DB & Error Handling Initial Database Connection
    try {
        await mongoose.connect(dbURI)
        .then((result) => console.log('Successfulyy connected to db'));
    } catch (error) {
        console.log(error);
    }

    // If the Node process ends, close Mongoose Connection
    process.on('SIGINT', function() {  
        mongoose.connection.close(function () { 
        console.log('Mongoose Connection disconnected through app termination'); 
        process.exit(0); 
        }); 
    }); 
};

module.exports = dbConnection;