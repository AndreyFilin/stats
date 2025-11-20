import {useQuery} from "@tanstack/react-query";
import {fetchTransactionsList} from "../api/Api.ts";
import type {IResponseData} from "../utils/request.ts";
import type {ITransaction} from "../types.ts";

const useGetTransactionsList = () => {
	return useQuery<IResponseData<ITransaction[]>>({
		queryKey: [`transactions`],
		queryFn: fetchTransactionsList
	});
};

export default useGetTransactionsList;