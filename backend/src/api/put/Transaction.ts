import {handleAuthorization, handleRequestBody} from "../../db/prisma";
import type {IEndpoint} from "../../types";

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
			console.log({id, title, value, category});
		});
	});
};

export default Transaction;