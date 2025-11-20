import pool, {handleDBError, handleRequestBody} from "../../db/index.js";

const Event = (req, res, broadcast) => {
    handleRequestBody(req, (payload) => {
        const {id} = payload;
        pool.query(`DELETE FROM events WHERE id = ${id};`, (dbErr) => {
            if (!handleDBError(res, dbErr)) {
                broadcast(JSON.stringify({
                    type: `event_remove`
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