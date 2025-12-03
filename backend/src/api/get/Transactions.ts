import {handleAuthorization, prisma} from "../../db/prisma.ts";
import type {IEndpoint} from "../../types";

const Transactions: IEndpoint = async (req, res) => {
    await handleAuthorization(req, res, async () => {
        const transactions = await prisma.transactions.findMany({})
	    res.writeHead(200, {'Content-Type': `text/json; charset=utf-8;`});
	    res.end(JSON.stringify(transactions));
    });
};

export default Transactions;