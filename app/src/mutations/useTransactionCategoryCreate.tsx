import {useMutation, useQueryClient} from "@tanstack/react-query";
import {transactionCategoryCreate} from "../api/Api";

const useTransactionCategoryCreate = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: transactionCategoryCreate,
		mutationKey: [`transaction_category_create`],
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: [`transaction_categories`]});
		}
	});
};

export default useTransactionCategoryCreate;