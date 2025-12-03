import {memo, type ReactNode} from "react";
import classNames from "classnames";
import "./style.css";

interface IFiledProps {
	className?: string;
	children?: ReactNode;
	name: string;
	label?: string | ReactNode;
	error?: string;
}

const Field = (props: IFiledProps) => {
	const {className, children, label, error, ...restProps} = props;
	return (
		<label
			className={classNames(`field`, {'field-error': !!error}, className)}
			htmlFor={props.name}
			{...restProps}
		>
			{label && <span className={`field__label`}>{label}</span>}
			<div className={`field__input_wrap`}>{children}</div>
			{error && <span className={`field__error`}>{error}</span>}
		</label>
	);
};

export default memo(Field);