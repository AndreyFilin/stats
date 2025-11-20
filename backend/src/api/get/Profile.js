import pool, {handleAuthorization, handleDBError} from "../../db/index.js";

const Profile = (req, res) => {
    handleAuthorization(req, res, (token) => {
        console.log({token});
        pool.query(`SELECT id, login FROM users WHERE token='${token}' AND token_created_at > NOW() - INTERVAL '1 day';`, (dbErr, dbRes) => {
            if(!handleDBError(res, dbErr)) {
                res.writeHead(200, { 'Content-Type': `text/json; charset=utf-8;` });
                res.end(JSON.stringify(dbRes.rows?.[0]));
            }
        });
    });
};

export default Profile;