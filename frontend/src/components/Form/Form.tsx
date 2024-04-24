// Third party
import { ChangeEvent, Fragment, useState } from "react";
// Components
// Types
import { GeneralObject } from "../../utility/types/utilityType.js";
// Styles
import styles from "./Form.module.css";

interface FormProps extends GeneralObject {
  fields: GeneralObject[];
  handleSubmit(
    formData: GeneralObject,
    event: React.FormEvent<HTMLFormElement>
  ): void;
}

function Form({ className, fields, handleSubmit, ...restProps }: FormProps) {
  const [formData, setFormData] = useState<GeneralObject>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      className={styles[className!]}
      onSubmit={(event) => handleSubmit(formData, event)}
      {...restProps}
    >
      {fields.map((field, index) => {
        const { label, ...restProperties } = field;

        return (
          <Fragment key={index}>
            {label && <label htmlFor={field.id}>{label}</label>}
            <input onChange={handleInputChange} {...restProperties} />
          </Fragment>
        );
      })}
    </form>
  );
}

export default Form;
