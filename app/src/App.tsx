import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import "./utils/db";
import "./utils/ws";
import Header from "./components/Header";
import {PageError, PageLoader} from "./components/Page";
import {registerUnauthorizedCallback} from "./utils/authCallbacks";
import AuthorizationPage from "./pages/AuthorizationPage";
import "./App.css";
import {AppContext} from "./AppContext";
const BudgetPage = lazy(() => import(`./pages/BudgetPage`));
const CalendarPage = lazy(() => import(`./pages/CalendarPage`));
const StatisticsPage = lazy(() => import(`./pages/StatisticsPage`));
const AdminPage = lazy(() => import(`./pages/AdminPage`));

const App = () => {
	const [token, setToken] = useState<string | null>(localStorage.getItem(`token`));
	const queryClient = useQueryClient();

	const logout = useCallback(() => {
		localStorage.removeItem(`token`);
		queryClient.removeQueries();
		setToken(null);
	}, [queryClient, setToken]);

	const login = useCallback((token: string) => {
		localStorage.setItem(`token`, token);
		setToken(token);
	}, [setToken]);

	useEffect(() => {
		registerUnauthorizedCallback(logout);
	}, [logout]);

	return (
		<AppContext.Provider value={{token, login, logout}}>
			<div className={`app__layout`}>
				{!token && <AuthorizationPage />}
				{!!token && (
					<>
						<Header/>
						<Suspense fallback={<PageLoader/>}>
							<Routes>
								<Route index element={<BudgetPage/>}/>
								<Route path={`calendar`} element={<CalendarPage/>}/>
								<Route path={`statistics`} element={<StatisticsPage/>}/>
								<Route path={`admin/*`} element={<AdminPage/>}/>
								<Route path={`*`} element={<PageError>{`404 Not Found`}</PageError>} />
							</Routes>
						</Suspense>
					</>
				)}
			</div>
		</AppContext.Provider>
	);
}

export default App;
