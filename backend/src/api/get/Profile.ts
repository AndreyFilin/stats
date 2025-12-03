import {handleAuthorization, prisma} from "../../db/prisma";
import type {IEndpoint} from "../../types";

const Profile: IEndpoint = async (req, res) => {
	await handleAuthorization(req, res, async (token: string) => {
		const profile = await prisma.users.findFirst({
			select: {
				login: true,
				role: true
			},
			where: {
				token
			}
		});
		res.writeHead(200, {'Content-Type': `text/json; charset=utf-8;`});
		res.end(JSON.stringify(profile));
	});
};

export default Profile;