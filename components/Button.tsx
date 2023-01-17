import { x } from "@xstyled/emotion";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<typeof x.button>> = p =>
  <x.button bg="black" color="white" alignSelf="flex-start" p={3} px={4} borderRadius={4} {...p} />
;
