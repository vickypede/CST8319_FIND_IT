import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <Link to="/" className="text-xl font-bold text-blue-600">
        FindIt
      </Link>

      <div className="flex items-center gap-4">
        {loading ? null : user ? (
          <>
            <Link to="/post/new" className="text-gray-700 hover:text-blue-600">
              + New Post
            </Link>
            <span className="text-sm text-gray-500">{user.displayName || user.email}</span>
            <button
              onClick={logout}
              className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
