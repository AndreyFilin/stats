import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
	// @ts-ignore
    port: process.env.DB_PORT,
});

// @ts-ignore
export const handleDBError = (reqRes, dbErr) => {
    if (dbErr) {
        reqRes.writeHead(500, { 'Content-Type': `text/plain; charset=utf-8;` });
        reqRes.end(`Error connecting to the database`);
        return true;
    }
    return false;
};
/*
export const handleRequestBody = (req, callback) => {
    let body = ``;
    req.on(`data`, (chunk) => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on(`end`, () => {
        const payload = !!body ? JSON.parse(body) : {};
        callback(payload);
    });
};
*/

// @ts-ignore
export const handleDbResponse = (res, dbErr, callback) => {
    if(!handleDBError(res, dbErr)) {
        res.writeHead(200, { 'Content-Type': `text/json; charset=utf-8;` });
        callback();
    }
}

// @ts-ignore
export const handleAuthorization = (req, res, callback) => {
    const token = req.headers.authorization?.split(' ')[1];
    pool.query(`SELECT token FROM users WHERE token='${token}' AND token_created_at > NOW() - INTERVAL '1 day';`, (dbErr, dbRes) => {
        if(!handleDBError(res, dbErr)) {
            if (dbRes.rows?.[0]) {
                callback(dbRes.rows?.[0]?.token);
            } else {
                res.writeHead(401, { 'Content-Type': `text/plain; charset=utf-8;` });
                res.end(`Error unauthorized`);
            }
        }
    });
}

export default pool;