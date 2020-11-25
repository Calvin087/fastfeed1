import React, { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./db";
// using context to share state without passing things down.

import firebase from "./firebase";
// We created our own file to handle this with env keys etc.

const authContext = createContext();
// This file creates a custom hook to encapsulate functionality to a shared spot

export function AuthProvider({ children }) {
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

// Inside here we're defining the functions we want to be available
// Then exporting them out.

function useProvideAuth() {
    const [user, setUser] = useState(null);
    // After we get user, we're setting it in state to access later.


    // These are all Methods

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser)
            // after we get our formatted user
            
            createUser(user.uid, user)
            // this saves the user log in to the database.
            
            setUser(user)
            return user

        } else {

            setUser(false)
            return false
        }
    }

    const signinWithGitHub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => handleUser(response.user))
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => handleUser(false));
    };

    // If the USER state changes this will either update user or set it to FALSE

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGitHub,
        signout
    };
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL
    };
};
