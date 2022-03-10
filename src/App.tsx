import { User } from "firebase/auth";
import { useState } from "react";
import { auth } from "./fbase";
import Router from "./Router";

export interface IRouterProps {
  isLogIn: User;
}

function App() {
  const [isLogIn, setIsLogIn] = useState(auth.currentUser);
  return (
    <>
      <Router isLogIn={isLogIn as User} />
    </>
  );
}

export default App;
