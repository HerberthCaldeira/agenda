import { Link } from "react-router-dom";
import { useAuth } from "../../actions/auth/useAuth";
import Menu from "../components/menu/Index"
export default function Home() {

  return (
      <>
          <Menu />
      </>
  );
}
