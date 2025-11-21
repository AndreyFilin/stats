import pool, {handleAuthorization, handleDbResponse} from "../../db/index.js";

const Profile = (req, res) => {
    handleAuthorization(req, res, (token) => {
        pool.query(`SELECT login FROM users WHERE token='${token}';`, (dbErr, dbRes) => {
            handleDbResponse(res, dbErr, () => {
                res.end(JSON.stringify(dbRes.rows?.[0]));
            });
        });
    });
};

export default Profile;