import {memo, useState} from "react";
import {type ITransaction} from "../../types";
import Page, {PageActions, PageCaption, PageTitle} from "../../components/Page";
import Button from "../../components/Button";
import Transaction from "../../components/Transaction";
import ModalTransactionCreate from "../../components/ModalTransactionCreate";
import ModalTransactionUpdate from "../../components/ModalTransactionUpdate";
import useGetTransactionsList from "../../queries/useGetTransactionsList";

const BudgetPage = () => {
	const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const [transactionEditPointer, setTransactionEditPointer] = useState<number | null>(null);
	const transactionsRes = useGetTransactionsList();
	const transactions: ITransaction[] = transactionsRes.data?.data ?? [];

	return (
		<Page>
			<PageCaption>
				<PageTitle>{`Бюджет`}</PageTitle>
				<PageActions>
					<Button
						isIcon={true}
						icon={`plus`}
						size={`small`}
						onClick={() => setCreateModalOpen(true)}
					>{`Добавить`}</Button>
				</PageActions>
			</PageCaption>

			{!!transactions.length && (
				<div className={`entities`}>
					{transactions?.map((transaction) => (
						<Transaction
							key={transaction.id}
							{...transaction}
							onUpdate={setTransactionEditPointer}
						/>
					))}
				</div>
			)}

			{isCreateModalOpen && (
				<ModalTransactionCreate
					close={() => setCreateModalOpen(false)}
				/>
			)}

			{!!transactionEditPointer && (
				<ModalTransactionUpdate
					transactionId={transactionEditPointer}
					close={() => setTransactionEditPointer(null)}
				/>
			)}
		</Page>
	);
};

export default memo(BudgetPage);