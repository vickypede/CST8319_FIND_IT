import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function usePendingClaimCount() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setCount(0);
      return;
    }

    let cancelled = false;

    async function fetch() {
      try {
        const postsSnap = await getDocs(
          query(collection(db, "posts"), where("createdBy", "==", user!.uid)),
        );
        const postIds = postsSnap.docs.map((d) => d.id);
        if (postIds.length === 0) { setCount(0); return; }

        let total = 0;
        const chunks = [];
        for (let i = 0; i < postIds.length; i += 30) {
          chunks.push(postIds.slice(i, i + 30));
        }
        for (const chunk of chunks) {
          const claimsSnap = await getDocs(
            query(
              collection(db, "claims"),
              where("postId", "in", chunk),
              where("status", "==", "pending"),
            ),
          );
          total += claimsSnap.size;
        }

        if (!cancelled) setCount(total);
      } catch {
        /* silently fail — badge just won't show */
      }
    }

    fetch();
    const interval = setInterval(fetch, 30_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [user]);

  return count;
}
