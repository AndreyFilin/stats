import {handleAuthorization, handleRequestBody, prisma} from "../../db/prisma";
import broadcast from "../../ws/broadcast";
import type {IEndpoint} from "../../types";
import type {ITransactionCategoryCreate} from "../../../../apiInterface";

const TransactionCategory: IEndpoint = async (req, res) => {
	await handleAuthorization(req, res, () => {
		handleRequestBody<ITransactionCategoryCreate>(req, async (payload) => {
			const {title, sys_name} = payload;
			const transaction = await prisma.transaction_categories.create({
				data: {
					title,
					sys_name
				}
			});
			broadcast(JSON.stringify({
				type: `transaction_category_create`,
				payload: transaction
			}));
			res.end(JSON.stringify({success: true}));
		});
	});
};

export default TransactionCategory;