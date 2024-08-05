import { HashRouter as Router, Route, Routes  } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            <Routes >
                {isLoggedIn ? (
                    <Route exact path="/" element={<Home />}></Route>
                ) : (
                    <Route exact path="/" element={<Auth />}></Route>
                )
            }
            </Routes >
        </Router>
    );
};

export default AppRouter;