import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import usePendingClaimCount from "../hooks/usePendingClaimCount";
import { Button } from "./ui";

export default function Navbar() {
  const { user, role, loading, logout } = useAuth();
  const pendingCount = usePendingClaimCount();

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white/80 px-6 py-3 backdrop-blur-md">
      <Link to="/" className="text-xl font-bold text-primary">
        FindIt
      </Link>

      <div className="flex items-center gap-3">
        {loading ? null : user ? (
          <>
            <Link to="/post/new">
              <Button size="sm">+ New Post</Button>
            </Link>
            <Link to="/activity" className="relative" title="My Activity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-gray-500 hover:text-primary transition-colors"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {pendingCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                  {pendingCount > 9 ? "9+" : pendingCount}
                </span>
              )}
            </Link>
            {role === "admin" && (
              <Link to="/admin">
                <Button size="sm" variant="secondary">Admin</Button>
              </Link>
            )}
            <span className="text-sm text-gray-500 hidden sm:inline">
              {user.displayName || user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button size="sm">Log in</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
