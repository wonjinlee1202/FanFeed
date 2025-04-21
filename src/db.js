import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Save an array for a user
export const saveUserStrings = async (uid, stringsArray) => {
  await setDoc(doc(db, "users", uid), {
    strings: stringsArray,
  });
};

// Get a user's strings array
export const getUserStrings = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().strings || [];
  } else {
    return []; // New user, no data yet
  }
};