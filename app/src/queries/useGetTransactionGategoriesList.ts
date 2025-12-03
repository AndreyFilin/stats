import {useQuery} from "@tanstack/react-query";
import {fetchTransactionCategoriesList} from "../api/Api.ts";
import type {IResponseData} from "../utils/request.ts";
import type {ITransactionCategory} from "../types.ts";

const useGetTransactionCategoriesList = () => {
	return useQuery<IResponseData<ITransactionCategory[]>>({
		queryKey: [`transaction_categories`],
		queryFn: fetchTransactionCategoriesList
	});
};

export default useGetTransactionCategoriesList;