import type {IEndpoint} from "../../types";
import jwt, {VerifyErrors} from "jsonwebtoken";
import {prisma} from "../../db/prisma";
import updateToken from "../../utils/updateToken";

const Refresh: IEndpoint = async (req, res) => {
	const rawCookies = req.headers.cookie;
	const cookies = rawCookies ? Object.fromEntries(
		rawCookies.split('; ').map(c => c.split('='))
	) : {};

	const refreshToken = cookies['refreshToken'];
	if (!refreshToken) {
		res.writeHead(403, {'Content-Type': `text/plain; charset=utf-8;`});
		res.end(`Unauthorized`);
		return;
	}

	// @ts-ignore Something strange
	jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, async (err: VerifyErrors, decoded) => {
		if (err) {
			res.writeHead(403, {'Content-Type': `text/plain; charset=utf-8;`});
			res.end();
			return;
		}

		const user = await prisma.users.findUnique({
			select: {
				id: true,
				login: true
			},
			where: {
				id: decoded.userId,
				token: refreshToken
			}
		});

		await updateToken(res, user);
	});
}

export default Refresh;