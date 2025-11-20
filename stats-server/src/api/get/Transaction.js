import pool, {handleAuthorization, handleDBError} from "../../db/index.js";

const Transaction = (req, res) => {
    handleAuthorization(req, res, () => {
        pool.query(`SELECT id, created_at FROM transactions ORDER BY created_at;`, (dbErr, dbRes) => {
            if (!handleDBError(res, dbErr)) {
                res.writeHead(200, {'Content-Type': `text/json; charset=utf-8;`});
                res.end(JSON.stringify(dbRes.rows));
            }
        });
    });
};

export default Transaction;