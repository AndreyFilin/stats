export interface IResponseData<T> extends Response {
	data: T;
}

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
	} catch {
		throw {status: 500} as IResponseData<T>;
	}
}

export default request;