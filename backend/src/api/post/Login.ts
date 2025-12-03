import crypto from "node:crypto";
import {handleRequestBody, prisma} from "../../db/prisma";
import type {IEndpoint} from "../../types";

interface ILoginPayload {
	login: string;
	password: string;
}

const Login: IEndpoint = async (req, res) => {
    handleRequestBody<ILoginPayload>(req, async (payload) => {
        const {login, password} = payload;
        const token = crypto.randomUUID();
        const hash = crypto.createHash(`md5`);
        hash.update(password);
        const md5Password = hash.digest(`hex`);
		const user = await prisma.users.update({
			data: {
				token,
				token_created_at: new Date()
			},
			where: {
				login,
				password: md5Password
			}
		});
	    res.writeHead(200, { 'Content-Type': `text/json; charset=utf-8;` });
	    res.end(JSON.stringify({token: user.token}));
    });
};

export default Login;