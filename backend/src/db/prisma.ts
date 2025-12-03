import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client";
import {IncomingMessage, ServerResponse} from "node:http";
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({adapter});

export const handleAuthorization = async (req: IncomingMessage, res: ServerResponse, callback: (token: string) => void) => {
	const token = req.headers.authorization?.split(' ')?.[1] ?? null;
	if (!token) {
		res.writeHead(401, {'Content-Type': `text/plain; charset=utf-8;`});
		res.end(`Error unauthorized`);
	} else {
		const user = await prisma.users.findFirst({
			select: {
				token: true
			},
			where: {
				token,
				token_created_at: {
					gt: new Date(new Date().setDate(new Date().getDate() - 1))
				}
			}
		});
		if (!user?.token) {
			res.writeHead(401, {'Content-Type': `text/plain; charset=utf-8;`});
			res.end(`Error unauthorized`);
		} else {
			callback(user.token);
		}
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