import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";
import { cn } from "../utils/cn";
import { FieldInput } from "./FieldInput";
import { Dispatch, SetStateAction } from "react";
import { Results } from "./Calculator";
import calculatePayment from "../utils/calculatePayment";

const FormSchema = z.object({
  amount: z.number().positive("This field is required").min(1),
  rate: z.number().positive("This field is required").min(1),
  term: z.number().positive("This field is required").min(1),
  type: z.union([z.literal("repayment"), z.literal("interest")]),
});

export type FormType = z.infer<typeof FormSchema>;

type FormProps = {
  onFormSubmit: Dispatch<SetStateAction<Results | null>>;
};

export const Form = ({ onFormSubmit }: FormProps) => {
  const { currencySymbol } = useCurrencyFormatter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    mode: "all",
    defaultValues: {
      amount: undefined,
      term: undefined,
      rate: undefined,
      type: undefined,
    },
  });
  const onSubmit: SubmitHandler<FormType> = (data) => {
    // console.log(data);
    const { monthlyPayment, totalPayment, totalInterest } =
      calculatePayment(data);
    onFormSubmit({ monthlyPayment, totalPayment, totalInterest });
  };

  const clearAll = () => {
    reset();
    onFormSubmit(null);
  };

  return (
    <div className="px-6 py-10 sm:p-10">
      <header className="flex items-center gap-4 mb-10 flex-wrap sm:justify-between">
        <h1 className="font-bold text-2xl leading-none basis-[fit-content] grow">
          Mortgage Calculator{" "}
        </h1>
        <button
          className="underline hover:no-underline leading-none text-slate-700 hover:text-slate-900 focus-visible:text-slate-900 focus-visible:no-underline transition-all basis-[fit-content]"
          type="button"
          onClick={clearAll}
        >
          Clear All
        </button>
      </header>
      <form
        className="grid sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldInput<FormType>
          label="Mortgage Amount"
          prefix={currencySymbol}
          error={errors?.amount?.message}
          name="amount"
          register={register}
          registerOptions={{
            setValueAs: (v) => parseFloat(v ? v : 0),
          }}
          className="sm:col-span-2"
        />
        <FieldInput<FormType>
          label="Mortgage Term"
          suffix="years"
          error={errors?.term?.message}
          name="term"
          register={register}
          registerOptions={{
            setValueAs: (v) => parseInt(v ? v : 0),
          }}
        />

        <FieldInput<FormType>
          label="Interest Rate"
          suffix="%"
          error={errors?.rate?.message}
          name="rate"
          register={register}
          registerOptions={{
            setValueAs: (v) => parseInt(v ? v : 0),
          }}
        />
        <div className="sm:col-span-2 space-y-3">
          <div className="text-slate-700">Mortgage Type</div>
          <label className="flex group items-center gap-4 px-4 rounded-md ring-1 ring-slate-300 min-h-12 focus-within:ring-slate-500 hover:bg-slate-100 transition-colors has-[:checked]:bg-lime/10 has-[:checked]:ring-lime">
            <input
              className={cn(
                "appearance-none size-5 aspect-square rounded-full relative ring-1 ring-slate-700 transition-all",
                "before:absolute before:inset-[.25rem] before:bg-slate-900 before:rounded-full before:opacity-0 transition-all",
                "checked:ring-lime checked:before:bg-lime checked:before:opacity-100",
              )}
              type="radio"
              value="repayment"
              {...register("type")}
            />
            <div className="text-lg font-bold text-slate-900">Repayment</div>
          </label>
          <label className="flex group items-center gap-4 px-4 rounded-md ring-1 ring-slate-300 min-h-12 focus-within:ring-slate-500 hover:bg-slate-100 transition-colors has-[:checked]:bg-lime/10 has-[:checked]:ring-lime">
            <input
              className={cn(
                "appearance-none size-5 aspect-square rounded-full relative ring-1 ring-slate-700 transition-all",
                "before:absolute before:inset-[.25rem] before:bg-slate-900 before:rounded-full before:opacity-0 transition-all",
                "checked:ring-lime checked:before:bg-lime checked:before:opacity-100",
              )}
              type="radio"
              value="interest"
              {...register("type")}
            />
            <div className="text-lg font-bold text-slate-900">
              Interest Only
            </div>
          </label>
        </div>
        <button
          className="sm:col-span-2 justify-self-start bg-lime hover:bg-lime/75 min-h-14 flex items-center gap-3 justify-center px-8 rounded-full font-bold cursor-pointer transition-all disabled:pointer-events-none disabled:bg-slate-100 disabled:text-slate-300"
          type="submit"
          disabled={!isValid}
        >
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
            />
          </svg>
          <span className="basis-[fit-content]">Calculate Repayments</span>
        </button>
      </form>
    </div>
  );
};
