import { NavLink } from "react-router-dom";
import Page from "../models/page";

interface NavBarProps {
  pages: Page[];
}

export const NavBar = ({ pages }: NavBarProps) => {
  return (
    <nav>
      <ul>
        {pages.map((page) => (
          <li key={page.path}>
            <NavLink to={page.path}>{page.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;