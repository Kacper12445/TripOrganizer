import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import * as Routes from "./constants/Routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {
  faEraser,
  faEye,
  faHome,
  faHotel,
  faLongArrowAltRight,
  faMapMarked,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMoneyBillWave,
  faPaperPlane,
  faPlane,
  faRoute,
  faSearch,
  faShoppingCart,
  faSmile,
  faStar,
  faTicketAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";

library.add(
  fab,
  faPlane,
  faRoute,
  faHotel,
  faMapMarked,
  faTicketAlt,
  faHome,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faEraser,
  faStar,
  faSmile,
  faMoneyBillWave,
  faLongArrowAltRight,
  faTimesCircle,
  faEye,
  faSearch,
  faPaperPlane,
  faShoppingCart
);

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={Routes.HOME} component={MainPage} />
          <Route exact path={Routes.SEARCH_PAGE} component={SearchPage} />
          <Route exact path={Routes.BUY_OFFER_PAGE} component={CartPage} />
        </Switch>
      </Router>
      <NotificationContainer />
    </>
  );
}

export default App;
