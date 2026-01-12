import jwt from "jsonwebtoken";
import {prisma} from "../db/prisma";
import {ServerResponse} from "node:http";

const updateToken = async (res: ServerResponse, user: {id: string, login: string} | null) => {
	if (!user) {
		res.writeHead(403, {'Content-Type': `text/plain; charset=utf-8;`});
		res.end();
	} else {
		const tokenPayload = {
			userId: user.id,
			login: user.login
		};

		const accessToken = jwt.sign(
			tokenPayload,
			process.env.JWT_ACCESS_SECRET!,
			{ expiresIn: '5m' }
		);

		const refreshToken = jwt.sign(
			tokenPayload,
			process.env.JWT_REFRESH_SECRET!,
			{ expiresIn: '7d' }
		);

		await prisma.users.update({
			data: {
				token: refreshToken
			},
			where: {
				id: user.id
			}
		});

		res.writeHead(200, {
			'Content-Type': `text/json; charset=utf-8;`,
			'Set-Cookie': `refreshToken=${refreshToken}; Max-Age=${7 * 24 * 60 * 60}; Path=/; HttpOnly`
		});
		res.end(JSON.stringify({token: accessToken}));
	}
};

export default updateToken;