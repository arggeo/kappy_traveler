// Package & Custom imports
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

async function dbConnection(app){
    const dbUser = process.env.MONGO_USERNAME;
    const dbPass = process.env.MONGO_PASSWORD;
    const dbURI = `mongodb+srv://${dbUser}:${dbPass}@cluster0.x56ri.mongodb.net/kappy?retryWrites=true&w=majority`;
    
    // Connection to DB & Error Handling Initial Database Connection
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        
        if (!mongoose.connection.readyState) {
            throw new Error('DB connection failed - required to start the server');
        }

        app.listen(process.env.PORT, () =>{
            console.log(`App running on port ${process.env.PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }

    // If the Node server terminates, close Mongoose Connection
    process.on('SIGINT', function() {  
        mongoose.connection.close(function () { 
            console.log('Mongoose Connection disconnected through app termination'); 
            process.exit(0); 
        }); 
    }); 
    mongoose.connection.on('error', () =>{
        process.exit(0);
    })
};

export default dbConnection;