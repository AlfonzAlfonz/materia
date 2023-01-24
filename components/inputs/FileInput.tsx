import { x } from "@xstyled/emotion";
import { useField } from "formik";
import { ComponentProps, FC } from "react";

import { Button } from "../Button";

type FileValue = File[];

export const FileInput: FC<ComponentProps<typeof x.input> & { name: string }> = ({ name, ...props }) => {
  const [{ value },,{ setValue }] = useField<FileValue>(name);
  return (
    <>
      {value.map((f, i) => (
        <x.div key={i} display="flex" bg="black" p={1} color="white" borderRadius={3}>
          <x.div whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{f.name}</x.div>{" "}
          <x.div whiteSpace="nowrap">({(f.size / 1024).toFixed(0)} kb)</x.div>
        </x.div>
      ))}
      <x.label>
        <Button
          as="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ aspectRatio: 10 / 5 }}
        >
          <x.div textAlign="center">
            <x.div fontSize="48px" fontWeight={300}>+</x.div>
            <x.strong display="block" fontSize="1rem" fontWeight={400} mb=".5rem">Nahrát fotografii</x.strong>
          </x.div>
        </Button>
        <x.input
          type="file"
          position="absolute"
          top="-10000px"
          left="-10000px"
          accept="image/png, image/jpg, image/jpeg"
          onChange={e => {
            if (e.target.files && e.target.files.length > 0) {
              if (e.target.files[0].size > 5 * 1024 * 1024) {
                alert("Maximální povolená velikost je 2MB");
                return;
              }
              setValue([...value, e.target.files[0]]);
            }
          }}
          {...props}
        />
      </x.label>
    </>
  );
};
