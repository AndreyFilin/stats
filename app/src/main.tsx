import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "sanitize.css";
import "./index.css";
import "./variables.css";
import App from "./App.tsx";
import {ApiError, onUnauthorizedCallback} from "./utils/request.ts";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			if (error instanceof ApiError && error.status === 401) {
				onUnauthorizedCallback?.();
			}
			if (error instanceof ApiError && error.status >= 500) {
				console.error(`Глобальная ошибка сервера: ${error.message}`);
			}
		}
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 3,
			retry: false
		},
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);
