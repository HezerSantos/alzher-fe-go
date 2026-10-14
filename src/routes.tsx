import AlzherClient from "./AlzherClient";
import Activity from "./Pages/Dashboard/Activity/Activity";
import Analytics from "./Pages/Dashboard/Analytics/Analytics";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Overview from "./Pages/Dashboard/Overview/Overview";
import Scan from "./Pages/Dashboard/Scan/Scan";

import NotFound from "./Pages/Errors/NotFound";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Settings from "./Pages/Settings/Settings";
import Signup from "./Pages/Signup/Signup";
import TermsAndPrivacy from "./Pages/TermsAndPrivacy/TermsAndPrivacy";

const routes = [
  {
    path: "/",
    element: <AlzherClient />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/terms-and-privacy",
        element: <TermsAndPrivacy />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "activity",
            element: <Activity />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "scan",
            element: <Scan />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
];

export default routes;
