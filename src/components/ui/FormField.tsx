import type { InputHTMLAttributes, RefCallback, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CommonProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  ref?: RefCallback<HTMLInputElement | HTMLTextAreaElement>;
};

type InputFieldProps = CommonProps & { multiline?: false } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    keyof CommonProps
  >;
type TextareaFieldProps = CommonProps & { multiline: true } & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof CommonProps
  >;

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

const control =
  "w-full rounded-lg border bg-cream px-4 text-body text-ink placeholder:text-ink-subtle " +
  "outline-none transition-[border-color,box-shadow] duration-200 " +
  "focus:border-brand focus:ring-3 focus:ring-brand/20";

export function FormField({ id, label, error, className, ...props }: FormFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  const border = error ? "border-coral" : "border-line";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body font-bold text-ink">
        {label}
      </label>
      {props.multiline ? (
        <textarea
          {...withoutMultiline(props)}
          {...shared}
          className={cn(control, border, "h-[100px] resize-y py-3.5 md:h-[120px]")}
        />
      ) : (
        <input {...withoutMultiline(props)} {...shared} className={cn(control, border, "py-3")} />
      )}
      {error ? (
        <p id={errorId} className="text-body text-[#c2381a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function withoutMultiline<T extends { multiline?: boolean }>(props: T): Omit<T, "multiline"> {
  const rest = { ...props };
  delete rest.multiline;
  return rest;
}
