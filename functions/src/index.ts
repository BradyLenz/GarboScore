import * as functions from 'firebase-functions';
import { MongoClient, Db } from 'mongodb';

const MONGODB_URL = process.env.MONGODB_URL as string;
const MONGODB_NAME = process.env.MONGODB_NAME as string;

const COLLECTION_NAME = 'addresses';

const mongoClient = new MongoClient(MONGODB_URL);

const getMongoDB = (callback: (db: Db) => void) => {
    mongoClient.connect(() => {
        const db = mongoClient.db(MONGODB_NAME);

        callback(db);
      
        mongoClient.close();
    });
};

// Setup index
const setupIndex = (db: Db) => db.collection(COLLECTION_NAME).createIndex({
    'address': 1 
});

class SubmissionInterface {
    address: string = '';
    image: string = '';
}

const submissionValidator = new SubmissionInterface();

const stripProperties = (obj: any, template: any) => {
    for (const key in obj) {
        if (!template[key]) {
            delete obj[key];
        }
    }

    return obj;
};

export const score = functions.https.onRequest((request, response) => {
    if (request.method === 'POST') {
        if (!(request.body instanceof SubmissionInterface)) {
            response.status(400).send('Body must be of type: { address: string, image: string }');
        }

        const submission: SubmissionInterface = stripProperties(request.body, submissionValidator);

        // TODO: Get a score from the ML
        // This should either be an array of scores or cumulative score
        const submissionScore = 0;

        getMongoDB((db: Db) => {
            const collection = db.collection(COLLECTION_NAME);
    
            collection.updateOne({
                address: submission.address,
            }, {
                '$set': {
                    score: submissionScore
                },
            }, {
                upsert: true,
            }, () => {
                setupIndex(db);
            });

            response.status(201).send({ score: submissionScore });
        });
    }

    response.status(404).send();
});
