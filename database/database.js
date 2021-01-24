import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'Raspberry';

var cachedClient = null
var cachedDb = null

export async function connectToDatabase() {
	if (cachedClient && cachedDb) {
		return {
			client: cachedClient,
			db: cachedDb
		}
	}

	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = await client.db(dbName)

	cachedClient = client
	cachedDb = db

	return { client, db }
}