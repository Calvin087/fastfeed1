import React, { useState, useEffect, useContext, createContext } from "react";
// using context to share state without passing things down.

import firebase from "./firebase";
// We created our own file to handle this with env keys etc.

const authContext = createContext();
// This file creates a custom hook to encapsulate functionality to a shared spot

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
    // This is making the values available to the children
    // We wrap the app in this and give access to everything
}

// ==================

export const useAuth = () => {
    return useContext(authContext);
};

// ==================
// ==================
// ==================
// ==================

// Inside here we're defining the functions we want to be available
// Then exporting them out.

function useProvideAuth() {
    const [user, setUser] = useState(null);
    // After we get user, we're setting it in state to access later.

    console.log(user);

    // These are all Methods

    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };

    // If the USER state changes this will either update user or set it to FALSE

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signout
    };
}
