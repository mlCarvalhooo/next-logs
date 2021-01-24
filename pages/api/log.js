// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nextConnect from 'next-connect';
//import middleware from '../../database/database';
const Pusher = require('pusher');

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {

	//const doc = await req.db.collection('Devices').findOne()
	res.json({
		status: 'SUCCESS',
		data: null//doc
	});
});

handler.post(async (req, res) => {
	if (req.body.message) {
		//const doc = await req.db.collection('Devices').findOneAndUpdate({}, { $push: { logs: { message: req.body.message, time: new Date().getTime() } } })
		res.json({
			status: 'SUCCESS'
		});
		const pusher = new Pusher({
			appId: process.env.PUSHER_APP_ID,
			key: process.env.PUSHER_KEY,
			secret: process.env.PUSHER_SECRET,
			cluster: "eu",
			useTLS: true
		});
		pusher.trigger("my-channel", "my-event", {
			log: { message: req.body.message, time: new Date().getTime() }
		});
	} else {
		res.json({
			status: 'DENIED',
			errorDescription: 'body.message is undefined.'
		})
	}

});

export default handler;