import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import "./index.scss";
import routes from "./routes.tsx";
import BootLayer from "./components/Layers/BootLayer.tsx";
import ErrorLayer from "./components/Layers/ErrorLayer.tsx";

const router = createBrowserRouter(routes);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BootLayer>
        <ErrorLayer>
          <RouterProvider router={router} />
        </ErrorLayer>
      </BootLayer>
    </Provider>
  </StrictMode>,
);
