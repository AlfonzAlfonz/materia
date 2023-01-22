import { x } from "@xstyled/emotion";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<typeof x.button>> = p => (
  <x.button
    bg="white"
    fontSize="lg"
    p="5px"
    px={4}
    borderRadius={4}
    border="1px solid"
    borderColor="black"
    {...p}
  />
);
