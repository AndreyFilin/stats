import {memo, type ReactNode} from "react";
import Page, {PageError} from "../Page";
import useGetProfile from "../../queries/useGetProfile.ts";

interface IPrivatePageProps {
	allowed: string[];
	children?: ReactNode;
}

const PrivatePage = (props: IPrivatePageProps) => {
	const {allowed, children} = props;
	const profileRes = useGetProfile();
	const profileData = profileRes?.data?.data;

	if (
		!profileData?.role ||
		!allowed.includes(profileData?.role)
	) {
		return (
			<PageError>{`403 Access Denied`}</PageError>
		);
	}

	return (
		<Page>{children}</Page>
	);
};

const areArraysEqual = (arr1: unknown[], arr2: unknown[]) => {
	if (arr1.length !== arr2.length) {
		return false;
	}
	for (let i: number = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
};

export default memo(PrivatePage, ({allowed}, {allowed: nextAllowed}) => areArraysEqual(allowed, nextAllowed));