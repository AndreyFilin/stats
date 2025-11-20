import request from "../utils/request.ts";
import type {IEvent, IProfile, ITransaction} from "../types.ts";

export interface ILoginResponse extends Response {
	token: string;
}

export interface ITransactionCreateFormValues {
	title?: string;
}

export interface ITransactionRemoveFormValues {
	id: number;
}

export interface IEventCreateFormValues {
	title?: string;
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

export const fetchTransactionsList = async () => {
	return await request<ITransaction[], undefined>(`/transactions`);
};

export const transactionCreate = async (values: ITransactionCreateFormValues) => {
	return await request<Response, ITransactionCreateFormValues>(`/transactions`, {method: `POST`}, values);
};

export const transactionRemove = async (values: ITransactionRemoveFormValues) => {
	return await request<Response, ITransactionRemoveFormValues>(`/transactions`, {method: `DELETE`}, values);
};

export const fetchEventsList = async () => {
	return await request<IEvent[], undefined>(`/events`);
};

export const eventCreate = async (values: IEventCreateFormValues) => {
	return await request<Response, IEventCreateFormValues>(`/events`, {method: `POST`}, values);
};

export const eventRemove = async (values: IEventRemoveFormValues) => {
	return await request<Response, IEventRemoveFormValues>(`/events`, {method: `DELETE`}, values);
};
