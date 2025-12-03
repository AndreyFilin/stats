import {handleAuthorization, prisma} from "../../db/prisma";
import type {IEndpoint} from "../../types";

const Events: IEndpoint = async (req, res) => {
    await handleAuthorization(req, res, async () => {
		const events = await prisma.events.findMany();
	    res.writeHead(200, {'Content-Type': `text/json; charset=utf-8;`});
	    res.end(JSON.stringify(events));
    });
};

export default Events;