import "./NavBar.scss";
import defaultContent from "../../../../content/defaultNav";
import { Link, useLocation } from "react-router-dom";
import IconDashLinks, {
  type IconDashLinkName,
} from "../../../common/Icons/IconDashLinks/IconDashLinks";
import IconLogo from "../../../common/Icons/IconLogo/IconLogo";
import IconRightArrow from "../../../common/Icons/IconRightArrow/IconRightArrow";
import React, { useEffect, useState, type SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks";
import { toggleNav } from "../../../../reducers/dashboardSlice";
import useWidth from "../../../../common/hooks/useWidth";
import Button from "../../../common/Button/Button";

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

const NavItemExpanded = ({ name, link, icon }: NavItemProps) => {
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

const NavExpanded = () => {
  const navOpen = useAppSelector((s) => s.dashboard.navOpen);
  const dispatch = useAppDispatch();
  return (
    <nav className="dash-nav">
      <div className="dash-nav__header">
        <IconLogo width={"4rem"} height={"4rem"} borderRadius={"4rem"} />
        <p>{defaultContent.dashboard.baseName}</p>
        <button onClick={() => dispatch(toggleNav())}>
          <IconRightArrow flip={navOpen} />
        </button>
      </div>
      <div className="dash-nav__section">
        <p>{defaultContent.dashboard.sOne}</p>
        {SECTION_ONE.map((s) => {
          return (
            <NavItemExpanded
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
            <NavItemExpanded
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
            <NavItemExpanded
              key={s.name}
              name={s.name}
              icon={s.icon as IconDashLinkName}
              link={s.link}
            />
          );
        })}
      </div>
    </nav>
  );
};

const NavItemCollapsed = ({ icon, link }: Omit<NavItemProps, "name">) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={link}
      className={pathname === link ? "dash-nav__section__item--selected" : ""}
      aria-current={pathname === link ? "page" : undefined}
    >
      <IconDashLinks name={icon} />
    </Link>
  );
};

const NavCollapsed = () => {
  const navOpen = useAppSelector((s) => s.dashboard.navOpen);
  const dispatch = useAppDispatch();
  const width = useWidth();
  return (
    <nav className="dash-nav-collapsed-inner">
      {width > 1100 ? (
        <Button text="" onClick={() => dispatch(toggleNav())}>
          <IconRightArrow flip={navOpen} />
        </Button>
      ) : (
        <>
          <span></span>
        </>
      )}
      <div className="dash-nav__section">
        {SECTION_ONE.map((s) => {
          return (
            <NavItemCollapsed
              key={s.name}
              icon={s.icon as IconDashLinkName}
              link={s.link}
            />
          );
        })}
      </div>
      <div className="dash-nav__section">
        {SECTION_TWO.map((s) => {
          return (
            <NavItemCollapsed
              key={s.name}
              icon={s.icon as IconDashLinkName}
              link={s.link}
            />
          );
        })}
      </div>
      <div className="dash-nav__section">
        {SECTION_THREE.map((s) => {
          return (
            <NavItemCollapsed
              key={s.name}
              icon={s.icon as IconDashLinkName}
              link={s.link}
            />
          );
        })}
      </div>
    </nav>
  );
};

const MobileNav = () => {
  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  const closeMenu = () => {
    if (navOpen) {
      setNavOpen(false);
    }
  };

  const sections = [
    {
      title: defaultContent.dashboard.sOne,
      items: SECTION_ONE,
    },
    {
      title: defaultContent.dashboard.sTwo,
      items: SECTION_TWO,
    },
    {
      title: defaultContent.dashboard.sThree,
      items: SECTION_THREE,
    },
  ];

  return (
    <header className="mobile-nav">
      <div className="mobile-nav__header">
        <Link
          to="/dashboard"
          className="mobile-nav__brand"
          onClick={closeMenu}
          aria-label="Alzher dashboard"
        >
          <IconLogo width="2.75rem" height="2.75rem" borderRadius="50%" />
          <span>{defaultContent.dashboard.baseName}</span>
        </Link>

        <button
          className={`mobile-nav__toggle${
            navOpen ? " mobile-nav__toggle--open" : ""
          }`}
          onClick={() => setNavOpen((prev) => !prev)}
          aria-label={
            navOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={navOpen}
          aria-controls="mobile-nav-menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-nav-menu"
        className={`mobile-nav__panel${
          navOpen ? " mobile-nav__panel--open" : ""
        }`}
        aria-hidden={!navOpen}
        inert={!navOpen}
      >
        <nav aria-label="Mobile navigation">
          {sections.map((section) => (
            <div className="mobile-nav__section" key={section.title}>
              <p className="mobile-nav__section-title">{section.title}</p>

              {section.items.map((item) => {
                const selected = pathname === item.link;

                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={closeMenu}
                    className={`mobile-nav__item${
                      selected ? " mobile-nav__item--selected" : ""
                    }`}
                    aria-current={selected ? "page" : undefined}
                  >
                    <IconDashLinks name={item.icon as IconDashLinkName} />

                    <span>{item.name}</span>

                    {selected && (
                      <span className="mobile-nav__active-indicator" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {navOpen && (
        <button
          className="mobile-nav__backdrop"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          type="button"
        />
      )}
    </header>
  );
};

const NavBar = () => {
  const navOpen = useAppSelector((s) => s.dashboard.navOpen);
  const dispatch = useAppDispatch();
  const width = useWidth();

  useEffect(() => {
    if (width < 1100 && navOpen) {
      dispatch(toggleNav());
    }
  }, [width, navOpen]);
  return (
    <>
      {width > 750 ? (
        <div
          className={`dash-nav-container ${navOpen ? "is-open" : "is-collapsed"}`}
        >
          <div className="dash-nav-expanded">
            <NavExpanded />
          </div>

          <div className="dash-nav-collapsed">
            <NavCollapsed />
          </div>
        </div>
      ) : (
        <MobileNav />
      )}
    </>
  );
};
export default NavBar;
