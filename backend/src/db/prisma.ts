import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client";
import {IncomingMessage, ServerResponse} from "node:http";
import jwt from "jsonwebtoken";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({adapter});

export const handleAuthorization = async (req: IncomingMessage, res: ServerResponse, callback: (token: string) => void) => {
	const token = req.headers.authorization?.split(' ')?.[1];

	const handleError = (err?: string) => {
		res.writeHead(401, {'Content-Type': `text/plain; charset=utf-8;`});
		res.end(err ?? `Unauthorized`);
	}

	if (!token) {
		handleError();
	} else {
		jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err) => {
			if (err) {
				handleError(err.message);
			} else {
				callback?.(token);
			}
		});
	}
};

export const handleRequestBody = <T>(req:IncomingMessage, callback: (payload: T) => Promise<void>) => {
	let body = ``;
	req.on(`data`, (chunk) => {
		body += chunk.toString();
	});
	req.on(`end`, () => {
		const payload = !!body ? JSON.parse(body) : {};
		callback(payload)
			.catch(console.log);
	});
};

export { prisma };