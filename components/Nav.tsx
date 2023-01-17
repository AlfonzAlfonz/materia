import { x, SystemProps } from "@xstyled/emotion";
import { FC, ReactNode } from "react";
import AddIcon from "@mui/icons-material/Add";

import { UiContext, useUi } from "./Ui";

interface Props {
  toggle: (s: UiContext["menu"]) => unknown;
}

export const Nav: FC<Props> = ({ toggle }) => {
  return (
    <x.div>
      <x.div position="sticky" top={16} spaceY={2}>
        <MenuButton m="discover" toggle={toggle}></MenuButton>
        <MenuButton m="submit" toggle={toggle}><AddIcon style={{ fontSize: "52px" }} /></MenuButton>
        <MenuButton m="info" toggle={toggle}><x.span fontFamily="Times, serif" pt={2}>i</x.span></MenuButton>
      </x.div>

      <x.div position="fixed" bottom={16} spaceY={2}>
        <x.h1
          transform="rotate(-90deg) translateX(-60px) translateY(33px)"
          transformOrigin="left center"
          fontSize="98px"
          color="#ccc"
          letterSpacing="-4.9px"
        >
          Comaterial
        </x.h1>
      </x.div>
    </x.div>
  );
};

const MenuButton: FC<{
  m: UiContext["menu"];
  toggle: (s: UiContext["menu"]) => unknown;
  children?: ReactNode;
} & SystemProps> = ({ m, toggle, children, ...props }) => {
  const { menu } = useUi();

  return (
    <x.div
      w="4.75rem"
      h="4.75rem"
      fontSize="52px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={menu === m ? "black" : { _: "white", hover: "#707070" }}
      color={{ _: menu === m ? "white" : "black", hover: "white" }}
      // color="white"
      boxShadow="0px 3px 6px #00000029"
      borderRadius={8}
      cursor="pointer"
      onClick={() => toggle(menu === m ? undefined : m)}
      {...props}
    >
      {children}
    </x.div>
  );
};
