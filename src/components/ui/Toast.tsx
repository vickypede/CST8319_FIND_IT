import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
}

const typeStyles: Record<ToastType, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  warning: "bg-yellow-500 text-white",
};

let addToastFn: ((type: ToastType, text: string) => void) | null = null;

export function toast(type: ToastType, text: string) {
  addToastFn?.(type, text);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  let nextId = 0;

  useEffect(() => {
    addToastFn = (type, text) => {
      const id = ++nextId;
      setToasts((prev) => [...prev, { id, type, text }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
    return () => {
      addToastFn = null;
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg animate-in slide-in-from-right ${typeStyles[t.type]}`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
