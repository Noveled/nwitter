import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, SetisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
 
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        SetisLoggedIn(user);
        setUserObj(user);
      } else {
        SetisLoggedIn(false);
      }
      setInit(true);
    }
    );
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "intializing..." } 
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
