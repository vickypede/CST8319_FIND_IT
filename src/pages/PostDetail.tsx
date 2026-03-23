import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Button, Badge, Spinner } from "../components/ui";
import { toast } from "../components/ui/Toast";
import type { Post } from "../types";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const snap = await getDoc(doc(db, "posts", id));
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() } as Post);
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  async function handleDelete() {
    if (!id || !post) return;
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

    setDeleting(true);
    try {
      if (post.photoURL) {
        const imgRef = ref(storage, `posts/${id}/main`);
        await deleteObject(imgRef).catch(() => {});
      }
      await deleteDoc(doc(db, "posts", id));
      toast("success", "Post deleted.");
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
      toast("error", "Failed to delete post.");
      setDeleting(false);
    }
  }

  const isOwner = user && post && user.uid === post.createdBy;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
        <p className="mt-2 text-gray-500">It may have been deleted or the link is incorrect.</p>
        <Button className="mt-6" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  const formattedDate = post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-primary hover:underline cursor-pointer"
      >
        &larr; Back
      </button>

      {post.photoURL && (
        <img
          src={post.photoURL}
          alt={post.title}
          className="w-full max-h-[28rem] rounded-xl object-cover border border-gray-200"
        />
      )}

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant={post.type} />
          <Badge variant={post.status} />
          <span className="text-xs text-gray-400">{post.category}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>

        <p className="mt-4 text-gray-700 whitespace-pre-wrap leading-relaxed">
          {post.description}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-gray-900">{post.locationText}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Date lost / found</dt>
            <dd className="mt-1 text-gray-900">{post.eventDate || "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Posted</dt>
            <dd className="mt-1 text-gray-900">{formattedDate}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <Badge variant={post.status} />
            </dd>
          </div>
        </dl>

        {isOwner && (
          <div className="mt-8 flex gap-3 border-t border-gray-200 pt-6">
            <Link to={`/posts/${post.id}/edit`}>
              <Button variant="secondary">Edit Post</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Post"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
