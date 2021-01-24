import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from "mongodb";
import url from 'url';

let cashedDb: Db = null;

async function connectToDatabase(uri: string) {
    if (cashedDb)
        return cashedDb;


    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const dbName = url.parse(uri).pathname.substr(1);
    const db = client.db(dbName);

    cashedDb = db;

    return db;
}

export default async (request: NowRequest, response: NowResponse) => {
    const { message } = request.body;

    const db = await connectToDatabase(process.env.MONGODB_URI);

    const collection = db.collection('Devices');

    await collection.findOneAndUpdate({id: 'a'}, {$push: {logs: {message: message, time: new Date().getTime()}}})

    return response.status(201).json({ status: 'SUCCESS' })

}