import {memo} from "react";
import Link from "../Link";
import "./style.css";

const AdminNav = () => {
	return (
		<nav className={`admin__navigation`}>
			<Link to={`/admin`} end={true}>{`Категории`}</Link>
			<Link to={`/admin/users`}>{`Пользователи`}</Link>
		</nav>
	);
};

export default memo(AdminNav);