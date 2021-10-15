import "./App.css";
import MainPage from "./pages/MainPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faHotel,
  faMapMarked,
  faPlane,
  faRoute,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./pages/SearchPage";

library.add(fab, faPlane, faRoute, faHotel, faMapMarked, faTicketAlt);

function App() {
  return (
    <>
      <MainPage />
      {/* <SearchPage /> */}
    </>
  );
}

export default App;
