import {type HTMLAttributes, memo} from "react";
import classNames from "classnames";
import "./style.css";

const Loader = (props: HTMLAttributes<HTMLDivElement>) => {
	const {className, ...restProps} = props;
	return <div className={classNames(`loader`, className)} {...restProps} />;
};

export default memo(Loader)