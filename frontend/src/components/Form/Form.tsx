// Third party
import { ChangeEvent, Fragment, useState } from "react";
// Components
// Types
import { GeneralObject } from "../../utility/types/utilityType.js";
// Styles
import styles from "./Form.module.css";

interface FormProps extends GeneralObject {
  error?: Error;
  fields: GeneralObject[];
  onSubmit(
    event: React.FormEvent<HTMLFormElement>,
    formData: GeneralObject
  ): void;
}

function Form({
  children,
  className,
  error,
  fields,
  onSubmit,
  ...restProps
}: FormProps) {
  const [formData, setFormData] = useState<GeneralObject>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      className={styles[className!]}
      onSubmit={(event) => onSubmit(event, formData)}
      {...restProps}
    >
      {fields.map((field, index) => {
        const { label, ...restProperties } = field;

        return (
          <Fragment key={index}>
            {label && <label htmlFor={field.id}>{label}</label>}
            <input onChange={handleInputChange} {...restProperties} />
            {error && <p>{field.error}</p>}
          </Fragment>
        );
      })}
      {children}
    </form>
  );
}

export default Form;
