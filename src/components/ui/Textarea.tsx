import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = "", id, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`rounded-lg border px-3 py-2 text-sm transition-colors duration-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y ${
          error ? "border-red-400" : "border-gray-300"
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
