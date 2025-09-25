import "./App.css";
import "./aliceCarousel.css";

import CustomRouter from "./components/core/CustomRouter.js";
import Boilerplate from "./components/core/boilerplate/Boilerplate.js";

import GoogleWebAuthProvider from "./GoogleWebAuthProvider.js";
import WithLoggedInHeader from "./header/vertical/WithLoggedInHeader.js";
import WithLoggedInHeaderHoz from "./header/horizontal/WithLoggedInHeaderHoz.js";

//Material Theme made using: https://zenoo.github.io/mui-theme-creator/

function App() {
  return (
    <GoogleWebAuthProvider>
      <Boilerplate>
        {/* <WithLoggedInHeader>
          <CustomRouter />
        </WithLoggedInHeader> */}
        <WithLoggedInHeaderHoz>
          <CustomRouter />
        </WithLoggedInHeaderHoz>
      </Boilerplate>
    </GoogleWebAuthProvider>
  );
}

export default App;
