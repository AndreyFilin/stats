import {createContext, lazy, Suspense, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import {PageLoader} from "./components/Page";
import Header from "./components/Header";
import "./utils/db.ts";
import "./utils/ws.ts";
import AuthorizationPage from "./pages/AuthorizationPage";
const BudgetPage = lazy(() => import(`./pages/BudgetPage`));
const CalendarPage = lazy(() => import(`./pages/CalendarPage`));
const StatisticsPage = lazy(() => import(`./pages/StatisticsPage`));

interface IAppContext {
	token: string | null;
	setToken: (token: string | null) => void;
}

// TODO разобраться
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<IAppContext>({
	token: null,
	setToken: (token: string | null) => token
});

function App() {
	const [token, setToken] = useState<string | null>(localStorage.getItem(`token`));
	return (
		<AppContext.Provider value={{token, setToken}}>
			<div className={`app__layout`}>
				{!token && (
					<AuthorizationPage />
				)}

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
