import firebase from '@react-native-firebase/app';
import Rnfirestore from '@react-native-firebase/firestore';
import SERVICES from '.';
export async function insertBatch(collection = 'events', array = [], is_doc = true) {
    try {
        const db = Rnfirestore();
        const batch = db.batch();
        array.map(doc => {
            if (is_doc) {
                var docRef = db.collection(collection).doc(doc?.event_id); //automatically generate unique id
                batch.set(docRef, doc);
            } else {
                var docRef = db.collection(collection).doc(); //automatically generate unique id
                batch.set(docRef, doc);
            }
        });
        return batch.commit();
    } catch (error) {
        console.log('error:', error);
    }
}
// can also be used for update doc
export const saveData = async (
    collection,
    doc,
    jsonObject,
) => {
    try {
        const ref = Rnfirestore().collection(collection);

        const obj = SERVICES._removeEmptyKeys(jsonObject);
        const res = await ref.doc(doc).set(jsonObject, { merge: true });
        return res;
    } catch (error) {
        console.log('error::', error);

        throw error;
    }

    //console.log("Document successfully written!");
};
export const updateDocument = async (
    collection,
    doc,
    jsonObject,
) => {
    try {
        const ref = Rnfirestore().collection(collection);
        const obj = SERVICES._removeEmptyKeys(jsonObject);
        const res = await ref.doc(doc).update(obj);
        return res;
    } catch (error) {
        console.log('error::', error);

        throw error;
    }

    //console.log("Document successfully written!");
};
export const getData = (collection, doc) => Rnfirestore()
    .collection(collection)
    .doc(doc)
    .get()
    .then(function (doc) {
        if (doc.exists) {
            return doc.data();
        } else {
            return false;
        }
    });
export const getDatabyKey = async (
    collection,
    doc,
    objectKey,
) => {
    try {
        const ref = Rnfirestore().collection(collection);

        const res = await ref.doc(doc).get();
        if (res.exists) {
            return res.data()[objectKey];
        } else {
            return [];
        }
    } catch (error) {
        throw SERVICES?._returnError(error);
    }
};
export const getAllOfCollection = async (collection) => {
    let data = [];
    let querySnapshot = null;
    querySnapshot = await Rnfirestore().collection(collection).get();
    querySnapshot.forEach(function (doc) {
        if (doc.exists) {
            data.push(doc.data());
        } else {
            console.log('No document found!');
        }
    });
    return data;
};
export const getAllOfCollection2 = async (
    collection,
    key,
    op,
    value,
) => {
    let data = [];
    let querySnapshot = null;
    querySnapshot = await Rnfirestore()
        .collection(collection)
        .where(key, op, value)
        .get();
    querySnapshot.forEach(function (doc) {
        if (doc.exists) {
            data.push(doc.data());
        } else {
            console.log('No document found!');
        }
    });
    return data;
};
export const removeItemfromArrayValue = async (
    collection,
    doc,
    array,
    value,
) => {
    let docRef = await Rnfirestore().collection(collection).doc(doc);
    let docData = await docRef.get();

    if (docData.exists && docData && docData.data()[array] != undefined) {
        docRef.update({
            [array]: firebase.firestore.FieldValue.arrayRemove(value),
        });
    }
};
export const addToArray = async (
    collection,
    doc,
    array,
    value,
) => {
    let docRef = Rnfirestore().collection(collection).doc(doc);
    let docData = await docRef.get();

    if (docData.exists && docData.data()[array] != undefined) {
        // docRef.update({
        //   [array]: firebase.firestore.FieldValue.arrayUnion(value),
        // });
        saveData(collection, doc, { [array]: [...docData.data()[array], value] });
    } else {
        saveData(collection, doc, { [array]: [value] });
    }
};
export const filterArrayCollections = async (
    collection,
    key,
    op,//'in' | 'array-contains-any',
    values,
) => {
    try {
        if (!values || !values.length || !collection) return [];

        const ref = Rnfirestore().collection(collection);
        const batches = [];

        while (values.length) {
            // firestore limits batches to 10
            const batch = values.splice(0, 10);

            // add the batch request to to a queue
            batches.push(
                ref
                    .where(key, op, [...batch])
                    .get()
                    .then(results =>
                        results.docs.map(result => ({
              /* id: result.id, */ ...result.data(),
                        })),
                    ),
            );
        }

        // after all of the data is fetched, return it
        return Promise.all(batches).then(content => content.flat());
    } catch (error) {
        throw new Error(SERVICES._returnError(error));
    }
};
export const filterCollections = async (
    collection,
    key,
    op,
    value,
) => {
    try {
        const ref = Rnfirestore().collection(collection);
        const querySnapshot = await ref?.where(key, op, value).get();
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data?.push(documentSnapshot.data());
        });
        return data;
    } catch (error) {
        throw new Error(SERVICES._returnError(error));
    }
};
