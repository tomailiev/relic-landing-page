import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from './firebase-init';

function uploadDoc(doc, col) {
    return addDoc(collection(db, col), doc)
        .then(docRef => console.log("Document written with ID: ", docRef.id))
        .catch(e => console.error("Error adding document: ", e));
}

function getLink(url) {
    return getDownloadURL(ref(storage, url));
}

export { uploadDoc, getLink };