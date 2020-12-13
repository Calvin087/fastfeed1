import React, { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./db";
// using context to share state without passing things down.

import firebase from "./firebase";
// We created our own file to handle this with env keys etc.
import Router from "next/router";
import Cookies from "js-cookie";

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

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            // after we get our formatted user
            console.log(user);

            const { token, ...userWithoutToken } = user;
            // pulling the token off of user (rawUser),
            // now we have something to compare for validation

            createUser(user.uid, userWithoutToken);
            // this saves the user log in to the database.

            setUser(user);
            // user with token is in local state
            // so we can forward it to the backend

            Cookies.set("fast-feedback-auth", true, {
                expires: 1
            });
            return user;
        } else {
            setUser(false);
            Cookies.remove("fast-feedback-auth");
            return false;
        }
    };

    const signinWithGitHub = () => {
        Router.push("/dashboard");

        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signinWithGoogle = () => {
        Router.push("/dashboard");

        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => handleUser(response.user));
    };

    const signout = () => {
        Router.push("/");

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
        signinWithGoogle,
        signout
    };
}

const getStripeRole = async () => {
    await firebase.auth().currentUser.getIdToken(true);
    const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
    return decodedToken.claims.stripeRole
};

const formatUser = async (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.ya,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        stripRole: await getStripeRole()
    };
};
