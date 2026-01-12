import {onUnauthorizedCallback, triggerUnauthorizedCallback} from "./authCallbacks";

export interface IResponseData<T> extends Response {
	data?: T;
	status: number;
}

export class ApiError extends Error {
	status: number;
	data: unknown;
	constructor(status: number, message: string, data: unknown) {
		super(message);
		this.status = status;
		this.data = data;
	}
}

const request = async <T = void, K = void>(
	url: string,
	options: RequestInit = {},
	params?: K
): Promise<IResponseData<T>> => {
	const headers: Record<string, string> = {
		'Content-Type': `application/json`
	}

	const token = localStorage.getItem(`token`);
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const method = options?.method ?? `GET`;

	if (!!params && method !== `GET`) {
		options['body'] = JSON.stringify(params);
	} else if (!!params && !!Object.keys(params)?.length) {
		url += `?${new URLSearchParams(params).toString()}`;
	}

	try {
		const res: Response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
			...options,
			credentials: `include`,
			method,
			headers: {
				...headers,
				...(options?.headers ?? {})
			}
		});

		const status: number = res.status;
		if (status === 401) {
			const refreshRes = await fetch(
				`${import.meta.env.VITE_API_URL}/refresh`,
				{
					method: `POST`,
					credentials: `include`
				}
			);
			if (refreshRes.ok) {
				const refreshData = await refreshRes.json();
				localStorage.setItem(`token`, refreshData.token);
				await request(url, options, params);
			} else if (onUnauthorizedCallback) {
				triggerUnauthorizedCallback();
			}
		}
		const data = await res.json();
		return {data, status} as IResponseData<T>;
	} catch(error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(500, `Network error`, null);
	}
}

export default request;