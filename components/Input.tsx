import { x } from "@xstyled/emotion";
import { ComponentProps, FC } from "react";

import { withField } from "./witField";

export const Input: FC<ComponentProps<typeof x.input>> = (p) => (
  <x.input
    display="block"
    borderWidth={1}
    borderColor="gray-600"
    outline="none"
    px={2}
    borderRadius={3}
    w="100%"
    h="42px"
    fontSize="26px"
    {...p}
  />
);

export const InputField = withField(Input);
