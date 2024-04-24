// Custom hooks
// import useFetch from "../../utility/hooks/useFetch";
// Components
import { FormEvent } from "react";
import Form from "../../components/Form/Form";
// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";

function UploadForm({ className, ...restProps }: ComponentBaseProps) {
  // const { fetchData } = useFetch();

  const fields = [
    {
      type: "file",
      id: "file",
      name: "file",
      label: "Upload files",
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form
      className={className}
      enctype="multipart/form-data"
      fields={fields}
      handleSubmit={handleSubmit}
      {...restProps}
    ></Form>
  );
}

export default UploadForm;
