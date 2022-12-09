import { NavLink } from "@remix-run/react";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/">Favorites</NavLink>
        <NavLink to="/stations">Stations</NavLink>
        <NavLink to="/nearby">Nearby</NavLink>
        <NavLink to="/recent">Recent</NavLink>
      </nav>
    </header>
  );
}
