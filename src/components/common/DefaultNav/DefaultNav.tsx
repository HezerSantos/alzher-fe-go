import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import PageSection from "../PageSection/PageSection";
import IconLogo from "../Icons/IconLogo/IconLogo";
import IconPerson from "../Icons/IconPerson/IconPerson";
import IconMenu from "../Icons/IconMenu/IconMenu";
import Button from "../Button/Button";
import useWidth from "../../../common/hooks/useWidth";
import defaultContent from "../../../content/defaultNav";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import { useLogoutMutation } from "../../../services/authService";
import { setToast } from "../../../reducers/toastSlice";
import { logout } from "../../../reducers/authSlice";

import "./DefaultNav.scss";

const navLinks = [
  {
    name: defaultContent.links.home,
    link: "/",
  },
  {
    name: defaultContent.links.myDashboard,
    link: "/dashboard",
  },
  {
    name: defaultContent.links.termsAndPrivacy,
    link: "/terms-and-privacy",
  },
];

const useLogout = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();

  const userLogout = useCallback(async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      dispatch(
        setToast({
          msg: defaultContent.toast.logoutSuccess,
          error: false,
        }),
      );
    } catch {
      dispatch(
        setToast({
          msg: defaultContent.toast.logoutError,
          error: true,
        }),
      );
    }
  }, [dispatch, logoutUser]);

  return { userLogout };
};

interface NavLinksProps {
  onNavigate?: () => void;
}

const NavLinks = ({ onNavigate }: NavLinksProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {navLinks.map(({ name, link }) => {
        const selected = pathname === link;

        return (
          <Link
            key={link}
            to={link}
            onClick={onNavigate}
            className={`default-nav__link${
              selected ? " default-nav__link--active" : ""
            }`}
            aria-current={selected ? "page" : undefined}
          >
            {name}
          </Link>
        );
      })}
    </>
  );
};

interface AccountActionProps {
  authorized: boolean;
  onLogout: () => void;
}

const AccountAction = ({ authorized, onLogout }: AccountActionProps) => {
  if (authorized) {
    return (
      <div className="default-nav__account">
        <span className="default-nav__account-icon" aria-hidden="true">
          <IconPerson width="1.35rem" height="1.35rem" />
        </span>
        <Button text={defaultContent.links.logout} onClick={onLogout} />
      </div>
    );
  }

  return (
    <Link className="default-nav__login" to="/login">
      <IconPerson width="1.35rem" height="1.35rem" />
      <span>{defaultContent.links.login}</span>
    </Link>
  );
};

const Desktop = () => {
  const auth = useAppSelector((state) => state.auth);
  const { userLogout } = useLogout();

  return (
    <PageSection fixed={true}>
      <nav className="default-nav" aria-label="Main navigation">
        <div className="default-nav__inner">
          <div className="default-nav__brand-group">
            <Link
              to="/"
              className="default-nav__brand"
              aria-label="Alzher home"
            >
              <IconLogo width="2.8rem" height="2.8rem" borderRadius="50%" />
            </Link>

            <div className="default-nav__links">
              <NavLinks />
            </div>
          </div>

          <div className="default-nav__actions">
            <AccountAction
              authorized={auth.isAuthorized}
              onLogout={userLogout}
            />
          </div>
        </div>
      </nav>
    </PageSection>
  );
};

const Mobile = () => {
  const [navOpen, setNavOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const { userLogout } = useLogout();

  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setNavOpen(false);
  }, []);

  const toggleMenu = () => {
    setNavOpen((previous) => !previous);
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.inert = !navOpen;
    }

    if (!navOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        navRef.current &&
        event.target instanceof Node &&
        !navRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navOpen, closeMenu]);

  return (
    <nav
      ref={navRef}
      className="default-nav--mobile"
      aria-label="Main navigation"
    >
      <div className="default-nav--mobile__header">
        <button
          ref={toggleRef}
          className={`default-nav--mobile__toggle${
            navOpen ? " default-nav--mobile__toggle--open" : ""
          }`}
          type="button"
          onClick={toggleMenu}
          aria-label={
            navOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={navOpen}
          aria-controls="default-mobile-nav-menu"
        >
          <IconMenu width={28} height={28} />
        </button>

        <Link
          to="/"
          className="default-nav--mobile__brand"
          onClick={closeMenu}
          aria-label="Alzher home"
        >
          <IconLogo width={44} height={44} borderRadius="50%" />
        </Link>

        <div className="default-nav--mobile__account">
          <AccountAction authorized={auth.isAuthorized} onLogout={userLogout} />
        </div>
      </div>

      <div
        ref={menuRef}
        id="default-mobile-nav-menu"
        className={`default-nav--mobile__panel${
          navOpen ? " default-nav--mobile__panel--open" : ""
        }`}
        aria-hidden={!navOpen}
      >
        <div className="default-nav--mobile__links">
          <p className="default-nav--mobile__eyebrow">Navigation</p>
          <NavLinks onNavigate={closeMenu} />
        </div>
      </div>

      {navOpen && (
        <button
          type="button"
          className="default-nav--mobile__backdrop"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

const DefaultNav = () => {
  const width = useWidth();

  return width >= 1250 ? <Desktop /> : <Mobile />;
};

export default DefaultNav;
