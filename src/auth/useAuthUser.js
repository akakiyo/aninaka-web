import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const useAuthUser = () => {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios
        .get("http://user-auth.aninaka-api.net/verify", {
          headers: {
            Authorization: cookies["token"],
          },
        })
        .then((res) => {
          setIsAuthenticated(res.data.isAuthenticated);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [cookies]);

  const cleanUpAuthentication = useCallback(() => {
    removeCookie("token");
    setUserName("");
    setUserId("");
    setIsAuthenticated(false);
    setIsLoading(true);
  }, [removeCookie]);

  const signup = useCallback(async (userName, emailAddress, password) => {
    axios({
      method: "POST",
      url: `http://user-auth.aninaka-api.net/signup`,
      data: { userName, emailAddress, password },
    }).then((res) => {
      setUserName(res.data.userName);
      setUserId(res.data.userId);
    });
  }, []);

  const login = useCallback(
    async (emailAddress, password) => {
      axios({
        method: "GET",
        url: `http://user-auth.aninaka-api.net/login/`,
        params: { emailAddress, password },
      }).then((res) => {
        if (res.data?.user_name) {
          setUserName(res.data.user_name);
        }
        setCookie("token", res.data.token);
      });
    },
    [setCookie]
  );
  const logout = useCallback(async () => {
    axios({
      method: "GET",
      url: `http://user-auth.aninaka-api.net/logout`,
    }).then(() => {
      cleanUpAuthentication();
    });
  }, [cleanUpAuthentication]);

  return {
    signup,
    login,
    logout,
    userName,
    userId,
    isAuthenticated,
    isLoading,
  };
};

export default useAuthUser;
