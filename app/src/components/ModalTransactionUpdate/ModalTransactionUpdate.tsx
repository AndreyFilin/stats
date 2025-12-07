import {useCallback, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Modal, {ModalActions, type IModalProps} from "../Modal";
import Button from "../Button";
import Form from "../Form";
import FieldText from "../FieldText";
import FieldCombobox from "../FieldCombobox";
import useTransactionUpdate from "../../mutations/useTransactionUpdate";
import useGetTransactionCategoriesList from "../../queries/useGetTransactionGategoriesList";
import useGetTransaction from "../../queries/useGetTransaction";
import type {ITransactionUpdate} from "../../../../apiInterface";

interface IModalTransactionUpdateProps extends IModalProps {
	transactionId: number;
}

const ModalTransactionUpdate = (props: IModalTransactionUpdateProps) => {
	const {transactionId, close} = props;
	const transactionRes = useGetTransaction(transactionId);
	const transactionData = transactionRes.data?.data;

	const transactionCategoriesRes = useGetTransactionCategoriesList();
	const transactionCategories = transactionCategoriesRes?.data?.data;
	const categoriesOptions = transactionCategories?.map((category) => ({
		title: category.title,
		value: category.sys_name,
	}));

	const {
		mutate: transactionUpdate,
		isPending: transactionUpdatePending
	} = useTransactionUpdate();

	const methods = useForm<ITransactionUpdate>({
		defaultValues: {
			title: ``,
			value: 0,
			category: ``,
		},
		resetOptions: {
			keepDirtyValues: true,
			keepErrors: true
		}
	});

	useEffect(() => {
		if (transactionRes.isFetched) {
			methods.reset(transactionData);
		}
	}, [methods, transactionData, transactionRes.isFetched]);

	const handleSubmit = useCallback((values: ITransactionUpdate) => {
		transactionUpdate(values);
		close();
	}, [transactionUpdate, close]);

	return (
		<Modal
			title={`Изменить запись`}
			isFetching={transactionRes.isFetching}
			close={close}
		>
			<FormProvider {...methods}>
				<Form onSubmit={methods.handleSubmit(handleSubmit)}>
					<FieldText
						name={`title`}
						placeholder={`Название`}
						required={true}
						autoFocus={true}
					/>
					<FieldCombobox
						name={`category`}
						placeholder={`Категория`}
						required={true}
						options={categoriesOptions}
					/>
					<FieldText
						name={`value`}
						placeholder={`Сумма`}
						required={true}
					/>

					<ModalActions>
						<Button
							disabled={transactionUpdatePending}
						>{`Применить`}</Button>
						<Button
							type={`button`}
							kind={`secondary`}
							onClick={close}
						>{`Отмена`}</Button>
					</ModalActions>
				</Form>
			</FormProvider>
		</Modal>
	);
}

export default ModalTransactionUpdate;