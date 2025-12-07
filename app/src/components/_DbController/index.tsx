import {clearDb} from "../../utils/db";
const DbController = () => {
	return <button onClick={clearDb}>{`Очистить базу`}</button>;
};

export default DbController;