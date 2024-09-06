import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios/axios";
import { credentials, IAuth, typeAuthError } from "./types";
import { useEffect, useState } from "react";

const csrf = () => axios.get("/sanctum/csrf-cookie");
const getLoggedUser = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await axios.get("/api/user");
    return user.data;
  } catch (err) {
    throw err;
  }
};

export const useAuth = ({ middleware, redirectIfAuthenticated }: IAuth) => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário
  const [error, setError] = useState<typeAuthError>(null); // Estado para armazenar o erros
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      console.log("useAuth::getUser::fetchUser");
      try {
        const userData = await getLoggedUser();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        if (err?.response?.status === 401) {
          setError("Unauthenticated");
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    //console.log("useAuth::checkForRedirect");
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      navigate(redirectIfAuthenticated);
    }

    if (middleware === "auth" && error === "Unauthenticated") {
      console.log("middleware::auth and Unauthenticated");
      navigate("/login");
    }
  }, [user, error]);

  const login = async (data: credentials) => {
    await csrf();

    // eslint-disable-next-line no-useless-catch
    try {
      console.log("login");
      await axios.post("/login", data);
      navigate("/dashboard");
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      navigate("/");
    } catch (err) {
      console.log("logout::err", err);
    }
  };

  return { user, login, logout };
};
