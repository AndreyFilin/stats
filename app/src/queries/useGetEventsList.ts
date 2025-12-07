import {useQuery} from "@tanstack/react-query";
import {fetchEventsList} from "../api/Api";
import type {IResponseData} from "../utils/request";
import type {IEvent} from "../types";

const useGetEventsList = () => {
	return useQuery<IResponseData<IEvent[]>>({
		queryKey: [`events`],
		queryFn: fetchEventsList
	});
};

export default useGetEventsList;