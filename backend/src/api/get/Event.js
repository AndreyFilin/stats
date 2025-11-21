import pool, {handleAuthorization, handleDbResponse} from "../../db/index.js";

const Event = (req, res) => {
    handleAuthorization(req, res, () => {
        pool.query(`SELECT id, created_at FROM events ORDER BY created_at;`, (dbErr, dbRes) => {
            handleDbResponse(res, dbErr, () => {
                res.end(JSON.stringify(dbRes.rows));
            });
        });
    });
};

export default Event;