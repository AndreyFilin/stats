import request from "../utils/request.ts";
import type {IEvent, IProfile, ITransaction, ITransactionCategory} from "../types.ts";

export interface ILoginResponse extends Response {
	token: string;
}

export interface ITransactionCreateFormValues {
	title: string;
}

export interface ITransactionUpdateValues {
	id: number;
	title: string;
	value: number;
	category: string;
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
	return await request<IProfile, undefined>(`/profile`);
};

export const fetchTransactionCategoriesList = async () => {
	return await request<ITransactionCategory[], undefined>(`/transaction_categories`);
};

export const fetchTransactionsList = async () => {
	return await request<ITransaction[], undefined>(`/transactions`);
};

export const fetchTransaction = async (id: number) => {
	return await request<ITransaction, undefined>(`/transaction/${id}`);
};

export const transactionCreate = async (values: ITransactionCreateFormValues) => {
	return await request<Response, ITransactionCreateFormValues>(`/transaction`, {method: `POST`}, values);
};

export const transactionUpdate = async (values: ITransactionUpdateValues) => {
	const {id} = values;
	return await request<Response, ITransactionUpdateValues>(`/transaction/${id}`, {method: `PUT`}, values);
};

export const transactionRemove = async (id: number) => {
	return await request<Response, ITransactionRemoveFormValues>(`/transaction/${id}`, {method: `DELETE`});
};

export const fetchEventsList = async () => {
	return await request<IEvent[], undefined>(`/events`);
};

export const eventCreate = async (values: IEventCreateFormValues) => {
	return await request<Response, IEventCreateFormValues>(`/event`, {method: `POST`}, values);
};

export const eventRemove = async (values: IEventRemoveFormValues) => {
	return await request<Response, IEventRemoveFormValues>(`/event`, {method: `DELETE`}, values);
};
