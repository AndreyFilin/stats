import Link from "../../components/Link";
import PrivatePage from "../../components/PrivatePage";
import "./style.css";
import {Route, Routes} from "react-router-dom";

const AdminPage = () => {
	return (
		<PrivatePage allowed={[`admin`]}>
			<nav className={`admin__navigation`}>
				<Link to={`/admin`} end={true}>{`Категории`}</Link>
				<Link to={`/admin/users`}>{`Пользователи`}</Link>
			</nav>
			<Routes>
				<Route path={``} element={<>{`1`}</>}/>
				<Route path={`users`} element={<>{`2`}</>}/>
			</Routes>
		</PrivatePage>
	);
}

export default AdminPage;