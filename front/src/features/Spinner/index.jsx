import { ReactComponent as SpinnerIcon } from "../../assets/icons/spinner.svg";
import styles from "./spinner.module.css";

const Spinner = () => {
  return <SpinnerIcon className={styles.spinner}></SpinnerIcon>;
};

export default Spinner;
