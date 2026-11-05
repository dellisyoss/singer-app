import { NavLink } from "react-router-dom";
import { singers } from "../data/singers";

export default function SingerNav({ onSelect }) {
  return (
    <nav className="singer-nav">
      {singers.map((s) => (
        <NavLink
          key={s.id}
          to={`/singer/${s.id}`}
          onClick={onSelect}
          style={{ background: s.color }}
          className={({ isActive }) => "singer-btn" + (isActive ? " active" : "")}
        >
          {s.name}
        </NavLink>
      ))}
    </nav>
  );
}