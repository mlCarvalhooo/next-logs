import { connectToDatabase } from "../../database/database";

export default async (req, res) => {

    const { db, client } = await connectToDatabase();

    if (client.isConnected()) {
        const doc = await db
            .collection("Devices")
            .findOne({})        

        return res.status(200).json({ doc });

    }

    return res.status(500).json({ error: 'client DB is not connected' })

}