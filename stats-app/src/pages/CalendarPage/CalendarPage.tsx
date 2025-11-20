import type {IEvent} from "../../types.ts";
import Page, {PageTitle} from "../../components/Page";
import Button from "../../components/Button";
import useGetEventsList from "../../queries/useGetEventsList.ts";
import useEventCreate from "../../mutations/useEventCreate.tsx";
import useEventRemove from "../../mutations/useEventRemove.tsx";

const CalendarPage = () => {
	const eventsRes = useGetEventsList();
	const events: IEvent[] = eventsRes.data?.data ?? [];

	const {
		mutate: eventCreate,
		isPending: eventCreatePending
	} = useEventCreate();

	const {
		mutate: eventRemove,
		isPending: eventRemovePending
	} = useEventRemove();

	return (
		<Page>
			<PageTitle>{`Календарь`}</PageTitle>
			<button
				onClick={() => eventCreate({})}
				disabled={eventCreatePending}
			>{`Добавить`}</button>

			{!!events.length && (
				<div className={`entities`}>
					{events?.map(({id, created_at}) => (
						<div key={id} className={`entity`}>
							{id}&mdash;{new Date(created_at).toUTCString()}
							<Button
								onClick={() => eventRemove({id})}
								disabled={eventRemovePending}
							>{`Удалить`}</Button>
						</div>
					))}
				</div>
			)}
		</Page>
	);
};

export default CalendarPage;