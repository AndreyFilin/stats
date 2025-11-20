import {useMutation, useQueryClient} from "@tanstack/react-query";
import {transactionRemove} from "../api/Api";

const useTransactionRemove = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: transactionRemove,
		mutationKey: [`transaction_remove`],
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: [`transactions`]});
		}
	});
};

export default useTransactionRemove;