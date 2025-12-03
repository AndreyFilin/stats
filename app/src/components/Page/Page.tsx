import {type HTMLAttributes, memo} from "react";
import "./style.css";

const Page = (props: HTMLAttributes<HTMLDivElement>) => {
	return <div className={`page`}>{props.children}</div>;
};

export const PageCaption = (props: HTMLAttributes<HTMLHeadingElement>) => {
	return <div className={`page__caption`}>{props.children}</div>;
};

export const PageTitle = (props: HTMLAttributes<HTMLHeadingElement>) => {
	return <h1 className={`page__title`}>{props.children}</h1>;
};

export const PageActions = (props: HTMLAttributes<HTMLHeadingElement>) => {
	return <div className={`page__actions`}>{props.children}</div>;
};

export const PageError = (props: HTMLAttributes<HTMLHeadingElement>) => {
	return <div className={`page__error`}>{props.children}</div>;
};

export const PageLoader = () => {
	return (
		<div className={`page__loader`}>
			{`...loading`}
		</div>
	);
};

export default memo(Page);