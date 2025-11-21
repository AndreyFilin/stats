import pool, {handleDbResponse, handleRequestBody} from "../../db/index.js";

const Transaction = (req, res, broadcast) => {
    handleRequestBody(req, () => {
        pool.query(`INSERT INTO transactions DEFAULT VALUES returning id, created_at;`, (dbErr, dbRes) => {
            handleDbResponse(res, dbErr, () => {
                broadcast(JSON.stringify({
                    type: `transaction_create`,
                    payload: dbRes.rows[0]
                }));
                res.end(JSON.stringify({
                    success: true
                }));
            });
        });
    });
};

export default Transaction;