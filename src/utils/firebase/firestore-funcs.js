import { collection, addDoc, getDocs, query, where, orderBy, getDoc, doc, setDoc, limit } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage, logEvent, analytics } from './firebase-init';

function uploadDoc(doc, col) {
    return addDoc(collection(db, col), doc)
        .then(docRef => console.log("Document written with ID: ", docRef.id))
        .catch(e => console.error("Error adding document: ", e));
}

function uploadDocWithId(docData, col, id) {
    return setDoc(doc(db, col, id), docData, { merge: true })
        .then(docRef => console.log("Document written with ID: ", docRef?.id || id))
        .catch(e => console.error("Error adding document: ", e));

}

function getLink(url) {
    return getDownloadURL(ref(storage, url));
}

function downloadDocs(col, condition, sorting) {
    const q = sorting
        ? query(collection(db, col), where(...condition), orderBy(...sorting))
        : condition
            ? query(collection(db, col), where(...condition))
            : query(collection(db, col));
    return getDocs(q)
        .then(qSnap => {
            const docs = [];
            qSnap.forEach(doc => {
                docs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return docs;
        })
        .catch(_e => {
            console.error('firebase failed to load');
        })
}

function downloadDocsV2(col, options = []) {
    const queryConditions = options?.map(c => (
        c.type === 'condition'
            ? where(...c.value)
            : c.type === 'sorting'
                ? orderBy(...c.value)
                : limit(...c.value)
    ));
    const q = query(collection(db, col), ...queryConditions);

    return getDocs(q)
        .then(qSnap => {
            const docs = [];
            qSnap.forEach(doc => {
                docs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return docs;
        })
}

function downloadOneDoc(col, id) {
    // REVISE!!!
    return getDoc(doc(db, col, id))
        .then(item => {
            if (!item) console.log('Problem loading');
            return Object.assign({ id: item.id }, item.data());
        })
        .catch(_e => console.error('no data'));
}

function analyze(eventType, eventParams) {
    logEvent(analytics, eventType, eventParams);
}

export { uploadDoc, uploadDocWithId, getLink, downloadDocs, downloadDocsV2, downloadOneDoc, analyze };