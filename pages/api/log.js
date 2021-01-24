// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { getIO } = require("../../socketIO");

import nextConnect from 'next-connect';
import middleware from '../../database/database';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {

	const doc = await req.db.collection('Devices').findOne()
	console.log(doc);
	res.json({
		status: 'SUCCESS',
		data: doc
	});
});

handler.post(async (req, res) => {
	if (req.body.message) {
		const doc = await req.db.collection('Devices').findOneAndUpdate({}, { $push: { logs: { message: req.body.message, time: new Date().getTime() } } })
		res.json({
			status: 'SUCCESS'
		});
		const io = getIO();

		io.emit("FromAPI", { log: { message: req.body.message, time: new Date().getTime() } });

	} else {
		res.json({
			status: 'DENIED',
			errorDescription: 'body.message is undefined.'
		})
	}

});

export default handler;