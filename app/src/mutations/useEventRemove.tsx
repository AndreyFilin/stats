import {useMutation, useQueryClient} from "@tanstack/react-query";
import {eventRemove} from "../api/Api";

const useEventRemove = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: eventRemove,
		mutationKey: [`event_remove`],
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: [`events`]});
		}
	});
};

export default useEventRemove;