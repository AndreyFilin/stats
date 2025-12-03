import type {IEvent} from "../../types.ts";
import classNames from "classnames";
import Page, {PageActions, PageCaption, PageTitle} from "../../components/Page";
import Button from "../../components/Button";
import "./style.css";
import useGetEventsList from "../../queries/useGetEventsList.ts";
import useEventCreate from "../../mutations/useEventCreate.tsx";
import useEventRemove from "../../mutations/useEventRemove.tsx";
import {memo} from "react";

interface ICalendarMonthProps {
	date: Date;
}

const months = [`Январь`, `Февраль`, `Март`, `Апрель`, `Май`, `Июнь`, `Июль`, `Авгусь`, `Сентябрь`, `Октябрь`, `Ноябрь`, `Декабрь`];

const CalendarMonth = (props: ICalendarMonthProps) => {
	const d = new Date(props.date);
	const year = d?.getFullYear()
	const month = d?.getMonth() + 1;
	const monthDaysCount = new Date(year, month, 0).getDate();

	return (
		<div className={`month`}>
			<div className={`month__caption`}>{months[props.date.getMonth()]} {props.date.getFullYear()}</div>
			<div className={`month__days`}>
				{new Array(monthDaysCount).fill(0).map((_, i) => {
					const date = new Date(props.date.getFullYear(), props.date.getMonth(), i + 1);
					return (
						<div
							key={i}
							className={classNames(`day`, {[`day-w${date?.getDay()}`]: i === 0})}
						>{i + 1}</div>
					);
				})}
			</div>
		</div>
	);
};

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
			<PageCaption>
				<PageTitle>{`Календарь`}</PageTitle>
				<PageActions>
					<Button
						isIcon={true}
						icon={`plus`}
						size={`small`}
						onClick={() => eventCreate({})}
						disabled={eventCreatePending}
					>{`Добавить`}</Button>
				</PageActions>
			</PageCaption>

			<div className={`calendar`}>
				<CalendarMonth date={new Date()}/>
			</div>

			{!!events.length && (
				<div
					className={`entities`}
					style={{display: `none`}}
				>
					{events?.map(({id, created_at}) => (
						<div key={id} className={`entity`}>
							{id}&mdash;{new Date(created_at).toUTCString()}
							<Button
								isIcon={true}
								icon={`delete`}
								onClick={() => eventRemove({id})}
								disabled={eventRemovePending}
								size={`small`}
							>{`Удалить`}</Button>
						</div>
					))}
				</div>
			)}
		</Page>
	);
};

export default memo(CalendarPage);