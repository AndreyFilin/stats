export interface ITransactionCategoryCreate {
	title: string;
	sys_name: string;
}

export interface ITransactionCreate {
	title: string;
	value: number;
	category: string;
}

export interface ITransactionUpdate {
	id: number;
	title: string;
	value: number;
	category: string;
}