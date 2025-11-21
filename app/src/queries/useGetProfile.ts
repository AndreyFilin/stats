import {useQuery} from "@tanstack/react-query";
import {fetchProfile} from "../api/Api.ts";
import type {IResponseData} from "../utils/request.ts";
import type {IProfile} from "../types.ts";
import {useContext} from "react";
import {AppContext} from "../App.tsx";

const useGetProfile = () => {
	const {token} = useContext(AppContext);
	return useQuery<IResponseData<IProfile>>({
		queryKey: [token, `profile`],
		queryFn: fetchProfile
	});
};

export default useGetProfile;