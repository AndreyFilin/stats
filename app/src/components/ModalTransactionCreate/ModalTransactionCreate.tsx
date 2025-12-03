import {useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Modal, {ModalActions, type IModalProps} from "../Modal";
import Button from "../Button";
import Form from "../Form";
import FieldText from "../FieldText";
import FieldCombobox from "../FieldCombobox";
import useTransactionCreate from "../../mutations/useTransactionCreate.tsx";
import useGetTransactionCategoriesList from "../../queries/useGetTransactionGategoriesList.ts";

interface ITransactionCreateFormValues {
	title: string;
	value: number;
	category: string;
}

const ModalTransactionCreate = (props: IModalProps) => {
	const {close} = props;

	const transactionCategoriesRes = useGetTransactionCategoriesList();
	const transactionCategories = transactionCategoriesRes?.data?.data;
	const categoriesOptions = transactionCategories?.map((category) => ({
		title: category.title,
		value: category.sys_name,
	}));

	const {
		mutate: transactionCreate,
		isPending: transactionCreatePending
	} = useTransactionCreate();

	const methods = useForm<ITransactionCreateFormValues>({
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

	const handleSubmit = useCallback((values: ITransactionCreateFormValues) => {
		transactionCreate(values);
		close();
	}, [transactionCreate, close]);

	return (
		<Modal
			title={`Создать запись`}
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
							disabled={transactionCreatePending}
						>{`Создать`}</Button>
						<Button
							type={`button`}
							kind={`secondary`}
							onClick={close}
						>{`Отменить`}</Button>
					</ModalActions>
				</Form>
			</FormProvider>
		</Modal>
	);
}

export default ModalTransactionCreate;