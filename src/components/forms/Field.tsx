"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-[10px] border bg-white px-3.5 text-[0.9375rem] text-charcoal-900 " +
  "placeholder:text-charcoal-600/80 transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-cedar-600/25";

const controlState = (invalid: boolean) =>
  invalid
    ? "border-danger/60 focus:border-danger"
    : "border-charcoal-900/18 hover:border-charcoal-900/32 focus:border-cedar-600";

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

function FieldShell({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.8125rem] font-semibold text-charcoal-800"
      >
        {label}
        {required ? (
          <span className="ml-1 text-cedar-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-charcoal-600">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.75rem] text-charcoal-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[0.75rem] font-medium text-danger"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function TextField({ id, label, error, hint, className, ...props }: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={props.required}
      className={className}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, controlState(Boolean(error)), "h-12")}
        {...props}
      />
    </FieldShell>
  );
}

/* -------------------------------------------------------------------------- */

type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "className"
> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function TextAreaField({
  id,
  label,
  error,
  hint,
  className,
  rows = 4,
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={props.required}
      className={className}
    >
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          controlBase,
          controlState(Boolean(error)),
          "resize-y py-3 leading-relaxed",
        )}
        {...props}
      />
    </FieldShell>
  );
}

/* -------------------------------------------------------------------------- */

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> & {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function SelectField({
  id,
  label,
  options,
  placeholder = "Select an option",
  error,
  hint,
  className,
  ...props
}: SelectFieldProps) {
  // Preserve the source order of groups while collecting their options.
  const groups = options.reduce<Map<string, SelectOption[]>>((acc, option) => {
    const key = option.group ?? "";
    const existing = acc.get(key);
    if (existing) existing.push(option);
    else acc.set(key, [option]);
    return acc;
  }, new Map());

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={props.required}
      className={className}
    >
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            controlBase,
            controlState(Boolean(error)),
            "h-12 cursor-pointer appearance-none pr-10",
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {Array.from(groups.entries()).map(([group, groupOptions]) =>
            group ? (
              <optgroup key={group} label={group}>
                {groupOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              groupOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            ),
          )}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-charcoal-700"
        >
          <path
            d="m5 7.5 5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </FieldShell>
  );
}
