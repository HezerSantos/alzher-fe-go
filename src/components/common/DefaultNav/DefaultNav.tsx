import { Link } from "react-router-dom";
import PageSection from "../PageSection/PageSection";
import "./DefaultNav.scss";
import defaultContent from "../../../content/defaultNav";
import IconLogo from "../Icons/IconLogo/IconLogo";
import { useState, type ReactNode } from "react";
import IconPerson from "../Icons/IconPerson/IconPerson";
import useWidth from "../../../common/hooks/useWidth";
import IconMenu from "../Icons/IconMenu/IconMenu";

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

const Desktop = () => {
  return (
    <PageSection fixed={true}>
      <nav className="default-nav">
        <div className="default-nav__links">
          <IconLogo width={50} height={50} />
          {navLinks.map((link) => {
            return (
              <NavLink key={link.name} name={link.name} link={link.link} />
            );
          })}
        </div>
        <div className="default-nav__end">
          <NavLink
            name={defaultContent.links.logout}
            link="/logout"
            icon={<IconPerson width={"1.5rem"} height={"1.5rem"} />}
          />
        </div>
      </nav>
    </PageSection>
  );
};

const Mobile = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="default-nav--mobile">
      <div className="default-nav--mobile__header">
        <button onClick={() => setNavOpen((prev) => !prev)}>
          <IconMenu width={35} height={35} />
        </button>
        <IconLogo width={50} height={50} />
        <NavLink
          name={defaultContent.links.logout}
          link="/logout"
          icon={<IconPerson width={"1.5rem"} height={"1.5rem"} />}
        />
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
  const { width } = useWidth();

  if (width >= 1250) {
    return <Desktop />;
  }

  return <Mobile />;
};

export default DefaultNav;
