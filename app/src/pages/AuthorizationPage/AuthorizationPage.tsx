import {useCallback, useContext} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Page from "../../components/Page";
import Form from "../../components/Form";
import FieldText from "../../components/FieldText";
import Button from "../../components/Button";
import "./style.css";
import {AppContext} from "../../AppContext.ts";
import {login} from "../../api/Api.ts";

interface ISignInFormValues {
	email: string;
	password: string;
}

const AuthorizationPage = () => {
	const {login: handleLogin} = useContext(AppContext);

	const methods = useForm<ISignInFormValues>({
		defaultValues: {
			email: `admin`,
			password: `123456`,
		},
		resetOptions: {
			keepDirtyValues: true,
			keepErrors: true
		}
	});

	const handleSubmit = useCallback(async (values: ISignInFormValues) => {
		const {email, password} = values;
		const loginRes = await login(email, password);
		if (loginRes?.data?.token && handleLogin) {
			handleLogin(loginRes?.data?.token);
		}
	}, [handleLogin]);

	return (
		<Page>
			<FormProvider {...methods}>
				<Form
					className={`authorization__form`}
					onSubmit={methods.handleSubmit(handleSubmit)}
				>
					<FieldText
						className={`authorization__field-login`}
						label={`Логин`}
						name={`email`}
						disabled={methods.formState.isSubmitting}
						placeholder={`email@mail.com`}
						autoComplete={`on`}
						rules={{
							required: `Заполните поле`
						}}
					/>
					<FieldText
						className={`authorization__field-password`}
						label={`Пароль`}
						name={`password`}
						disabled={methods.formState.isSubmitting}
						autoComplete={`on`}
						rules={{
							required: `Заполните поле`
						}}
					/>
					<Button isFetching={methods.formState.isSubmitting}>{`Войти`}</Button>
				</Form>
			</FormProvider>
		</Page>
	);
}

export default AuthorizationPage;