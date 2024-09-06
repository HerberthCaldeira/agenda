import { Outlet } from "react-router-dom";
import { useAuth } from "../../../actions/auth/useAuth";
import Menu from "./components/menu/Index";

export default function Dashboard() {
  const { user, logout } = useAuth({
    middleware: "auth",
  });

  if (!user) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <div>
        <Menu />
      </div>
      <div>
        <button type="button" onClick={logout}>
          logout
        </button>
        <hr />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
