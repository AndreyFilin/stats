import {useMutation, useQueryClient} from "@tanstack/react-query";
import {transactionUpdate} from "../api/Api";

const useTransactionUpdate = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: transactionUpdate,
		mutationKey: [`transaction_update`],
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: [`transactions`]});
		}
	});
};

export default useTransactionUpdate;