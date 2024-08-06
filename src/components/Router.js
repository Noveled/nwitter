import { HashRouter as Router, Route, Routes  } from "react-router-dom"; // Navigate , 
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";


const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes >
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route exact path="/profile" element={<Profile />}></Route>
                    </>
                ) : (
                    <Route exact path="/" element={<Auth />}></Route>
                )
            }
            {/* <Route exact path="*" element={<Navigate to="/" />}></Route> */}
            
            </Routes >
        </Router>
    );
};

export default AppRouter;