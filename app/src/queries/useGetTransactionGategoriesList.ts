import {useQuery} from "@tanstack/react-query";
import {fetchTransactionCategoriesList} from "../api/Api";
import type {IResponseData} from "../utils/request";
import type {ITransactionCategory} from "../types";

const useGetTransactionCategoriesList = () => {
	return useQuery<IResponseData<ITransactionCategory[]>>({
		queryKey: [`transaction_categories`],
		queryFn: fetchTransactionCategoriesList
	});
};

export default useGetTransactionCategoriesList;