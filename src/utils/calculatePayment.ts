import { FormType } from "../components/Form";

export default function calculatePayment({
  amount,
  rate,
  term,
  type,
}: FormType): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
} {
  const monthlyInterestRate = rate / 12 / 100;
  const numberOfPayments = term * 12;

  if (type === "interest") {
    const monthlyPayment = amount * monthlyInterestRate;
    const totalInterest = monthlyPayment * term * 12;
    const totalPayment = totalInterest + amount;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  }

  const monthlyPayment =
    (amount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - amount;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}
