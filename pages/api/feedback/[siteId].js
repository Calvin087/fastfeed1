import { getAllFeedback } from "@/lib/db-admin";
import db from "@/lib/firebase-admin";

export default async (req, res) => {
    const siteId = req.query.siteId // this is the page url as we visit the page?
    const feedback = getAllFeedback(siteId) // this gets the id from Firestore

    res.status(200).json({ feedback });
};
