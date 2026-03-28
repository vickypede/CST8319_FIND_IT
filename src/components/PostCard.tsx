import { useNavigate } from "react-router-dom";
import { Card, Badge } from "./ui";
import type { Post } from "../types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      variant="interactive"
      className="overflow-hidden"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      {post.photoURL && (
        <img
          src={post.photoURL}
          alt={post.title}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant={post.type} />
          <Badge variant={post.status} />
        </div>
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-slate-100">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-slate-400">{post.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-400 dark:text-slate-500">
          <span>{post.category}</span>
          <span>·</span>
          <span>{post.locationText}</span>
        </div>
      </div>
    </Card>
  );
}
