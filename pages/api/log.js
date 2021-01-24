// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getLog, log } from "../../api/Log";
import LogMessage from "../../api/models/LogMessage";

export default (req, res) => {
	res.statusCode = 200;
	switch (req.method) {
		case 'GET':
			res.json({
				status: 'SUCCESS',
				data: {
					logs: getLog()
				}
			})
			break;
		case 'POST':
			if (req.body.message) {
				res.json({
					status: 'SUCCESS'
				});

				log(new LogMessage(new Date().getTime(), req.body.message));
			} else {
				res.json({
					status: 'DENIED',
					errorDescription: 'body.message is undefined.'
				})
			}
			break;
	}
}


function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
}

function pad2(num, size) {
	num = num.toString();
	while (num.length < size) num = " " + num;
	return num;
}