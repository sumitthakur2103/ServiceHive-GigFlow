import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <Card className="max-w-lg text-center">
        <h1 className="text-5xl font-semibold" style={{ color: "var(--text)" }}>404</h1>
        <p className="mt-4" style={{ color: "var(--muted)" }}>The page you’re looking for doesn’t exist.</p>
        <div className="mt-6">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
