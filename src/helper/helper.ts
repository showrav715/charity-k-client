import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useStore } from "../../src/store/index";
import dateFormat from "dateformat";
// for split string
const split = (str: string, wordNumber: number) => {
  var wordsArray = str.split(" ");
  var last = wordsArray.slice(-wordNumber).join(" ");
  var word = wordsArray.slice(0, -wordNumber).join(" ");
  return { word, last };
};


const formatDate =(date:string)=>{
 return  dateFormat(date, "d mmmm, yyyy");
}


function convertToTitleCase(str) {
  // Split the string into words
  var words = str.split("-");

  // Capitalize the first letter of each word
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back together with spaces
  return words.join(" ");
}

// for error message
const error = (err: string) => {
  toast.error(err);
};

// for success message
const success = (success: string) => {
  toast.success(success);
};

// for multiple error
const multipleError = (errors: object | any) => {
  if (typeof errors == "string") {
    toast.error(errors);
    return true;
  }

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      errors[key].forEach((error: string) => {
        toast.error(error);
      });
    }
  }
};

interface Props {
  price: number;
}

// for price conversion with symbol
const ShowCurrencyPrice: React.FC<Props> = ({ price }) => {
  const { defaultCurrency } = useStore();
  if (!defaultCurrency) {
    return price;
  }

  const convertedPrice = (price * defaultCurrency.value).toFixed(2);
  return defaultCurrency.symbol + convertedPrice;
};

// for price conversion with symbol
const ShowCurrencyWithoutConvert: React.FC<Props> = ({ price }) => {
  const { defaultCurrency } = useStore();
  if (!defaultCurrency) {
    return price;
  }
  return defaultCurrency.symbol + price;
};

// for price conversion
const ShowConvertPrice: React.FC<Props> = ({ price }) => {
  const defaultCurrency =
    (Cookies.get("currency") && JSON.parse(Cookies.get("currency"))) || null;
  if (!defaultCurrency) {
    return (price + 50) as number;
  }
  const convertedPrice = Number(price * defaultCurrency.value).toFixed(2);
  return convertedPrice as number | string;
};

// for price conversion
const ConvertPrice: React.FC<Props> = ({ price }) => {
  const { defaultCurrency } = useStore();
  if (!defaultCurrency) {
    return price as number;
  }
  const convertedPrice = Number(price * defaultCurrency.value).toFixed(2);
  return convertedPrice as number | string;
};

// for price conversion
const ConvertAmount = (price: number) => {
  const defaultCurrency =
    (Cookies.get("currency") && JSON.parse(Cookies.get("currency"))) || null;
  if (!defaultCurrency) {
    return price as number;
  }
  const convertedPrice = Number(price * defaultCurrency.value).toFixed(2);
  return convertedPrice as number | string;
};

// for currency symbol
const ShowCurrencySign = () => {
  const { defaultCurrency } = useStore();
  if (!defaultCurrency) {
    throw new Error("Currency not found");
  }
  return defaultCurrency.symbol;
};

// for currency code
function CurrencyCode() {
  const { defaultCurrency } = useStore();

  if (!defaultCurrency) {
    return "...";
  }

  return defaultCurrency.code;
}

// for currency id
function CurrencyId() {
  const { defaultCurrency } = useStore();
  if (!defaultCurrency) {
    return "...";
  }
  return defaultCurrency.id;
}

// for settings values with default
function Settings(field: string) {
  const { settings } = useStore();
  if (!settings) {
    const fieldArray = [
      "header_logo",
      "footer_logo",
      "cta_photo2",
      "breadcumb",
      "cta_photo",
      "checkout_success_photo",
      "checkout_faild_photo",
      "faq_background",
      "volunteers_background",
    ];
    if (fieldArray.includes(field)) {
      return "/..";
    } else {
      return "...";
    }
  }
  return settings[field] ? settings[field] : field;
}

// for check valid url
const ValidUrl = (url: string) => {
  var urlPattern =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  return urlPattern.test(url);
};

// for token exist or not
function Token() {
  const { token } = useStore();
  if (!token) {
    return false;
  }
  return true;
}
function translate(key: string) {
  // return key;
  let main = null;
    if (typeof window !== "undefined") {
      main = localStorage.getItem("language");
    } else {
      main = null;
    }

    const language = main ? JSON.parse(main) : null;

    if (key) {
      if (language && language[key]) {
        return language[key];
      } else {
        return key;
      }
    }
}

// truncate string
const truncateString = (inputString, maxLength = 15) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength - 6) + "..";
  }
};

export {
  formatDate,
  split,
  error,
  success,
  multipleError,
  ShowCurrencyPrice,
  ShowCurrencyWithoutConvert,
  ShowCurrencySign,
  ShowConvertPrice,
  ConvertPrice,
  ConvertAmount,
  CurrencyId,
  CurrencyCode,
  Settings,
  Token,
  ValidUrl,
  translate,
  truncateString,
  convertToTitleCase,
};
