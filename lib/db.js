import firebase from './firebase'

// Saving user from firebase to firestore

const firestore = firebase.firestore()

export function createUser(uid, data) {
    return firestore
        .collection("users") // similar to a table
        .doc(uid) // for this document at this id (uid), set it == to below
        .set({uid, ...data}, {merge: true}) // Merge apparently keeps id unique
}
