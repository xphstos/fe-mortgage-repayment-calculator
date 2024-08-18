import { useState, useEffect } from "react";

const localeCurrencyMap: LocaleCurrencyMap = {
  "en-US": "USD",
  "en-GB": "GBP",
  "en-CA": "CAD",
  "en-AU": "AUD",
  "en-NZ": "NZD",
  "en-IN": "INR",
  "en-ZA": "ZAR",
  "en-SG": "SGD",
  "en-HK": "HKD",
  "en-NG": "NGN",
  "fr-FR": "EUR",
  "fr-CA": "CAD",
  "fr-CH": "CHF",
  "de-DE": "EUR",
  "de-AT": "EUR",
  "de-CH": "CHF",
  "es-ES": "EUR",
  "es-MX": "MXN",
  "es-AR": "ARS",
  "es-CL": "CLP",
  "it-IT": "EUR",
  "ja-JP": "JPY",
  "zh-CN": "CNY",
  "zh-HK": "HKD",
  "zh-TW": "TWD",
  "ko-KR": "KRW",
  "ru-RU": "RUB",
  "pt-BR": "BRL",
  "pt-PT": "EUR",
  "nl-NL": "EUR",
  "nl-BE": "EUR",
  "sv-SE": "SEK",
  "no-NO": "NOK",
  "da-DK": "DKK",
  "fi-FI": "EUR",
  "pl-PL": "PLN",
  "cs-CZ": "CZK",
  "hu-HU": "HUF",
  "tr-TR": "TRY",
  "ar-SA": "SAR",
  "ar-AE": "AED",
  "he-IL": "ILS",
  "th-TH": "THB",
  "ms-MY": "MYR",
  "id-ID": "IDR",
  "vi-VN": "VND",
  "in-IN": "INR",
  "uk-UA": "UAH",
  "ro-RO": "RON",
  "bg-BG": "BGN",
  "el-GR": "EUR",
};

type LocaleCurrencyMap = { [locale: string]: string };

function useCurrencyFormatter() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("");

  useEffect(() => {
    const locale: string =
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      navigator.language || (navigator as any).userLanguage;

    const currencyCode: string = localeCurrencyMap[locale] || "GBP";

    // Create a formatter to get the currency symbol
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });

    // Extract the currency symbol
    const symbol =
      formatter.formatToParts(0).find((part) => part.type === "currency")
        ?.value || "£";

    setCurrencySymbol(symbol);
  }, []);

  // Function to format a number as currency
  const formatCurrency = (amount: number): string => {
    const locale: string =
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      navigator.language || (navigator as any).userLanguage;
    const currencyCode: string = localeCurrencyMap[locale] || "GBP";

    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });

    return formatter.format(amount);
  };

  return { currencySymbol, formatCurrency };
}

export default useCurrencyFormatter;
