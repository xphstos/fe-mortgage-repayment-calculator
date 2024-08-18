import { ClassValue } from "clsx";
import { ComponentProps, InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type FieldProps<T extends FieldValues> = {
  className?: ClassValue;
  label?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
} & ComponentProps<"label">;

export function FieldInput<T extends FieldValues>({
  className,
  prefix,
  suffix,
  name,
  register,
  registerOptions = {},
  inputProps,
  label,
  error,
  ...props
}: FieldProps<T>) {
  return (
    <label className={cn("space-y-3", className)} {...props}>
      {label && <div className="text-slate-700">{label}</div>}
      <div
        className={cn(
          "flex items-stretch rounded-md overflow-hidden focus-within:ring-slate-500 ring-1 ring-slate-300  min-h-12 ",
          {
            "ring-red focus-within:ring-red": error,
          },
        )}
      >
        {prefix ? (
          <div
            className={cn(
              "px-4 bg-slate-100 leading-none text-slate-700 font-bold text-lg flex items-center justify-center",
              {
                "bg-red text-white": error,
              },
            )}
          >
            {prefix}
          </div>
        ) : null}
        <input
          className="min-w-1 w-full flex-auto outline-none font-bold text-slate-900 text-lg px-4 leading-none"
          type="text"
          step={0.1}
          {...inputProps}
          {...register(name, registerOptions)}
        />
        {suffix ? (
          <div
            className={cn(
              "px-4 bg-slate-100 leading-none text-slate-700 font-bold text-lg flex items-center justify-center",
              {
                "bg-red text-white": error,
              },
            )}
          >
            {suffix}
          </div>
        ) : null}
      </div>
      {error && <div className="text-red text-sm">{error}</div>}
    </label>
  );
}
