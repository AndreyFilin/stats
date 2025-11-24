import {useState} from "react";
import type {ITransaction} from "../../types.ts";
import Page, {PageTitle} from "../../components/Page";
import Button from "../../components/Button";
import ModalTransactionCreate from "../../components/ModalTransactionCreate";
import useGetTransactionsList from "../../queries/useGetTransactionsList.ts";
import useTransactionRemove from "../../mutations/useTransactionRemove.tsx";

const BudgetPage = () => {
	const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

	const transactionsRes = useGetTransactionsList();
	const transactions: ITransaction[] = transactionsRes.data?.data ?? [];

	const {
		mutate: transactionRemove,
		isPending: transactionRemovePending
	} = useTransactionRemove();

	return (
		<Page>
			<PageTitle>
				{`Бюджет`}
				<Button
					isIcon={true}
					icon={`plus`}
					size={`small`}
					onClick={() => setCreateModalOpen(true)}
				>{`Добавить`}</Button>
			</PageTitle>

			{!!transactions.length && (
				<div className={`entities`}>
					{transactions?.map(({id, title}) => (
						<div key={id} className={`entity`}>
							{id}&mdash;{title}
							<Button
								isIcon={true}
								icon={`delete`}
								onClick={() => transactionRemove({id})}
								disabled={transactionRemovePending}
								size={`small`}
							>{`Удалить`}</Button>
						</div>
					))}
				</div>
			)}

			{isCreateModalOpen && (
				<ModalTransactionCreate
					close={() => setCreateModalOpen(false)}
				/>
			)}
		</Page>
	);
};

export default BudgetPage;