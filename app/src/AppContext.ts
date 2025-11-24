import {createContext} from "react";

interface IAppContext {
	token: string | null;
	logout: (() => void) | null,
	login: ((token: string) => void) | null
}

export const AppContext = createContext<IAppContext>({
	token: null,
	logout: null,
	login: null
});
