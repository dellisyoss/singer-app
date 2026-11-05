import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="message">
      <h1>404 Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}