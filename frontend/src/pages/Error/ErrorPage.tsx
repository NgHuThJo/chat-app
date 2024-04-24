// Third party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Styles
import styles from "./ErrorPage.module.css";

interface ErrorPageProps {
  className?: string;
  restProps?: object;
}

function ErrorPage({ className, ...restProps }: ErrorPageProps) {
  return (
    <div className={styles[className!]} {...restProps}>
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}

ErrorPage.propTypes = {
  className: PropTypes.string,
  restProps: PropTypes.object,
};

export default ErrorPage;
