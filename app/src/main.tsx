import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {QueryClientProvider} from "@tanstack/react-query";
import "sanitize.css";
import "./index.css";
import "./variables.css";
import App from "./App.tsx";
import {queryClient} from "./utils/queryClient.ts";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);
