import { Switch, Route } from "react-router-dom";
import CreateForm from "./Forms/Create";
import Analytics from "./Analytics";
import { navigation } from "../Navigation/DashboardNavigation";

export default function Dashboard() {
  return (
    <div className="md:pl-16">
      <Switch>
        {navigation.map((item, index) => (
          <Route key={index} exact path={item.href}>
            {item.page}
          </Route>
        ))}
        <Route path="/dashboard/forms/:formId/edit">
          <CreateForm />
        </Route>
        <Route path="/dashboard/forms/:formId/analytics">
          <Analytics />
        </Route>
      </Switch>
    </div>
  );
}
