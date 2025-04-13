import style from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => (
  <p className={style.error}>{message || "Something went wrong!"}</p>
);

export default ErrorMessage;
