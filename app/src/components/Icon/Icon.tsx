import {type HTMLAttributes, memo} from "react";
import classNames from "classnames";
import "./style.css";

export type TIconType =
	`menu` |
	`search` |
	`plus` |
	`switch` |
	`edit` |
	`delete` |
	`feedback` |
	`download` |
	`dashboard` |
	`person` |
	`retail` |
	`partner` |
	`group` |
	`offer` |
	`mailing` |
	`report` |
	`file` |
	`arrow_up` |
	`close` |
	`arrow_down`;

export type TIconVariant = `filled` | `outline`;

interface IIconProps extends HTMLAttributes<HTMLDivElement> {
	kind: TIconType;
	variant?: TIconVariant;
}

const Icon = (props: IIconProps) => {
	const {
		kind,
		variant = `filled`,
		className,
		...restProps
	} = props;

	return (
		<span
			{...restProps}
			className={classNames(
				`icon`,
				{[`icon-${kind}`]: !!kind},
				{[`icon-outline`]: variant === `outline`},
				className
			)}
		/>
	);
}

export default memo(Icon);