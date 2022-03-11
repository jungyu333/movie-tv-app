import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { auth } from "./fbase";
import Router from "./Router";

export interface IRouterProps {
  isLogIn: boolean;
}

function App() {
  const [init, setInit] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <Router isLogIn={isLogIn} /> : <Loading />}</>;
}

export default App;
