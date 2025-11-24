import {useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Modal, {ModalActions, type IModalProps} from "../Modal";
import Button from "../Button";
import Form from "../Form";
import FieldText from "../FieldText";
import useTransactionCreate from "../../mutations/useTransactionCreate.tsx";

interface ICreateTransactionFormValues {
	title: string;
	value: number;
	category: string;
}

const ModalTransactionCreate = (props: IModalProps) => {
	const {close} = props;

	const {
		mutate: transactionCreate,
		isPending: transactionCreatePending
	} = useTransactionCreate();

	const methods = useForm<ICreateTransactionFormValues>({
		defaultValues: {
			title: ``,
			value: 0,
			category: `00000000-0000-0000-0000-000000000000`,
		},
		resetOptions: {
			keepDirtyValues: true,
			keepErrors: true
		}
	});

	const handleSubmit = useCallback((values: ICreateTransactionFormValues) => {
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
						>{`Закрыть`}</Button>
					</ModalActions>
				</Form>
			</FormProvider>
		</Modal>
	);
}

export default ModalTransactionCreate;