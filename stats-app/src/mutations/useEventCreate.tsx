import {useMutation, useQueryClient} from "@tanstack/react-query";
import {eventCreate} from "../api/Api";

const useEventCreate = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: eventCreate,
		mutationKey: [`event_create`],
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: [`events`]});
		}
	});
};

export default useEventCreate;