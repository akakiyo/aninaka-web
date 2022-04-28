import { useState, useCallback, useEffect } from "react";
import { firebaseAuth } from "../firebase";

const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState(firebaseAuth.currentUser);
  const [userId, setUserId] = useState(
    firebaseAuth?.currentUser?.multiFactor?.user?.uid
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    firebaseAuth.onAuthStateChanged((user) => {
      if (isMounted) {
        if (user) {
          user.getIdTokenResult(true).then((result) => {
            setIsAuthenticated(true);
            setCurrentUser(user);
            setIsLoading(false);
          });
        } else {
          setIsAuthenticated(false);
          setCurrentUser("");
          setIsLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const cleanUpAuthentication = () => {
    setIsAuthenticated(false);
    setCurrentUser("");
    setIsLoading(true);
  };

  const signup = useCallback(async (email, password) => {
    const user = await firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => alert(err));
    return user.user.multiFactor.user.uid;
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
    userId,
    isAuthenticated,
    isLoading,
  };
};

export default useFirebaseAuth;
