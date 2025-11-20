import pool, {handleDBError, handleRequestBody} from "../../db/index.js";

const Event = (req, res, broadcast) => {
    handleRequestBody(req, () => {
        pool.query(`INSERT INTO events DEFAULT VALUES returning id, created_at;`, (dbErr, dbRes) => {
            if(!handleDBError(res, dbErr)) {
                broadcast(JSON.stringify({
                    type: `event_create`,
                    payload: dbRes.rows[0]
                }));
                res.writeHead(200, { 'Content-Type': `application/json` });
                res.end(JSON.stringify({
                    success: true
                }));
            }
        });
    });
};

export default Event;