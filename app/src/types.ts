export interface IProfile {
	id: string;
	login: string;
}

export interface ITransaction {
	id: number;
	created_at: string;
	title: string;
	value: number;
	category: string;
}

export interface IEvent {
	id: number;
	created_at: string;
}