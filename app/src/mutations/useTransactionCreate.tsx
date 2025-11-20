import {useMutation, useQueryClient} from "@tanstack/react-query";
import {transactionCreate} from "../api/Api";

const useTransactionCreate = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: transactionCreate,
		mutationKey: [`transaction_create`],
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: [`transactions`]});
		}
	});
};

export default useTransactionCreate;