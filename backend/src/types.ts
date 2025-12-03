import type {IncomingMessage, ServerResponse} from "node:http";

export type IEndpoint = (
	req: IncomingMessage,
	res: ServerResponse,
	params: Record<string, any>,
	searchParams?: Record<string, any>
) => Promise<void> | void;