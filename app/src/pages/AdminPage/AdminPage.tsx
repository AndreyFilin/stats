import {lazy, memo} from "react";
import {Route, Routes} from "react-router-dom";
import {PageError} from "../../components/Page";
const TransactionCategoriesPage = lazy(() => import(`../TransactionCategoriesPage`));
const UsersPage = lazy(() => import(`../UsersPage`));

const AdminPage = () => {
	return (
		<Routes>
			<Route path={``} element={<TransactionCategoriesPage />}/>
			<Route path={`users`} element={<UsersPage />}/>
			<Route path={`*`} element={<PageError>{`404 Not Found`}</PageError>} />
		</Routes>
	);
}

export default memo(AdminPage);