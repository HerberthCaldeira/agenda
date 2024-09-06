import { NavLink } from "react-router-dom";

interface IMenuItemProps {
  label: string;
  route: string;
}

export default function MenuItem({ label, route }: IMenuItemProps) {
  return (
    <NavLink
      style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}
      end
      to={route}
    >
      {label}
    </NavLink>
  );
}
