import pool, {handleDBError, handleRequestBody} from "../../db/index.js";

const Transaction = (req, res, broadcast) => {
    handleRequestBody(req, (payload) => {
        const {id} = payload;
        pool.query(`DELETE FROM transactions WHERE id = ${id};`, (dbErr) => {
            if (!handleDBError(res, dbErr)) {
                broadcast(JSON.stringify({
                    type: `transaction_remove`
                }));
                res.writeHead(200, { 'Content-Type': `application/json` });
                res.end(JSON.stringify({
                    success: true
                }));
            }
        });
    });
};

export default Transaction;