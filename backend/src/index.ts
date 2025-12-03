import {createServer} from "node:http";
import {WebSocketServer} from "ws";
import findMyWay, {type HTTPMethod} from "find-my-way";
import {addClient} from "./ws/broadcast";
import routes from "./routes";

const hostname: string = process.env.HOST || `127.0.0.1`;
const port: string = process.env.PORT || `3000`;
const wss = new WebSocketServer({ noServer: true });

const router = findMyWay({
    defaultRoute: (_, res) => {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end(`404 Not Found`);
    }
});

Object.entries(routes).forEach(([method, endpoints]) => {
    Object.entries(endpoints).forEach(([path, handler]) => {
        router.on(method as HTTPMethod, path, async (req, res, params) => {
            await handler?.(req, res, params);
        });
    });
});

const server = createServer((req, res) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
    res.setHeader(`Access-Control-Allow-Headers`, `*`);
    res.setHeader(`Access-Control-Max-Age`, 86400);
    if (req.method === `OPTIONS`) {
        res.writeHead(204);
        res.end();
        return;
    }
    router.lookup(req, res);
});

server.on(`upgrade`, (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
        addClient(socket);
        wss.emit(`connection`, socket, request);
    });
});

// @ts-ignore Something strange
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});