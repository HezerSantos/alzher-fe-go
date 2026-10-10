import { Link } from "react-router-dom";
import PageSection from "../PageSection/PageSection";
import "./DefaultNav.scss";
import defaultContent from "../../../content/defaultNav";
import IconLogo from "../Icons/IconLogo/IconLogo";
import { useCallback, useState, type ReactNode } from "react";
import IconPerson from "../Icons/IconPerson/IconPerson";
import useWidth from "../../../common/hooks/useWidth";
import IconMenu from "../Icons/IconMenu/IconMenu";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import Button from "../Button/Button";
import { useLogoutMutation } from "../../../services/authService";
import { setToast } from "../../../reducers/toastSlice";
import { logout } from "../../../reducers/authSlice";

interface NavLinkProps {
  name: string;
  link: string;
  hidden?: boolean;
  icon?: ReactNode;
}

const NavLink = ({ name, link, hidden = false, icon }: NavLinkProps) => {
  if (hidden) {
    return null;
  }

  if (icon) {
    return (
      <Link to={link}>
        {icon}
        {name}
      </Link>
    );
  } else {
    return <Link to={link}>{name}</Link>;
  }
};

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
    } catch (e) {
      dispatch(
        setToast({
          msg: defaultContent.toast.logoutError,
          error: true,
        }),
      );
    }
  }, []);

  return { userLogout };
};
const Desktop = () => {
  const auth = useAppSelector((s) => s.auth);
  const { userLogout } = useLogout();
  return (
    <PageSection fixed={true}>
      <nav className="default-nav">
        <div className="default-nav__links">
          <IconLogo width={"3rem"} height={"3rem"} borderRadius={"5rem"} />
          {navLinks.map((link) => {
            return (
              <NavLink key={link.name} name={link.name} link={link.link} />
            );
          })}
        </div>
        <div className="default-nav__end">
          {auth.isAuthorized ? (
            <span className="default-nav__end__logout">
              <IconPerson width={"1.5rem"} height={"1.5rem"} />
              <Button
                text={defaultContent.links.logout}
                onClick={() => userLogout()}
              />
            </span>
          ) : (
            <NavLink
              name={defaultContent.links.login}
              link="/login"
              icon={<IconPerson width={"1.5rem"} height={"1.5rem"} />}
            />
          )}
        </div>
      </nav>
    </PageSection>
  );
};

const Mobile = () => {
  const [navOpen, setNavOpen] = useState(false);
  const auth = useAppSelector((s) => s.auth);
  const { userLogout } = useLogout();
  return (
    <nav className="default-nav--mobile">
      <div className="default-nav--mobile__header">
        <button onClick={() => setNavOpen((prev) => !prev)}>
          <IconMenu width={35} height={35} />
        </button>
        <IconLogo width={50} height={50} borderRadius={"5rem"} />
        {auth.isAuthorized ? (
          <span className="default-nav__end__logout">
            <IconPerson width={"1.5rem"} height={"1.5rem"} />
            <Button
              text={defaultContent.links.logout}
              onClick={() => userLogout()}
            />
          </span>
        ) : (
          <NavLink
            name={defaultContent.links.login}
            link="/login"
            icon={<IconPerson width={"1.5rem"} height={"1.5rem"} />}
          />
        )}
      </div>
      <div
        className={`default-nav--mobile__links ${navOpen ? "default-nav--mobile__links--open" : ""}`}
      >
        <div className="default-nav--mobile__links__content">
          {navLinks.map((link) => {
            return (
              <NavLink key={link.name} name={link.name} link={link.link} />
            );
          })}
        </div>
      </div>
    </nav>
  );
};
const DefaultNav = () => {
  const width = useWidth();

  if (width >= 1250) {
    return <Desktop />;
  }

  return <Mobile />;
};

export default DefaultNav;
