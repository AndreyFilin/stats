import {type InputHTMLAttributes, memo, type SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import classNames from "classnames";
import Field from "../Field/Field";
import "./style.css";

export interface IComboboxItemProps {
	title: string;
	value: string;
}

export interface IFieldComboboxProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	rules?: any;
	options?: IComboboxItemProps[];
}

const FieldCombobox = (props: IFieldComboboxProps) => {
	const anchorRef = useRef<HTMLDivElement>(null);
	const padRef = useRef<HTMLDivElement>(null);
	const [fieldValue, setFieldValue] = useState<string>();
	const [isUpper, setIsUpper] = useState<boolean>(false);
	const [isActive, setActive] = useState<boolean>(false);

	const {className, label, name, rules, options = [], ...restProps} = props;
	const {control, setValue, watch} = useFormContext();

	const handlePosition = useCallback(() => {
		const anchorRect = anchorRef.current?.getBoundingClientRect();
		const padRect = padRef.current?.getBoundingClientRect();
		if (anchorRect && padRect) {
			setIsUpper((anchorRect.top + anchorRect.height + padRect.height) > window.innerHeight + window.pageYOffset);
		}
	}, [anchorRef, padRef]);

	useEffect(() => {
		if (isActive) {
			document.addEventListener(`mousedown`, close);
			handlePosition();
			return () => {
				document.removeEventListener(`mousedown`, close);
			}
		}
	}, [isActive, handlePosition]);

	const valueWatch = watch(name);
	useEffect(() => {
		setFieldValue(options?.find((item) => item.value === valueWatch)?.title);
	}, [valueWatch, options]);

	const close = () => {
		setActive(() => false);
	};

	const toggle = (ev?: SyntheticEvent) => {
		ev?.stopPropagation();
		setActive(isActive => !isActive);
	};

	const handleSelect = (item: IComboboxItemProps) => {
		setValue(name, item.value);
		setFieldValue(item.title);
		setActive(false);
	};

	if (!control) return null;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({field, fieldState}) => (
				<div
					ref={anchorRef}
					className={classNames(
						`combobox`,
						{[`combobox-active`]: isActive},
						{[`combobox-disabled`]: !!props.disabled}
					)}
					onClick={isActive ? (ev) => ev.preventDefault() : toggle}
				>
					<Field
						className={className}
						label={label}
						name={name}
						error={fieldState.error?.message}
					>
						<input
							id={name}
							type={`hidden`}
							{...field}
						/>
						<input
							{...restProps}
							readOnly={true}
							defaultValue={fieldValue}
						/>
					</Field>

					{isActive && (
						<div
							ref={padRef}
							className={classNames(`combobox__pad`, {'combobox__pad-upper': isUpper})}
							onMouseDown={(ev)=> ev.stopPropagation()}
						>
							{!!options.length && (
								<div className={`combobox__options`}>
									{options?.map((item) => (
										<div
											key={item.value}
											className={classNames(
												`combobox__option`,
												{'combobox-option-active': valueWatch === item.value}
											)}
											onClick={() => handleSelect(item)}
										>{item.title}</div>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			)}
		/>
	);
};

export default memo(FieldCombobox);