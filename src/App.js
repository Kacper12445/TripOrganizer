import "./App.css";
import MainPage from "./pages/MainPage";
import Header from "./components/UI/Header/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import SearchPage from "./pages/SearchPage";

library.add(fab, faPlane);

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <MainPage /> */}
      <SearchPage />
    </>
  );
}

export default App;
