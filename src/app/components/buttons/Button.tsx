import { Link } from "react-router-dom";
import React from "react";
import { IButton } from "../../interfaces/interfaces";
import Loader from "@/helper/Loader";

const Button: React.FC<IButton> = ({
  text,
  styles,
  clickHandler = null,
  isLink = false,
  href = "/",
  btnType = "button",
  status = false,
}) => {
  if (isLink) {
    return (
      <Link to={href} className={`auc-btn-default ${styles}`}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={btnType}
      disabled={status}
      onClick={clickHandler && clickHandler}
      className={`auc-btn-default ${styles}`}
    >
      {text}
      <Loader status={status} />
    </button>
  );
};

export default Button;
