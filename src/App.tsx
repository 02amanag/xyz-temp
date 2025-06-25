import { cn } from "./lib/utils";
import { Provider } from "react-redux";
import { AuthProvider } from "./auth/JwtContext";
import { persistor, store } from "./redux/store";
import routes, { RouteItem } from "./routes/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  function renderRoute(route: RouteItem) {
    if (route.index) {
      return (<Route key={"index"} index element={route.element} />);
    } else {
      return (
        <Route key={route.path || "fallback-key"} path={route.path} element={route.element}>
          {route.children?.map((child) => renderRoute(child))}
        </Route>
      );
    }
  }

  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <BrowserRouter>
            <div className={cn("flex flex-1 flex-col items-center justify-center bg-background")}>
              <Routes>
                {routes.map((r) => renderRoute(r))}
              </Routes>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}

export default App;