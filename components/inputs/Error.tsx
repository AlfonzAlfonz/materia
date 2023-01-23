import { x } from "@xstyled/emotion";
import { FC } from "react";
import { useField } from "formik";

export const Error: FC<{ name: string }> = ({ name }) => {
  const [,{ error, touched }] = useField(name);

  return (
    touched && error ? (
      <x.div color="red-600" mt={1}>
        {error}
      </x.div>
    ) : null
  );
};
