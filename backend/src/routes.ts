import {type IEndpoint} from "./types";
import Index from "./api/get/Index";
import Profile from "./api/get/Profile";
import Login from "./api/post/Login";
import TransactionCategoriesList from "./api/get/TransactionCategories";
import TransactionsList from "./api/get/Transactions";
import Transaction from "./api/get/Transaction";
import TransactionCreate from "./api/post/Transaction";
import TransactionUpdate from "./api/put/Transaction";
import TransactionRemove from "./api/delete/Transaction";
import EventsList from "./api/get/Events";
import EventCreate from "./api/post/Event";
import EventRemove from "./api/delete/Event";

type UsedHTTPMethods = `GET` | `POST` | `PUT` | `DELETE`;

const routes = {
	GET: {
		'/api': Index,
		'/api/profile': Profile,
		'/api/transaction_categories': TransactionCategoriesList,
		'/api/transactions': TransactionsList,
		'/api/transaction/:id': Transaction,
		'/api/events': EventsList,
	},
	POST: {
		'/api/login': Login,
		'/api/transaction': TransactionCreate,
		'/api/event': EventCreate,
	},
	PUT: {
		'/api/transaction/:id': TransactionUpdate,
	},
	DELETE: {
		'/api/transaction/:id': TransactionRemove,
		'/api/event': EventRemove,
	}
} as const satisfies Record<UsedHTTPMethods, Record<string, IEndpoint>>;

export default routes;