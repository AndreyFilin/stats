import {useQuery} from "@tanstack/react-query";
import {fetchProfile} from "../api/Api.ts";
import type {IResponseData} from "../utils/request.ts";
import type {IProfile} from "../types.ts";

const useGetProfile = () => {
	return useQuery<IResponseData<IProfile>>({
		queryKey: [`profile`],
		queryFn: fetchProfile
	});
};

export default useGetProfile;