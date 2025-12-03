import {memo} from "react";
import classNames from "classnames";
import Button from "../Button";
import "./style.css";
import type {ITransaction} from "../../types.ts";
import useTransactionRemove from "../../mutations/useTransactionRemove.tsx";

interface ITransactionProps extends ITransaction {
	onUpdate: (id: number) => void
}

const Transaction = (props: ITransactionProps) => {
	const {id, title, value, onUpdate} = props;
	const {
		mutate: transactionRemove,
		isPending: transactionRemovePending
	} = useTransactionRemove();

	return (
		<div className={classNames(
			`transaction`,
			{[`transaction-income`]: value > 0},
			{[`transaction-outcome`]: value < 0},
		)}>
			<div className={`transaction__logo`} />
			<div className={`transaction__title`}>{title}</div>
			<div className={`transaction__value`}>{value}</div>
			<div className={`transaction__actions`}>
				<Button
					isIcon={true}
					icon={`edit`}
					size={`small`}
					onClick={() => onUpdate(id)}
				>{`Изменить`}</Button>

				<Button
					isIcon={true}
					icon={`delete`}
					size={`small`}
					onClick={() => transactionRemove(id)}
					disabled={transactionRemovePending}
				>{`Удалить`}</Button>
			</div>
		</div>
	);
};

export default memo(Transaction);