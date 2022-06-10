import { collection, addDoc } from "firebase/firestore";
import {db} from './firebase-init';

function uploadDoc(doc, col) {
        return addDoc(collection(db, col), doc)
            .then(docRef => console.log("Document written with ID: ", docRef.id))
            .catch(e => console.error("Error adding document: ", e));
}

export default uploadDoc;