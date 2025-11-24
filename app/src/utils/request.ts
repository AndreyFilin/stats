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

// Создаем переменную для хранения функции разлогинивания
export let onUnauthorizedCallback: (() => void) | null;

// Функция для регистрации колбэка из React-компонента
export const registerUnauthorizedCallback = (callback: () => void) => {
	onUnauthorizedCallback = callback;
};

const request = async <T, K>(
	url: string,
	options: RequestInit = {},
	params?: K
): Promise<IResponseData<T>> => {
	const headers: Record<string, string> = {
		"Content-Type": `application/json`
	}
	if (localStorage.getItem(`token`)) {
		headers['Authorization'] = `Bearer ${localStorage.getItem(`token`)}`;
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
			method,
			headers: {
				...headers,
				...(options?.headers ?? {})
			}
		});

		const status: number = res.status;
		const data = await res.json();
		return {data, status} as IResponseData<T>;
	} catch(error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(500, 'Network error', null);
	}
}

export default request;