import NiceSelect from "../NiceSelect/NiceSelect";
import { useStore } from "@/store/index";
import  { useState, useEffect } from "react";
import { GetAllCurrency } from "@/@actions/frontend";
import { CurrencyResponse } from "@/@types/frontend";

function CurrencySelect() {

  const setCurrency = useStore((state) => state.setCurrency);
  const defaultCurr = useStore((state) => state.defaultCurrency);
  const [currencies, setCurrencies] = useState([] as CurrencyResponse[]);

  useEffect(() => {
    const getCurrency = async () => {
      const res = await GetAllCurrency();
      setCurrencies(res as any);
    };
    getCurrency();
  }, []);

  const handleCurrencyChange = (e: any) => {
    setCurrency(e);
  };

  const currencyList = currencies.map((item: CurrencyResponse) => {
    return {
      ...item,
      id: item.id,
      name: item.code,
    };
  });

  useEffect(() => {
    const defaultCurrency = currencyList.find((item) => item.default === 1);
    if (defaultCurrency) {
      setCurrency(defaultCurrency, "api");
    }
  }, [currencies]);

  return (
    <NiceSelect
      options={currencyList}
      onChange={(e) => handleCurrencyChange(e)}
      defaultValue={defaultCurr && defaultCurr.id}
      wrapperClass="header-currency-wrapper"
    />
  );
}

export default CurrencySelect;
