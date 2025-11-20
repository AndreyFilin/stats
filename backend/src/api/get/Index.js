import pool, {handleDBError} from "../../db/index.js";

const Index = (req, res) => {
    pool.query('SELECT NOW()', (dbErr, dbRes) => {
        if(!handleDBError(res, dbErr)) {
            res.writeHead(200, { 'Content-Type': `text/html; charset=utf-8;` });
            res.end(`<h1>Hello There!!!!</h1><br/>${dbRes.rows[0]?.now}`);
        }
    });
};

export default Index;