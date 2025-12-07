import {memo} from "react";
import PrivatePage from "../../components/PrivatePage";
import AdminNav from "../../components/AdminNav";
import {PageActions, PageCaption, PageTitle} from "../../components/Page";
import "./style.css";

const UsersPage = () => {
	return (
		<PrivatePage allowed={[`admin`]}>
			<AdminNav />
			<PageCaption>
				<PageTitle>{`Пользователи`}</PageTitle>
				<PageActions>

				</PageActions>
			</PageCaption>
		</PrivatePage>
	);
};

export default memo(UsersPage);