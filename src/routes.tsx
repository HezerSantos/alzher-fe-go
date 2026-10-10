import AlzherClient from "./AlzherClient";
import Activity from "./Pages/Dashboard/Activity";
import Analytics from "./Pages/Dashboard/Analytics";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Overview from "./Pages/Dashboard/Overview";
import Scan from "./Pages/Dashboard/Scan";
import Home from "./Pages/Home/Home";
import TermsAndPrivacy from "./Pages/TermsAndPrivacy/TermsAndPrivacy";

const routes = [
  {
    path: "/",
    element: <AlzherClient />,
    errorElement: null,
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
        ],
      },
    ],
  },
];

export default routes;
