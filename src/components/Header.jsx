import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../image/logo.svg";

function Header({ currentUser, loggedIn, setLoggedIn }) {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
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
              <div
                className="header__menu-icon_close-icon"
                onClick={handleShowMenu}
              >
                &#x2715;
              </div>
            )}
          </div>

          <div
            className={`header__container-info ${
              showMenu ? "header__container-info_show" : ""
            }`}
          >
            <h1 className="header__container-info_email">{currentUser}</h1>
            <button onClick={signOut} className="header__container-info_link">
              Выйти
            </button>
          </div>
        </>
      ) : location.pathname === "/sign-in" ? (
        <Link to="/sign-up" className="header__link-auth">
          Регистрация
        </Link>
      ) : (
        <Link to="/sign-in" className="header__link-auth">
          Войти
        </Link>
      )}
    </div>
  );
}

export default Header;
