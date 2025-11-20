import crypto from "node:crypto";
import pool, {handleDBError, handleRequestBody} from "../../db/index.js";

const Login = (req, res) => {
    handleRequestBody(req, (payload) => {
        const {login, password} = payload;
        const token = crypto.randomUUID();
        const hash = crypto.createHash(`md5`);
        hash.update(password);
        const md5Password = hash.digest(`hex`);
        pool.query(`UPDATE users SET token = '${token}' WHERE login = '${login}' AND password='${md5Password}';`, (dbErr) => {
            if (!handleDBError(res, dbErr)) {
                res.writeHead(200, { 'Content-Type': `application/json` });
                res.end(JSON.stringify({token}));
            }
        });
    });
};

export default Login;