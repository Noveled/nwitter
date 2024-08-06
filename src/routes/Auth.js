import { authService, firebaseInstance } from "fbase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useState } from "react";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, SetError] = useState("");

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            // let data;
            if (newAccount) {
                // create newAccount
                createUserWithEmailAndPassword(authService, email, password).then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log('Signed in : ', userCredential);
                    console.log('Signed in : ', user); // user 정보 확인 가능

                })
                .catch((error) => {
                    SetError(error.message);
                })
            } else {
                // log in
                signInWithEmailAndPassword(authService, email, password).then((userCredential) => {
                    // Sigend in
                    const user = userCredential.user;
                    console.log('Log in : ', userCredential);
                    console.log('Log in : ', user);
                })
                .catch((error) => {
                    SetError(error.message);
                })
            }
        } catch (error) {
            // SetError(error.message);
            console.error(error.message);
        }
        
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        // console.log(event.target.name);
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                { error }
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>

            <div>
                <button onClick={onSocialClick} name="google">Cotinue with Google</button>
                <button onClick={onSocialClick} name="github">Cotinue with Github</button>
            </div>
        </div>
    );
};

export default Auth;