import firebase from './firebase'

// Saving user from firebase to firestore

const firestore = firebase.firestore()

export function createUser(uid, data) {
    return firestore
        .collection("users") // similar to a table
        .doc(uid) // for this document at this id (uid), set it == to below
        .set({uid, ...data}, {merge: true}) // Merge apparently keeps id unique
}

export function createSite(data) {
    const site = firestore.collection('sites').doc() // returns the unique id
    site.set(data)
    return site
}

export function createFeedback(data) {
    return firestore
        .collection("feedback") // similar to a table
        .add(data); // removing doc, makes firestore create the ID for the data, then we have to add instead of set
}

export function deleteFeedback(id) {
    return firestore
        .collection("feedback") // similar to a table
        .doc(id)
        .delete(); // removing doc, makes firestore create the ID for the data, then we have to add instead of set
}