import request from "../utils/request";
import type {IEvent, IProfile, ITransaction, ITransactionCategory} from "../types";
import type {ITransactionCategoryCreate, ITransactionCreate, ITransactionUpdate} from "../../../apiInterface";

export interface ILoginResponse extends Response {
	token: string;
}

export interface ITransactionRemoveFormValues {
	id: number;
}

export interface IEventCreateFormValues {
	title: string;
}

export interface IEventRemoveFormValues {
	id: number;
}

export const login = async (login: string, password: string) => {
	return await request<ILoginResponse, {login: string, password: string}>(`/login`, {method: `POST`}, {login, password});
};

export const fetchProfile = async () => {
	return await request<IProfile>(`/profile`);
};

export const fetchTransactionCategoriesList = async () => {
	return await request<ITransactionCategory[]>(`/transaction_categories`);
};

export const transactionCategoryCreate = async (values: ITransactionCategoryCreate) => {
	return await request<Response, ITransactionCategoryCreate>(`/transaction_category`, {method: `POST`}, values);
};

/* TODO разобраться с T */
export const fetchTransactionsList = async () => {
	return await request<ITransaction[]>(`/transactions`);
};
/* TODO разобраться с T */
export const fetchTransaction = async (id: number) => {
	return await request<ITransaction>(`/transaction/${id}`);
};

export const transactionCreate = async (values: ITransactionCreate) => {
	return await request<Response, ITransactionCreate>(`/transaction`, {method: `POST`}, values);
};

export const transactionUpdate = async (values: ITransactionUpdate) => {
	const {id} = values;
	return await request<Response, ITransactionUpdate>(`/transaction/${id}`, {method: `PUT`}, values);
};

export const transactionRemove = async (id: number) => {
	return await request<Response, ITransactionRemoveFormValues>(`/transaction/${id}`, {method: `DELETE`});
};

export const fetchEventsList = async () => {
	return await request<IEvent[]>(`/events`);
};

export const eventCreate = async (values: IEventCreateFormValues) => {
	return await request<Response, IEventCreateFormValues>(`/event`, {method: `POST`}, values);
};

export const eventRemove = async (values: IEventRemoveFormValues) => {
	return await request<Response, IEventRemoveFormValues>(`/event`, {method: `DELETE`}, values);
};
