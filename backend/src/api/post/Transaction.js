import pool, {handleDbResponse, handleRequestBody} from "../../db/index.js";

const Transaction = (req, res, broadcast) => {
    handleRequestBody(req, (payload) => {
        const {title, value, category} = payload;
        pool.query(
            `INSERT INTO transactions (id, created_at, title, value, category) VALUES(DEFAULT, DEFAULT, '${title}', '${value}', '${category}');`,
            (dbErr, dbRes) => {
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