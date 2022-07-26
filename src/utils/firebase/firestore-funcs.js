import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
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

function downloadDocs(col, condition, sorting) {
    const q = sorting
        ? query(collection(db, col), where(condition, "==", true), orderBy(sorting))
        : condition
            ? query(collection(db, col), where(condition, '==', true))
            : query(collection(db, col));
    return getDocs(q)
        .then(qSnap => {
            const docs = [];
            qSnap.forEach(doc => {
                docs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return docs;
        })
}

export { uploadDoc, getLink, downloadDocs };