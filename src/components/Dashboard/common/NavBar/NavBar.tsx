import "./NavBar.scss";
import defaultContent from "../../../../content/defaultNav";
import { Link, useLocation } from "react-router-dom";
import IconDashLinks, {
  type IconDashLinkName,
} from "../../../common/Icons/IconDashLinks/IconDashLinks";
import IconLogo from "../../../common/Icons/IconLogo/IconLogo";
import IconRightArrow from "../../../common/Icons/IconRightArrow/IconRightArrow";

const SECTION_ONE = [
  {
    icon: "overview",
    name: defaultContent.dashboard.overview,
    link: "/dashboard",
  },
  {
    icon: "analytics",
    name: defaultContent.dashboard.analytics,
    link: "/dashboard/analytics",
  },
  {
    icon: "activity",
    name: defaultContent.dashboard.activity,
    link: "/dashboard/activity",
  },
  {
    icon: "scan",
    name: defaultContent.dashboard.scan,
    link: "/dashboard/scan",
  },
];

const SECTION_TWO = [
  {
    icon: "welcome",
    name: defaultContent.dashboard.welcome,
    link: "/",
  },
  {
    icon: "tAP",
    name: defaultContent.dashboard.tAP,
    link: "/terms-and-privacy",
  },
];

const SECTION_THREE = [
  {
    icon: "settings",
    name: defaultContent.dashboard.settings,
    link: "/dashboard/settings",
  },
  {
    icon: "logout",
    name: defaultContent.dashboard.logout,
    link: "/logout",
  },
];

interface NavItemProps {
  name: string;
  link: string;
  icon: IconDashLinkName;
}

const NavItem = ({ name, link, icon }: NavItemProps) => {
  const { pathname } = useLocation();
  return (
    <>
      <Link
        to={link}
        className={`dash-nav__section__item ${pathname === link ? "dash-nav__section__item--selected" : ""}`}
      >
        <IconDashLinks name={icon} />
        <p>{name}</p>
      </Link>
    </>
  );
};
const NavBar = () => {
  return (
    <>
      <nav className="dash-nav">
        <div className="dash-nav__header">
          <IconLogo width={"4rem"} height={"4rem"} borderRadius={"4rem"} />
          <p>{defaultContent.dashboard.baseName}</p>
          <IconRightArrow />
        </div>
        <div className="dash-nav__section">
          <p>{defaultContent.dashboard.sOne}</p>
          {SECTION_ONE.map((s) => {
            return (
              <NavItem
                key={s.name}
                name={s.name}
                icon={s.icon as IconDashLinkName}
                link={s.link}
              />
            );
          })}
        </div>
        <div className="dash-nav__section">
          <p>{defaultContent.dashboard.sTwo}</p>
          {SECTION_TWO.map((s) => {
            return (
              <NavItem
                key={s.name}
                name={s.name}
                icon={s.icon as IconDashLinkName}
                link={s.link}
              />
            );
          })}
        </div>
        <div className="dash-nav__section">
          <p>{defaultContent.dashboard.sThree}</p>
          {SECTION_THREE.map((s) => {
            return (
              <NavItem
                key={s.name}
                name={s.name}
                icon={s.icon as IconDashLinkName}
                link={s.link}
              />
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
