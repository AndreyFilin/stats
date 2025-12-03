import {memo} from "react";
import {NavLink, type NavLinkProps} from "react-router-dom";
import classNames from "classnames";
import "./style.css";

const Link = (props: NavLinkProps) => {
	const {className, children, ...rest} = props;
	return (
		<NavLink
			{...rest}
			className={classNames(`link`, className)}
		>{children}</NavLink>
	);
};

export default memo(Link);