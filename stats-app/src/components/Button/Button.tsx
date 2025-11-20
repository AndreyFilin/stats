import {type ButtonHTMLAttributes, memo} from "react";
import classNames from "classnames";
import Icon, {type TIconType} from "../Icon/Icon";
import Loader from "../Loader/Loader";
import "./style.css";

export type TButtonKind = `primary` | `secondary` | `additional` | `danger`;
export type TButtonSize = `small` | `normal`;

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isFetching?: boolean;
	isIcon?: boolean;
	isSkeleton?: boolean;
	kind?: TButtonKind;
	icon?: TIconType;
	size?: TButtonSize;
}

const Button = (props: IButtonProps)=> {
	const {
		className,
		children,
		isFetching,
		isIcon,
		isSkeleton,
		disabled,
		icon,
		kind = `primary`,
		size = `normal`,
		...restProps
	} = props;

	return (
		<button
			className={classNames(
				`button`,
				`button-${kind}`,
				{[`button-${size}`]: !!size},
				{[`button-processing`]: isFetching},
				{[`button-skeleton`]: isSkeleton},
				{[`button-icon`]: isIcon},
				className
			)}
			disabled={disabled || isFetching || isSkeleton}
			{...restProps}
		>
			{icon && <Icon kind={icon} />}
			{children}
			{isFetching && <Loader className={`button__loader`} />}
		</button>
	);
};

export default memo(Button);