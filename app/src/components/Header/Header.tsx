import {NavLink} from "react-router-dom";
import Loader from "../Loader/Loader.tsx";
import "./style.css";
import useGetProfile from "../../queries/useGetProfile.ts";
import {useContext} from "react";
import {AppContext} from "../../App.tsx";

const Header = () => {
	const {setToken} = useContext(AppContext);
	const profileRes = useGetProfile();
	const profileData = profileRes.data?.data;

	const logout = () => {
		localStorage.removeItem(`token`);
		setToken(null);
	}

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
						<button onClick={logout}>{`Выйти`}</button>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;