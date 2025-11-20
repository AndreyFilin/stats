import type {ITransaction} from "../../types.ts";
import Page, {PageTitle} from "../../components/Page";
import Button from "../../components/Button";
import useGetTransactionsList from "../../queries/useGetTransactionsList.ts";
import useTransactionCreate from "../../mutations/useTransactionCreate.tsx";
import useTransactionRemove from "../../mutations/useTransactionRemove.tsx";

const BudgetPage = () => {
	const transactionsRes = useGetTransactionsList();
	const transactions: ITransaction[] = transactionsRes.data?.data ?? [];

	const {
		mutate: transactionCreate,
		isPending: transactionCreatePending
	} = useTransactionCreate();

	const {
		mutate: transactionRemove,
		isPending: transactionRemovePending
	} = useTransactionRemove();

	return (
		<Page>
			<PageTitle>{`Бюджет`}</PageTitle>
			<button
				onClick={() => transactionCreate({})}
				disabled={transactionCreatePending}
			>{`Добавить`}</button>

			{!!transactions.length && (
				<div className={`entities`}>
					{transactions?.map(({id, created_at}) => (
						<div key={id} className={`entity`}>
							{id}&mdash;{new Date(created_at).toUTCString()}
							<Button
								onClick={() => transactionRemove({id})}
								disabled={transactionRemovePending}
							>{`Удалить`}</Button>
						</div>
					))}
				</div>
			)}
		</Page>
	);
};

export default BudgetPage;