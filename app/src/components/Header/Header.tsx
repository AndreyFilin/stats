import {NavLink} from "react-router-dom";
import Button from "../Button";
import Loader from "../Loader/Loader.tsx";
import "./style.css";
import useGetProfile from "../../queries/useGetProfile.ts";
import {useContext} from "react";
import {AppContext} from "../../AppContext.ts";

const Header = () => {
	const {logout} = useContext(AppContext);
	const profileRes = useGetProfile();
	const profileData = profileRes.data?.data;

	return (
		<header className={`header`}>
			<div className={`header__logo`} />
			<nav className={`header__nav`}>
				<NavLink to={`/`}>{`Бюджет`}</NavLink>
				<NavLink to={`/calendar`}>{`Календарь`}</NavLink>
				<NavLink to={`/statistics`}>{`Статистика`}</NavLink>
			</nav>
			<div className={`header__auth`}>
				{!profileRes?.isFetched && <Loader className={`header__loader`} />}
				{!!profileRes?.isFetched && (
					<>
						<div className={`profile__avatar`}>{profileData?.login}</div>
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

export default Header;