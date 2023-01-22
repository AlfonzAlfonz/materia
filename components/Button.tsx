import { x } from "@xstyled/emotion";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<typeof x.button>> = p => (
  <x.button
    fontSize="lg"
    p="5px"
    px={4}
    borderRadius={4}
    bg={{ _: "white", hover: "#707070" }}
    color={{ _: "black", hover: "white" }}
    boxShadow="0px 3px 6px #00000029"
    {...p}
  />
);
