import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { getForms } from "./store/forms";
import { SessionContext } from "./context/sessionContext";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation/Navigation";
import Form from "./components/Forms/Form";
import Dashboard from "./components/Dashboard";
import DashboardNavigation from "./components/Navigation/DashboardNavigation";

function App() {
  const dispatch = useDispatch();
  const user = useContext(SessionContext);

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  return (
    <>
      {user ? (
        <>
          <Navigation />
          <div className="pt-24 pb-24 px-4 md:pb-0 w-full h-full">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/forms/:formId">
                <Form />
              </Route>
              <Route path="/forms">
                <Redirect to="/" />
              </Route>
              <Route path="/signup">
                <Redirect to="/" />
              </Route>
              <Route path="/signin">
                <Redirect to="/" />
              </Route>
              {user.role === "admin" && (
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
              )}
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          {user.role === "admin" && <DashboardNavigation />}
        </>
      ) : (
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <Redirect to="/signin" />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
