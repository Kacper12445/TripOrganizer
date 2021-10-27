import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
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
  faPlane,
  faRoute,
  faSmile,
  faStar,
  faTicketAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./pages/SearchPage";

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
  faEye
);

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/searchingPage" component={SearchPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
