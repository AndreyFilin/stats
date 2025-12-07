import {queryClient} from "./queryClient";

export default class WSHandler {
	constructor() {
		const socket = new WebSocket(`ws://localhost:3000`);
		socket.onclose = function(event) {
			if (event.wasClean) {
				console.log(`Соединение закрыто чисто`);
			} else {
				console.log(`Обрыв соединения`); // например, "убит" процесс сервера
			}
			console.log(`Код: ${event.code}причина: ${event.reason}`);
		};
		socket.onmessage = this.handleMessages;
	}

	/* TODO overhead */
	private handleMessages = async (event: MessageEvent): Promise<void> => {
		const {type, payload} = JSON.parse(event.data);
		switch (type) {
			case `transaction_create`: await this.handleTransactionCreate(); break;
			case `transaction_remove`: await this.handleTransactionRemove(); break;
			case `transaction_update`: await this.handleTransactionUpdate(payload?.id); break;
			case `event_create`: await this.handleEventCreate(); break;
			case `event_remove`: await this.handleEventRemove(); break;
		}
	}

	private handleTransactionCreate = async () => {
		await queryClient.invalidateQueries({queryKey: [`transactions`]});
	}

	private handleTransactionUpdate = async (id?: number) => {
		await queryClient.invalidateQueries({queryKey: [`transactions`]});
		if (id) {
			await queryClient.invalidateQueries({queryKey: [`transaction`, id]});
		}
	}

	private handleTransactionRemove = async () => {
		await queryClient.invalidateQueries({queryKey: [`transactions`]});
	}

	private handleEventCreate = async () => {
		await queryClient.invalidateQueries({queryKey: [`events`]});
	}

	private handleEventRemove = async () => {
		await queryClient.invalidateQueries({queryKey: [`events`]});
	}
}

new WSHandler();