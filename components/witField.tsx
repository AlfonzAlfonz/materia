import { useField } from "formik";
import { ComponentType, FC } from "react";

export const withField = <P extends unknown>(C: ComponentType<P>) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const withField: FC<P & { name: string }> = (p) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [field] = useField(p.name);
    return (
      <C {...field} {...p} />
    );
  };
  withField.displayName = `withFormik(${C.displayName ?? C.name})`;

  return withField;
};
