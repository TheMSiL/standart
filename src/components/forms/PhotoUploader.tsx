"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { UPLOAD_LIMITS, validatePhoto } from "@/lib/validation";
import { cn, formatBytes } from "@/lib/utils";

interface PhotoUploaderProps {
  name?: string;
  label?: string;
  hint?: string;
  /** Server-side error for this field. */
  error?: string;
  /** Bumped by the parent after a successful submit to clear the previews. */
  resetSignal?: number;
  className?: string;
}

interface Preview {
  id: string;
  file: File;
  url: string;
}

/**
 * Drag-and-drop photo upload with previews.
 *
 * The visible UI is a button and a drop zone; the actual `<input type="file">`
 * stays in the DOM (visually hidden) and is kept in sync via a DataTransfer, so
 * the files ride along with the normal FormData post to the server action. That
 * keeps the form working as a plain multipart submission rather than needing a
 * separate upload endpoint.
 */
export function PhotoUploader({
  name = "photos",
  label = "Upload photos",
  hint = "Photos of the space help us give you a far more accurate number.",
  error,
  resetSignal = 0,
  className,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  /** Mirror the current selection into the real input element. */
  const syncInput = useCallback((items: Preview[]) => {
    if (!inputRef.current) return;
    const transfer = new DataTransfer();
    items.forEach((item) => transfer.items.add(item.file));
    inputRef.current.files = transfer.files;
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setLocalError(null);

      setPreviews((current) => {
        const next = [...current];

        for (const file of Array.from(incoming)) {
          if (next.length >= UPLOAD_LIMITS.maxFiles) {
            setLocalError(`You can attach up to ${UPLOAD_LIMITS.maxFiles} photos.`);
            break;
          }

          const problem = validatePhoto(file);
          if (problem) {
            setLocalError(problem);
            continue;
          }

          // Skip exact duplicates rather than uploading the same photo twice.
          const duplicate = next.some(
            (item) => item.file.name === file.name && item.file.size === file.size,
          );
          if (duplicate) continue;

          next.push({
            id: `${file.name}-${file.size}-${file.lastModified}`,
            file,
            url: URL.createObjectURL(file),
          });
        }

        syncInput(next);
        return next;
      });
    },
    [syncInput],
  );

  const removeAt = (id: string) => {
    setPreviews((current) => {
      const target = current.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.url);
      const next = current.filter((item) => item.id !== id);
      syncInput(next);
      return next;
    });
    setLocalError(null);
  };

  // Clear previews when the parent form resets after a successful submit.
  useEffect(() => {
    if (resetSignal === 0) return;
    setPreviews((current) => {
      current.forEach((item) => URL.revokeObjectURL(item.url));
      return [];
    });
    setLocalError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [resetSignal]);

  // Release object URLs on unmount.
  useEffect(() => {
    return () => {
      setPreviews((current) => {
        current.forEach((item) => URL.revokeObjectURL(item.url));
        return current;
      });
    };
  }, []);

  const message = error ?? localError;
  const describedBy = `${name}-hint${message ? ` ${name}-error` : ""}`;

  return (
    <div className={className}>
      <label
        htmlFor={`${name}-input`}
        className="mb-2 block text-[0.8125rem] font-semibold text-charcoal-800"
      >
        {label}
        <span className="ml-1.5 font-normal text-charcoal-600">(optional)</span>
      </label>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (event.dataTransfer.files?.length) addFiles(event.dataTransfer.files);
        }}
        className={cn(
          "relative rounded-xl border border-dashed p-4 transition-colors",
          dragging
            ? "border-cedar-600 bg-cedar-50"
            : message
              ? "border-danger/45 bg-white"
              : "border-charcoal-900/20 bg-white hover:border-cedar-600/50",
        )}
      >
        <input
          ref={inputRef}
          id={`${name}-input`}
          type="file"
          name={name}
          multiple
          accept={UPLOAD_LIMITS.acceptAttr}
          onChange={(event) => {
            if (event.target.files?.length) addFiles(event.target.files);
          }}
          aria-describedby={describedBy}
          className="sr-only"
        />

        <div className="flex flex-col items-center gap-2 py-3 text-center">
          <span className="grid size-10 place-items-center rounded-full bg-beige text-cedar-700">
            <Upload className="size-4.5" strokeWidth={2} />
          </span>
          <p className="text-[0.875rem] text-charcoal-800">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="font-semibold text-cedar-700 underline underline-offset-2 hover:text-cedar-800"
            >
              Choose photos
            </button>{" "}
            <span className="hidden sm:inline">or drag them here</span>
          </p>
          <p id={`${name}-hint`} className="text-[0.75rem] text-charcoal-600">
            JPG, PNG, WEBP or HEIC · up to {UPLOAD_LIMITS.maxFiles} photos · max 10 MB each
          </p>
        </div>

        {previews.length > 0 ? (
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {previews.map((item) => (
              <li key={item.id} className="group relative">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-beige ring-1 ring-charcoal-900/10 ring-inset">
                  <Image
                    src={item.url}
                    alt={item.file.name}
                    fill
                    unoptimized
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(item.id)}
                  aria-label={`Remove ${item.file.name}`}
                  className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-charcoal-900 text-white shadow-md transition-transform hover:scale-110"
                >
                  <X className="size-3.5" strokeWidth={2.5} />
                </button>
                <p className="mt-1 truncate text-[0.6875rem] text-charcoal-600">
                  {formatBytes(item.file.size)}
                </p>
              </li>
            ))}

            {previews.length < UPLOAD_LIMITS.maxFiles ? (
              <li>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="grid aspect-square w-full place-items-center rounded-lg border border-dashed border-charcoal-900/20 text-charcoal-600 transition-colors hover:border-cedar-600/60 hover:text-cedar-700"
                  aria-label="Add more photos"
                >
                  <ImagePlus className="size-5" strokeWidth={1.75} />
                </button>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>

      {hint && !message ? (
        <p className="mt-2 text-[0.75rem] text-charcoal-600">{hint}</p>
      ) : null}
      {message ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 text-[0.75rem] font-medium text-danger"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
