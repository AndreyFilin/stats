import { createServer } from "node:http";
import { WebSocketServer } from "ws";

const hostname = `127.0.0.1`;
const port = process.env.PORT || 3000;

import Index from "./api/get/Index.js";
import Profile from "./api/get/Profile.js";
import Login from "./api/post/Login.js";
import TransactionsList from "./api/get/Transaction.js";
import TransactionCreate from "./api/post/Transaction.js";
import TransactionRemove from "./api/delete/Transaction.js";
import EventsList from "./api/get/Event.js";
import EventCreate from "./api/post/Event.js";
import EventRemove from "./api/delete/Event.js";

const routes = {
    GET: {
        '/': Index,
        '/profile': Profile,
        '/transactions': TransactionsList,
        '/events': EventsList,
    },
    POST: {
        '/transactions': TransactionCreate,
        '/events': EventCreate,
        '/login': Login,
    },
    DELETE: {
        '/transactions': TransactionRemove,
        '/events': EventRemove,
    }
};

const wss = new WebSocketServer({ noServer: true });
const clients = [];

const broadcast = (message) => {
    clients.forEach(client => {
        // Проверяем, что соединение открыто (OPEN) перед отправкой
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

const server = createServer((req, res) => {
    // Set CORS headers for all responses
    res.setHeader(`Access-Control-Allow-Origin`, `*`); // Allow requests from any origin
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`); // Allowed HTTP methods
    res.setHeader(`Access-Control-Allow-Headers`, `*`); // Allowed request headers
    res.setHeader(`Access-Control-Max-Age`, 86400); // Cache preflight response for 24 hours

    // Handle preflight OPTIONS requests
    if (req.method === `OPTIONS`) {
        res.writeHead(204); // No content, just send headers
        res.end();
        return;
    }

    const method = req.method;
    const url = req.url;

    // Check if a handler exists for the requested method and URL
    if (routes[method] && routes[method][url]) {
        routes[method][url](req, res, broadcast); // Execute the corresponding handler
    } else {
        // Handle 404 Not Found
        res.writeHead(404, { 'Content-Type': `text/plain` });
        res.end(`404 Not Found`);
    }
});

server.on(`upgrade`, (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
        clients.push(socket);
        wss.emit(`connection`, socket, request);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});