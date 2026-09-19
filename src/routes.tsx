import App from "./App";
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
    ],
  },
];

export default routes;
