import {queryClient} from "./main.tsx";
import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./utils/db.ts";
import "./utils/ws.ts";
import AuthorizationPage from "./pages/AuthorizationPage";
import {PageLoader} from "./components/Page";
import Header from "./components/Header";
import "./App.css";
import {registerUnauthorizedCallback} from "./utils/request.ts";
import {AppContext} from "./AppContext.ts";
const BudgetPage = lazy(() => import(`./pages/BudgetPage`));
const CalendarPage = lazy(() => import(`./pages/CalendarPage`));
const StatisticsPage = lazy(() => import(`./pages/StatisticsPage`));

function App() {
	const [token, setToken] = useState<string | null>(localStorage.getItem(`token`));

	const logout = useCallback(() => {
		localStorage.removeItem(`token`);
		queryClient.removeQueries();
		setToken(null);
	}, [setToken]);

	const login = useCallback((token: string) => {
		localStorage.setItem(`token`, token);
		setToken(token);
	}, [setToken]);

	useEffect(() => {
		registerUnauthorizedCallback(logout);
	}, [logout]);

	return (
		<AppContext.Provider value={{token, logout, login}}>
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
							</Routes>
						</Suspense>
					</>
				)}
			</div>
		</AppContext.Provider>
	);
}

export default App;
