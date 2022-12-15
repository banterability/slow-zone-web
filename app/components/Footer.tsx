import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="footer">
      <Link to="/stations" prefetch="intent">
        View All Stations
      </Link>
      <span>Data provided by Chicago Transit Authority</span>
    </div>
  );
}
