import {handleAuthorization, handleRequestBody, prisma} from "../../db/prisma";
import type {IEndpoint} from "../../types";
import broadcast from "../../ws/broadcast";

interface ITransactionUpdatePayload {
	title: string;
	value: string;
	category: string;
}

const Transaction: IEndpoint = async (req, res, params) => {
	await handleAuthorization(req, res, async () => {
		handleRequestBody<ITransactionUpdatePayload>(req, async (payload) => {
			const {id} = params;
			const {title, value, category} = payload;
			const transaction = await prisma.transactions.update({
				data: {
					title,
					value: +value,
					category
				},
				where: {
					id: +id
				}
			});
			broadcast(JSON.stringify({type: `transaction_update`, payload: transaction}));
			res.writeHead(200, { 'Content-Type': `application/json` });
			res.end(JSON.stringify({success: true}));
		});
	});
};

export default Transaction;