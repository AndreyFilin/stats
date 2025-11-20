import {clearDb} from "../../utils/db.ts";
const DbController = () => {
	return <button onClick={clearDb}>{`Очистить базу`}</button>;
};

export default DbController;