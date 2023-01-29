import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import UserRoute from './api/UserRoute.js';

class Index {
    static app = express();

    static router = express.Router();

    static main() {
        dotenv.config();
        Index.setupServer();
        Index.setupDatabase();
    }

    static setupServer() {
        Index.app.use(cors());
        Index.app.use(express.json());
        Index.app.use('/api/v1/user', UserRoute.configRoutes(Index.router));
        Index.app.use('*', (req, res) => {
            res.status(404).json({error: 'not found'});
        });
    }

    static async setupDatabase() {
        const client = new mongodb.MongoClient(process.env.BACKEND_DB_URI);
        const port = process.env.PORT || 8000;
        try {
            //connect to the MongoDB DB
            await client.connect();

            Index.app.listen(port, () => {
                console.log(`Server is running on port:${port}`);
            });
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    }
}

Index.main();
