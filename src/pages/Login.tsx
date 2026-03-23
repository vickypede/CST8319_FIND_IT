import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg">
            Signed in as <span className="font-semibold">{user.displayName || user.email}</span>
          </p>
          <button
            onClick={logout}
            className="rounded-lg bg-gray-200 px-6 py-3 text-gray-800 hover:bg-gray-300"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">FindIt</h1>
        <p className="text-gray-500 mb-8">Campus Lost &amp; Found Tracker</p>
        <button
          onClick={loginWithGoogle}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 cursor-pointer"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
