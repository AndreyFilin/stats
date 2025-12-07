import {useQuery} from "@tanstack/react-query";
import {fetchTransactionsList} from "../api/Api";
import type {IResponseData} from "../utils/request";
import type {ITransaction} from "../types";

const useGetTransactionsList = () => {
	return useQuery<IResponseData<ITransaction[]>>({
		queryKey: [`transactions`],
		queryFn: fetchTransactionsList
	});
};

export default useGetTransactionsList;