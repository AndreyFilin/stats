
type EStoreType = `transactions` | `events`;

const __DB_NAME__: string = `store`;
const __DB_VERSION__: number = 1;

const openRequest = indexedDB.open(__DB_NAME__, __DB_VERSION__);

openRequest.onupgradeneeded = () => {
	const db = openRequest.result;
	const transactions = db.createObjectStore(`transactions`, {keyPath: `id`, autoIncrement: true});
	transactions.createIndex(`created_at`, `created_at`);
	const events = db.createObjectStore(`events`, {keyPath: `id`, autoIncrement: true});
	events.createIndex(`created_at`, `created_at`);
};

openRequest.onerror = () => {
	console.error(`DB Error`, openRequest.error);
};

openRequest.onsuccess = () => {
	const db = openRequest.result;
	db.onversionchange = () => {
		db.close();
		window.location.reload();
	};
};

openRequest.onblocked = () => {
	console.log(`onblocked`);
	// это событие не должно срабатывать, если мы правильно обрабатываем onversionchange

	// это означает, что есть ещё одно открытое соединение с той же базой данных
	// и он не был закрыт после того, как для него сработал db.onversionchange
};

export const clearDb = () => {
	indexedDB.deleteDatabase(__DB_NAME__);
};

export const queryDb = async <T>(storeName: EStoreType) => {
	return await new Promise<T[]>((resolve, reject) => {
		const db = openRequest.result;
		const transaction = db.transaction(storeName);
		const store = transaction.objectStore(storeName);
		const request = store.getAll();
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onerror = reject;
	});
};

export const addDb = async (storeName: EStoreType, entity: unknown) => {
	return await new Promise<void>((resolve, reject) => {
		const db = openRequest.result;
		const transaction = db.transaction(storeName, `readwrite`);
		const store = transaction.objectStore(storeName);
		const request = store.add(entity);
		request.onsuccess = () => resolve();
		request.onerror = reject;
	});
};

export const deleteDb = async (storeName: EStoreType, id: IDBValidKey) => {
	return await new Promise<void>((resolve, reject) => {
		const db = openRequest.result;
		const transaction = db.transaction(storeName, `readwrite`);
		const store = transaction.objectStore(storeName);
		const request = store.delete(id);
		request.onsuccess = () => resolve();
		request.onerror = reject;
	});
}

