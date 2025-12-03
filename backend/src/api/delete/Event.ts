import {handleAuthorization, handleRequestBody, prisma} from "../../db/prisma";
import broadcast from "../../ws/broadcast";
import type {IEndpoint} from "../../types";

const Event: IEndpoint = async (req, res, params) => {
	await handleAuthorization(req, res, async () => {
		handleRequestBody(req, async () => {
			const {id} = params;
			await prisma.events.delete({
				where: {
					id: +id
				}
			});
			broadcast(JSON.stringify({type: `event_remove`}));
			res.writeHead(200, { 'Content-Type': `application/json` });
			res.end(JSON.stringify({success: true}));
		});
	});
};

export default Event;