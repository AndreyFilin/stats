import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const handleDBError = (reqRes, dbErr) => {
    if (dbErr) {
        reqRes.writeHead(500, { 'Content-Type': `text/plain; charset=utf-8;` });
        reqRes.end(`Error connecting to the database`);
        return true;
    }
    return false;
};

export const handleRequestBody = (req, callback) => {
    let body = ``;
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        const payload = JSON.parse(body);
        callback(payload);
    });
};

export const handleAuthorization = (req, res, callback) => {
    const token = req.headers.authorization?.split(' ')[1];
    pool.query(`SELECT token FROM users WHERE token='${token}' AND token_created_at > NOW() - INTERVAL '1 day';`, (dbErr, dbRes) => {
        if(!handleDBError(res, dbErr)) {
            if (dbRes.rows?.[0]) {
                callback(dbRes.rows?.[0]?.token);
            } else {
                reqRes.writeHead(403, { 'Content-Type': `text/plain; charset=utf-8;` });
                reqRes.end(`Error unauthorized`);
            }
        }
    });
}

export default pool;