import {type IEndpoint} from "./types";
import Index from "./api/get/Index";
import Profile from "./api/get/Profile";
import Login from "./api/post/Login";
import Refresh from "./api/post/Refresh";
import TransactionCategoriesList from "./api/get/TransactionCategories";
import TransactionCategoryCreate from "./api/post/TransactionCategory";
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
		'': Index,
		'/profile': Profile,
		'/transaction_categories': TransactionCategoriesList,
		'/transactions': TransactionsList,
		'/transaction/:id': Transaction,
		'/events': EventsList,
	},
	POST: {
		'/login': Login,
		'/refresh': Refresh,
		'/transaction_category': TransactionCategoryCreate,
		'/transaction': TransactionCreate,
		'/event': EventCreate,
	},
	PUT: {
		'/transaction/:id': TransactionUpdate,
	},
	DELETE: {
		'/transaction/:id': TransactionRemove,
		'/event': EventRemove,
	}
} as const satisfies Record<UsedHTTPMethods, Record<string, IEndpoint>>;

export default routes;