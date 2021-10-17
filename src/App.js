import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faEraser,
  faHome,
  faHotel,
  faMapMarked,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faPlane,
  faRoute,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./pages/SearchPage";
import usePlacesAutocomplete from "use-places-autocomplete";

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
  faEraser
);

function App() {
  // const { init } = usePlacesAutocomplete({
  //   initOnMount: false, // Disable initializing when the component mounts, default is true
  // });

  // const [loading] = useGoogleMapsApi({
  //   library: "places",
  //   onLoad: () => init(), // Lazily initializing the hook when the script is ready
  // });

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
