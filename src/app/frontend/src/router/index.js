import { Homepage } from '../pages'
import { BrowserRouter as Routers, Route, Switch } from "react-router-dom";

const Router = () => {
  return (
          <Routers>
                  <Switch>
                      <Route exact path='/' component={ Homepage } />
                  </Switch>
          </Routers>
  );
};

export default Router;
