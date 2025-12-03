import {handleAuthorization, handleRequestBody, prisma} from "../../db/prisma";
import broadcast from "../../ws/broadcast";
import {type IEndpoint} from "../../types";

interface ITransactionCreatePayload {
	title: string;
	value: string;
	category: string;
}

const Transaction: IEndpoint = async (req, res) => {
	await handleAuthorization(req, res, () => {
		handleRequestBody<ITransactionCreatePayload>(req, async (payload) => {
			const {title, value, category} = payload;
			const transaction = await prisma.transactions.create({
				data: {
					title,
					value: +value,
					category
				}
			});
			broadcast(JSON.stringify({
				type: `transaction_create`,
				payload: transaction
			}));
			res.end(JSON.stringify({success: true}));
		});
	});
};

export default Transaction;