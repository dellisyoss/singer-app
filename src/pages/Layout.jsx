import { useState } from "react";
import { Outlet, useMatch } from "react-router-dom";
import SingerNav from "../components/SingerNav";
import { singers } from "../data/singers";

export default function Layout() {
  const [lines, setLines] = useState([]);
  const [draft, setDraft] = useState("");

  const match = useMatch("/singer/:singerId");
  const current = singers.find((s) => s.id === match?.params.singerId);

  const commit = () => {
    if (current && draft.trim()) {
      setLines((prev) => [...prev, { singerId: current.id, text: draft.trim() }]);
      setDraft("");
    }
  };

  const colorOf = (id) => singers.find((s) => s.id === id)?.color;

  return (
    <div className="container">
      <h1 className="title">Complete the Lyrics</h1>

      <SingerNav onSelect={commit} />

      <Outlet context={{ draft, setDraft, commit }} />

      <div className="lyrics-box">
        {lines.map((line, i) => (
          <div key={i} className="line" style={{ background: colorOf(line.singerId) }}>
            {line.text}
          </div>
        ))}
        {current && draft && (
          <div className="line" style={{ background: current.color }}>
            {draft}
          </div>
        )}
      </div>
    </div>
  );
}