import {memo, useContext} from "react";
import Link from "../Link";
import Button from "../Button";
import Loader from "../Loader";
import "./style.css";
import useGetProfile from "../../queries/useGetProfile.ts";
import {AppContext} from "../../AppContext.ts";

const Header = () => {
	const {logout} = useContext(AppContext);
	const profileRes = useGetProfile();
	const profileData = profileRes.data?.data;
	return (
		<header className={`header`}>
			<div className={`header__logo`} />
			<nav className={`header__nav`}>
				<Link to={`/`}>{`Бюджет`}</Link>
				<Link to={`/calendar`}>{`Календарь`}</Link>
				<Link to={`/statistics`}>{`Статистика`}</Link>
				{profileData?.role === `admin` && <Link to={`/admin`}>{`Админка`}</Link>}
			</nav>
			<div className={`header__auth`}>
				{!profileRes?.isFetched && <Loader className={`header__loader`} />}
				{!!profileRes?.isFetched && (
					<>
						<div className={`profile__avatar`} />
						{profileData?.login}
						<Button
							onClick={() => logout?.()}
							size={`small`}
						>{`Выйти`}</Button>
					</>
				)}
			</div>
		</header>
	);
};

export default memo(Header);