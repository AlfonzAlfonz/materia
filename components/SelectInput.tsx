import { useField } from "formik";
import { FC } from "react";
import { GroupBase, MultiValueProps } from "react-select";
import Creatable, { CreatableProps } from "react-select/creatable";
import { Tag } from "./Discover";

interface Props {
  name: string;
}

export const SelectInput: FC<Props> = ({ name }) => {
  const [{ value }, , { setValue }] = useField<readonly string[]>(name);

  return (
    <PlainSelectInput
      value={value ?? []}
      onChange={(v) => {
        setValue(v);
      }}
      onCreateOption={v => {
        setValue([...value ?? [], v]);
      }}
    />
  );
};

const Noop = () => undefined!;

export const PlainSelectInput = <Option, Group extends GroupBase<Option>>(p: CreatableProps<Option, true, Group>) => {
  return (
    <Creatable
      isMulti
      components={{
        IndicatorsContainer: Noop,
        MultiValue: MultiValue as any,
        Placeholder: Noop
      }}
      noOptionsMessage={() => null}
      styles={{
        control: () => ({
          border: "1px solid black",
          borderRadius: "5px",
          background: "white",
          minHeight: "42px",
          display: "flex"
        }),
        valueContainer: () => ({
          padding: 0,
          display: "flex",
          flexWrap: "wrap"
        }),
        input: () => ({
          padding: "0 0.5rem",
          fontSize: "26px",
          display: "flex",
          minHeight: "42px",
          width: "auto"
        })
      }}
      {...p}
    />
  );
};

const MultiValue: FC<MultiValueProps<any, any, GroupBase<any>>> = (p) => {
  return <Tag bg="black" color="white" whiteSpace="nowrap">{p.data}</Tag>;
};
