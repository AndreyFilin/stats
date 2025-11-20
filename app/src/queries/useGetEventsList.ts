import {useQuery} from "@tanstack/react-query";
import {fetchEventsList} from "../api/Api.ts";
import type {IResponseData} from "../utils/request.ts";
import type {IEvent} from "../types.ts";

const useGetEventsList = () => {
	return useQuery<IResponseData<IEvent[]>>({
		queryKey: [`events`],
		queryFn: fetchEventsList
	});
};

export default useGetEventsList;