import {useQuery} from "@tanstack/react-query";
import {fetchTransaction} from "../api/Api";
import type {IResponseData} from "../utils/request";
import type {ITransaction} from "../types";

const useGetTransaction = (id: number) => {
	return useQuery<IResponseData<ITransaction>>({
		queryKey: [`transaction`, id],
		queryFn: () => fetchTransaction(id)
	});
};

export default useGetTransaction;