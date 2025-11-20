import React, {FormEvent, FormHTMLAttributes, memo, useCallback} from "react";
import classNames from "classnames";
import "./style.css";

const Form = (props: FormHTMLAttributes<HTMLFormElement>) => {
	const {className, onSubmit, children, ...restProps} = props;

	const handleSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		onSubmit?.(ev);
	}, [onSubmit]);

	return (
		<form
			className={classNames(`form`, className)}
			onSubmit={handleSubmit}
			{...restProps}
		>{children}</form>
	);
};

export default memo(Form);