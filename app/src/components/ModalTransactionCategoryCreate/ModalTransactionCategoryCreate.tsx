import {useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Modal, {ModalActions, type IModalProps} from "../Modal";
import Button from "../Button";
import Form from "../Form";
import FieldText from "../FieldText";
import useTransactionCategoryCreate from "../../mutations/useTransactionCategoryCreate";
import type {ITransactionCategoryCreate} from "../../../../apiInterface";

const ModalTransactionCategoryCreate = (props: IModalProps) => {
	const {close} = props;

	const {
		mutate: transactionCategoryCreate,
		isPending: transactionCategoryCreatePending
	} = useTransactionCategoryCreate();

	const methods = useForm<ITransactionCategoryCreate>({
		defaultValues: {
			title: ``,
			sys_name: ``
		},
		resetOptions: {
			keepDirtyValues: true,
			keepErrors: true
		}
	});

	const handleSubmit = useCallback((values: ITransactionCategoryCreate) => {
		transactionCategoryCreate(values);
		close();
	}, [transactionCategoryCreate, close]);

	return (
		<Modal
			title={`Создать категорию`}
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
					<FieldText
						name={`sys_name`}
						placeholder={`Системное имя`}
						required={true}
					/>

					<ModalActions>
						<Button
							disabled={transactionCategoryCreatePending}
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

export default ModalTransactionCategoryCreate;