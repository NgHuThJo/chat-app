// Third party
import { Link } from "react-router-dom";
// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./ErrorPage.module.css";

function ErrorPage({ className, ...restProps }: ComponentBaseProps) {
  return (
    <div className={styles[className!]} {...restProps}>
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}

export default ErrorPage;
