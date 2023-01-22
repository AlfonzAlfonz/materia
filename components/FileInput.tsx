import { x } from "@xstyled/emotion";
import { useField } from "formik";
import { ComponentProps, FC } from "react";

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
        <x.div
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="36px"
          borderRadius={4}
          bg="white"
          border="1px solid"
          borderColor="black"
          style={{ aspectRatio: 10 / 3 }}
        >
          <x.div textAlign="center">
            <x.div>+</x.div>
            <x.strong display="block" fontSize="1rem" fontWeight={400} mb=".5rem">Nahrát fotografii</x.strong>
          </x.div>
        </x.div>
        <x.input
          type="file"
          position="absolute"
          top="-10000px"
          left="-10000px"
          onChange={e => {
            if (e.target.files && e.target.files.length > 0) {
              setValue([...value, e.target.files[0]]);
            }
          }}
          {...props}
        />
      </x.label>
    </>
  );
};
