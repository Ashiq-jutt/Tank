import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

export async function saveData(collection, doc, jsonObject) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
  console.log('Document successfully written!');
}

export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export async function getAllOfCollectionwhere(collection, key, id) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, '==', id)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfCollectiondoublewhere(
  collection,
  key,
  id,
  key1,
  id1,
) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, '==', id)
    .where(key1, '==', id1)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function getAllOfCollectiondoublewhere3(
  collection,
  key,
  id,
  key1,
  id1,
  key2,
  id2,
) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, '==', id)
    .where(key1, '==', id1)
    .where(key2, '==', id2)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function uploadImage(uri, path) {
  try {
    console.log('====================================');
    console.log(uri, path);
    console.log('====================================');
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref(path);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        },
        err => {
          reject(err);
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
          return url;
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err);
  }
}
export async function Delete(collection, doc) {
  await firestore().collection(collection).doc(doc).delete();
}
export async function getDoc(collection,doc){
  let found=false
  await firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        found=doc.exists
       });
       return found;
}