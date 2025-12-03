export interface IProfile {
	id: string;
	login: string;
	role: string;
}

export interface ITransaction {
	id: number;
	created_at: string;
	title: string;
	value: number;
	category: string;
}

export interface ITransactionCategory {
	id: number;
	title: string;
	sys_name: string;
}

export interface IEvent {
	id: number;
	created_at: string;
}