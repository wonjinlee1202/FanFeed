import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "./firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  
  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        setUser(firebaseUser);
        setToken(token);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, token, loading, handleSignIn, handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
