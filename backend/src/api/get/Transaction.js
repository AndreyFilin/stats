import pool, {handleAuthorization, handleDbResponse} from "../../db/index.js";

const Transaction = (req, res) => {
    handleAuthorization(req, res, () => {
        pool.query(`SELECT id, created_at, title, value, category FROM transactions ORDER BY created_at;`, (dbErr, dbRes) => {
            handleDbResponse(res, dbErr, () => {
                res.end(JSON.stringify(dbRes.rows));
            });
        });
    });
};

export default Transaction;