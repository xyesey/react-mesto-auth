import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../image/logo.svg";

function Header({ currentUser, loggedIn }) {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  
  const signOut = () => {
    localStorage.removeItem("jwt");
  };

  return (
    <div className="header">
      <img src={logo} className="header__logo" alt="Mesto Logo" />
      {loggedIn ? (
        <>
          <div className="header__menu-icon" onClick={handleShowMenu}>
            {!showMenu ? (
              <>
                <div className="header__menu-icon_line"></div>
                <div className="header__menu-icon_line"></div>
                <div className="header__menu-icon_line"></div>
              </>
            ) : (
              <div className="header__menu-icon_close-icon" onClick={handleShowMenu}>&#x2715;</div>
            )}
          </div>

          <div
            className={`header__container-info ${
              showMenu ? "header__container-info_show" : ""
            }`}
          >
            <h1 className="header__container-info_email">{currentUser}</h1>
            <Link
              to="/sign-in"
              onClick={signOut}
              className="header__container-info_link"
            >
              Выйти
            </Link>
          </div>
        </>
      ) : location.pathname === "/sign-up" ? (
        <Link to="/sign-in" className="header__link-auth">
          Войти
        </Link>
      ) : (
        <Link to="sign-up" className="header__link-auth">
          Регистрация
        </Link>
      )}
    </div>
  );
}

export default Header;
