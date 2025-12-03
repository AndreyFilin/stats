import {handleAuthorization, prisma} from "../../db/prisma";
import broadcast from "../../ws/broadcast";
import type {IEndpoint} from "../../types";

const Transaction: IEndpoint = async (req, res, params) => {
	await handleAuthorization(req, res, async () => {
		const {id} = params;
		await prisma.transactions.delete({
			where: {
				id: +id
			}
		});
		broadcast(JSON.stringify({type: `transaction_remove`}));
		res.writeHead(200, { 'Content-Type': `application/json` });
		res.end(JSON.stringify({success: true}));
	});
};

export default Transaction;