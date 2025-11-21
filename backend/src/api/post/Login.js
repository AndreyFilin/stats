import pool, {handleDbResponse, handleRequestBody} from "../../db/index.js";
import crypto from "node:crypto";

const Login = (req, res) => {
    handleRequestBody(req, (payload) => {
        const {login, password} = payload;
        const token = crypto.randomUUID();
        const hash = crypto.createHash(`md5`);
        hash.update(password);
        const md5Password = hash.digest(`hex`);
        pool.query(`UPDATE users SET token='${token}' WHERE login='${login}' AND password='${md5Password}';`, (dbErr) => {
            handleDbResponse(res, dbErr, () => {
                res.end(JSON.stringify({token}));
            });
        });
    });
};

export default Login;