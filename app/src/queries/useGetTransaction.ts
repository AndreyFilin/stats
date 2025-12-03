import {useQuery} from "@tanstack/react-query";
import {fetchTransaction} from "../api/Api.ts";
import type {IResponseData} from "../utils/request.ts";
import type {ITransaction} from "../types.ts";

const useGetTransaction = (id: number) => {
	return useQuery<IResponseData<ITransaction>>({
		queryKey: [`transaction`, id],
		queryFn: () => fetchTransaction(id)
	});
};

export default useGetTransaction;