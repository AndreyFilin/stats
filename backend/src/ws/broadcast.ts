import {WebSocket} from "ws";

const clients: any[] = [];
const broadcast = (message: string) => {
	clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}

export const addClient = (client: WebSocket) => {
	clients.push(client);
}

export default broadcast;