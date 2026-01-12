import {type InputHTMLAttributes, memo} from "react";
import {Controller, type RegisterOptions, useFormContext} from "react-hook-form";
import Field from "../Field/Field";

export interface IFieldTextProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	rules?: RegisterOptions;
}

const FieldText = (props: IFieldTextProps) => {
	const {className, label, name, rules, ...restProps} = props;
	const {control} = useFormContext();
	if (!control) return null;

	return (
		<Controller
			control={control}
			name={name!}
			rules={rules}
			render={({field, fieldState}) => (
				<Field
					className={className}
					label={label}
					name={name}
					error={fieldState.error?.message}
				>
					<input
						id={name}
						{...field}
						{...restProps}
					/>
				</Field>
			)}
		/>
	);
};

export default memo(FieldText);