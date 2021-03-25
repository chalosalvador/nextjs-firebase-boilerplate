/**
 * Created by chalosalvador on 2/2/21
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      // si tengo sesión activa
      setUser(user);

      return user;
    } else {
      // no tengo sesión activa
      setUser(false);
      return false;
    }
  };

  async function register(data) {
    console.log("data", data);
    try {
      const userAuthData = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      const { uid } = userAuthData.user;

      let photoURL =
        "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ=";
      if (data.photo) {
        const snapshot = await storage.ref(`users/${uid}`).put(data.photo);
        photoURL = await snapshot.ref.getDownloadURL();
      }

      const { name, email } = data;
      const userData = {
        name,
        email,
        photoURL,
        uid,
      };
      await db.collection("users").doc(uid).set(userData);
      return true;
    } catch (error) {
      handleUser(false);
      throw error;
    }
  }

  async function login(email, password) {
    console.log("email", email);
    console.log("password", password);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      handleUser(false);
      throw error;
    }
  }

  async function logout() {
    try {
      await auth.signOut();
      handleUser(false);
    } catch (error) {
      throw error;
    }
  }

  const sendPasswordResetEmail = async (email) => {
      await auth.sendPasswordResetEmail(email)
      return true;
     
  };
  //
  // const confirmPasswordReset = (password, code) => {
  //   const resetCode = code || getFromQueryString('oobCode');
  //
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(resetCode, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuthData) => {
      if (userAuthData) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("SESIÓN ACTIVA", userAuthData);
        const userDoc = await db
          .collection("users")
          .doc(userAuthData.uid)
          .get();
        const userData = userDoc.data();
        console.log("userDAta", userData);
        handleUser(userData);
      } else {
        // User is signed out
        console.log("SIN SESIÓN", userAuthData);
        handleUser(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    register,
    login,
    logout,
    sendPasswordResetEmail,
    // confirmPasswordReset
  };
}
