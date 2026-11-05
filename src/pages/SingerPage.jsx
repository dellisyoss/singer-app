import { Link, useOutletContext, useParams } from "react-router-dom";
import { singers } from "../data/singers";

export default function SingerPage() {
  const { singerId } = useParams();
  const { draft, setDraft, commit } = useOutletContext();
  const singer = singers.find((s) => s.id === singerId);

  if (!singer) {
    return (
      <div className="message">
        <h2>Singer Not Found</h2>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <input
      className="lyric-input"
      autoFocus
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && commit()}
    />
  );
}