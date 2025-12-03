import {handleAuthorization, handleRequestBody, prisma} from "../../db/prisma";
import broadcast from "../../ws/broadcast";
import type {IEndpoint} from "../../types";

const Event: IEndpoint = async (req, res) => {
	await handleAuthorization(req, res, async () => {
		handleRequestBody(req, async () => {
			const event = await prisma.events.create({});
			broadcast(JSON.stringify({
				type: `event_create`,
				payload: event
			}));
			res.end(JSON.stringify({success: true}));
		});
	});
};

export default Event;