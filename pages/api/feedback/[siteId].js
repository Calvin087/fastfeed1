import { getAllFeedback } from "@/lib/db-admin";
import db from "@/lib/firebase-admin";

export default async (req, res) => {
    const siteId = req.query.siteId // this is the page url as we visit the page?
    console.log("Dave" + req);
    const {feedback, error} = await getAllFeedback(siteId) // this gets the id from Firestore

    if(error) {
        res.status(500).json({ error });         
    } else {
        res.status(200).json({ feedback });
    }

};
