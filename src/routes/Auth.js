import { authService } from "fbase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

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
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log(error);
                    console.log(errorCode);
                    console.log(errorMessage);
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
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log(error);
                    console.log(errorCode);
                    console.log(errorMessage);
                  });
            }
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Cotinue with Google</button>
                <button>Cotinue with Github</button>
            </div>
        </div>
    );
};

export default Auth;