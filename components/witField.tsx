/* eslint-disable react-hooks/rules-of-hooks */
import { useField, useFormikContext } from "formik";
import { ComponentType, FC } from "react";

export const withField = <P extends unknown>(C: ComponentType<P>) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const withField: FC<P & { name: string }> = (p) => {
    const { isSubmitting } = useFormikContext();
    const [field] = useField(p.name);
    return (
      <C {...field} {...p} {...{ disabled: isSubmitting } as any} />
    );
  };
  withField.displayName = `withFormik(${C.displayName ?? C.name})`;

  return withField;
};
