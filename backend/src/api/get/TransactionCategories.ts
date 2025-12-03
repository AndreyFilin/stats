import {handleAuthorization, prisma} from "../../db/prisma";
import type {IEndpoint} from "../../types";

const TransactionCategories: IEndpoint = async (req, res) => {
    await handleAuthorization(req, res, async () => {
		const transactionCategories = await prisma.transaction_categories.findMany({
			select: {
				title: true,
				sys_name: true
			}
		});
	    res.writeHead(200, {'Content-Type': `text/json; charset=utf-8;`});
	    res.end(JSON.stringify(transactionCategories));
    });
};

export default TransactionCategories;