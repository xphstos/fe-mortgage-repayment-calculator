import { Form } from "./Form";
import { useState } from "react";
import EmptyIllustration from "../assets/illustration-empty.svg";
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";

export type Results = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
};

export const Calculator = () => {
  const [results, setResults] = useState<Results | null>(null);
  const { formatCurrency } = useCurrencyFormatter();

  return (
    <main className="sm:shadow-2xl sm:shadow-slate-900/10 sm:rounded-3xl bg-white grid lg:grid-cols-2 lg:w-[min(62.5rem,100%)] sm:w-[min(31.25rem,100%)]">
      <Form onFormSubmit={setResults} />
      {results ? (
        <div className="px-6 py-10 sm:p-10 lg:rounded-se-3xl sm:rounded-ee-3xl sm:rounded-es-3xl lg:rounded-es-[5rem] bg-slate-900 text-white">
          <h2 className="font-bold text-2xl leading-none mb-4">Your results</h2>
          <p className="text-balance text-slate-300">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className="p-6 rounded-md border-t-2 border-t-lime w-full bg-slate-1000 mt-8 space-y-4">
            <h3 className="text-slate-300">Your monthly repayments</h3>
            <p className="text-3xl lg:text-4xl text-lime font-bold">
              <strong>{formatCurrency(results.monthlyPayment)}</strong>
            </p>
            <div className="h-px bg-slate-700" />
            <h3 className="text-slate-300">Total you'll repay over the term</h3>
            <p className="font-bold text-2xl">
              <strong>{formatCurrency(results.totalPayment)}</strong>
            </p>
            <div className="h-px bg-slate-700" />
            <h3 className="text-slate-300">Total interests over the term</h3>
            <p className="font-bold text-2xl">
              <strong>{formatCurrency(results.totalInterest)}</strong>
            </p>
          </div>
        </div>
      ) : (
        <div className="px-6 py-10 sm:p-10 lg:rounded-se-3xl sm:rounded-ee-3xl sm:rounded-es-3xl lg:rounded-es-[5rem] bg-slate-900 text-white flex items-center justify-center flex-col">
          <img src={EmptyIllustration} alt="" />
          <h2 className="font-bold text-2xl leading-none my-5">
            Results shown here
          </h2>
          <p className="text-center text-balance text-slate-300">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      )}
    </main>
  );
};
