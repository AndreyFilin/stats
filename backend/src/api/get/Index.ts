import type {IEndpoint} from "../../types";

const Index: IEndpoint = async (_, res) => {
	res.writeHead(200, { 'Content-Type': `text/html; charset=utf-8;` });
	res.end(`<h1>Hello There!!!!</h1>`);
};

export default Index;