import {useQuery} from "@tanstack/react-query";
import {fetchProfile} from "../api/Api";
import type {IResponseData} from "../utils/request";
import type {IProfile} from "../types";

const useGetProfile = () => {
	return useQuery<IResponseData<IProfile>>({
		queryKey: [`profile`],
		queryFn: fetchProfile
	});
};

export default useGetProfile;