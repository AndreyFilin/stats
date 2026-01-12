import crypto from "node:crypto";
import {handleRequestBody, prisma} from "../../db/prisma";
import type {IEndpoint} from "../../types";
import updateToken from "../../utils/updateToken";

interface ILoginPayload {
	login: string;
	password: string;
}

const Login: IEndpoint = async (req, res) => {
    handleRequestBody<ILoginPayload>(req, async (payload) => {
	    const {login, password} = payload;
	    const hash = crypto.createHash(`md5`);
	    hash.update(password);
	    const md5Password = hash.digest(`hex`);

		const user = await prisma.users.findUnique({
			select: {
				id: true,
				login: true
			},
		    where: {
			    login,
			    password: md5Password
		    }
	    });

		await updateToken(res, user);
    });
};

export default Login;