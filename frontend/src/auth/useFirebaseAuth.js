import { useState, useCallback, useEffect } from "react";
import { firebaseAuth } from "../firebase";

const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState(firebaseAuth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult(true).then((result) => {
          if (!unmounted) {
            setIsAuthenticated(true);
            setCurrentUser(user);
            setIsLoading(false);
          }
        });
      } else if (!unmounted) {
        setIsAuthenticated(false);
        setCurrentUser("");
        setIsLoading(false);
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);

  const cleanUpAuthentication = () => {
    setIsAuthenticated(false);
    setCurrentUser("");
    setIsLoading(true);
  };

  const signup = useCallback((email, password) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => alert(err));
  }, []);

  const login = useCallback((email, password) => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err));
  }, []);

  const logout = useCallback(() => {
    firebaseAuth.signOut();
    cleanUpAuthentication();
  }, []);

  return {
    signup,
    login,
    logout,
    currentUser,
    isAuthenticated,
    isLoading,
  };
};

export default useFirebaseAuth;
