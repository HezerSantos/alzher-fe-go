import App from "./App";
import Activity from "./pages/Dashboard/Activity";
import Analytics from "./pages/Dashboard/Analytics";
import Dashboard from "./pages/Dashboard/Dashboard";
import Overview from "./pages/Dashboard/Overview";
import Scan from "./pages/Dashboard/Scan";
import Home from "./pages/Home";
import TermsAndPrivacy from "./pages/TermsAndPrivacy/TermsAndPrivacy";

const routes = [
  {
    path: "/",
    element: <App />,
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
