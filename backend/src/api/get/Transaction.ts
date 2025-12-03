import {handleAuthorization, prisma} from "../../db/prisma";
import type {IEndpoint} from "../../types";

const Transaction: IEndpoint = async (req, res, params) => {
    await handleAuthorization(req, res, async () => {
        const {id} = params;
		const transaction = await prisma.transactions.findUnique({
			where: {
				id: +id
			}
		});
	    res.writeHead(200, {'Content-Type': `text/json; charset=utf-8;`});
	    res.end(JSON.stringify(transaction));
    });
};

export default Transaction;