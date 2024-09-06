import React, { useState } from "react";
import { useAuth } from "../../actions/auth/useAuth";
import { credentials } from "../../actions/auth/types";
import Menu from "../components/menu/Index"

function Login() {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [data, setData] = useState<credentials>({
    email: "",
    password: "",
  });

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(data);
  };

  return (
      <>
          <Menu />

          <form onSubmit={handlerSubmit}>

          <div>Login</div>
          email:
          <input
              type='email'
              value={data.email}
              onChange={(e) =>
                  setData((prev) => ({...prev, email: e.target.value}))
              }
          />
          password:{" "}
          <input
              type='password'
              value={data.password}
              onChange={(e) =>
                  setData((prev) => ({
                      ...prev,
                      password: e.target.value,
                  }))
              }
          />
          <button type="submit" >
              Login
          </button>
          </form>
      </>
  );
}

export default Login;
