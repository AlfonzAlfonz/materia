import CloseIcon from "@mui/icons-material/Close";
import { x } from "@xstyled/emotion";
import { useField, useFormikContext } from "formik";
import { FC, useMemo } from "react";
import { components, GroupBase, MultiValueGenericProps, MultiValueProps, MultiValueRemoveProps } from "react-select";
import Creatable, { CreatableProps } from "react-select/creatable";

import { Tag } from "./Discover";

interface Props {
  name: string;
  options?: string[];
}

export const SelectInput: FC<Props> = ({ name, options }) => {
  const { isSubmitting } = useFormikContext();
  const [{ value }, , { setValue }] = useField<readonly string[]>(name);

  const opts = useMemo(() => options?.map(o => ({ label: o, value: o })), [options]);
  const val = useMemo(() => value.map(v => ({ label: v, value: v })), [value]);

  return (
    <PlainSelectInput
      value={val ?? []}
      options={opts}
      onChange={(v) => {
        setValue(v.map(vv => vv.value));
      }}
      onCreateOption={v => {
        setValue([...value ?? [], v]);
      }}
      isDisabled={isSubmitting}
    />
  );
};

const Noop = () => undefined!;

type Opt = { label: string; value: string };

export const PlainSelectInput = (p: CreatableProps<Opt, true, GroupBase<Opt>>) => {
  return (
    <Creatable
      isMulti
      components={{
        IndicatorsContainer: Noop,
        MultiValueContainer,
        MultiValueRemove,
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
          gap: "8px",
          flexWrap: "wrap"
        }),
        input: () => ({
          padding: "0 0.5rem",
          fontSize: "26px",
          display: "flex",
          minHeight: "42px",
          width: "auto"
        }),
        option: () => ({
          "fontSize": "20px",
          "lineHeight": 2,
          "padding": "0 .5rem",
          ":hover": {
            background: "#eee"
          }
        }),
        multiValueLabel: () => ({})
      }}
      {...p}
    />
  );
};

const MultiValueContainer: FC<MultiValueGenericProps<Opt, true, GroupBase<Opt>>> = (p) => {
  return (
    <Tag bg="black" color="white" whiteSpace="nowrap" display="flex">
      {p.children}
    </Tag>
  );
};

const MultiValueRemove: FC<MultiValueRemoveProps<Opt, true, GroupBase<Opt>>> = (p) => {
  return (
    <x.div {...p.innerProps} display="flex" alignItems="center">
      <CloseIcon fontSize="medium" />
    </x.div>
  );
};
