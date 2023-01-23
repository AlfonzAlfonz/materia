import styled, { x, SystemProps, useUp } from "@xstyled/emotion";
import { FC, ReactNode } from "react";
import AddIcon from "@mui/icons-material/Add";
import discover from "public/lupa.svg";

import { UiContext, useUi } from "./Ui";
import Image from "next/image";
import Link from "next/link";

interface Props {
  toggle: (s?: UiContext["menu"]) => unknown;
}

export const Nav: FC<Props> = ({ toggle }) => {
  return (
    <x.div
      display="flex"
      flexDirection={{ _: "column-reverse", sm: "row-reverse", md: "column" }}
      borderRight={{ md: "2px solid #e3e3e3" }}
    >
      <x.div
        position={{ _: "fixed", md: "sticky" }}
        top={{ md: 16 }}
        bottom={0}
        left={0}
        gap={2}
        display="flex"
        flexDirection={{ _: "row", md: "column" }}
        zIndex={999}
        w={{ _: "100%", md: "initial" }}
        justifyContent={{ _: "space-between", md: "initial" }}
        p={{ _: "20px", md: 0 }}
        pr={{ _: "20px", md: "10px" }}
        mr={{ md: "10px" }}
        bg={{ _: "#EFEFEF", md: "transparent" }}
      >
        <MenuButton m="discover" toggle={toggle}><Image src={discover} alt="🔎" width={3.25 * 16} /></MenuButton>
        <MenuButton m="submit" toggle={toggle}><AddIcon style={{ fontSize: "52px" }} /></MenuButton>
        <MenuButton m="info" toggle={toggle}><x.span fontFamily="Times, serif" lineHeight="52px">i</x.span></MenuButton>
      </x.div>

      <x.div position={{ md: "fixed" }} bottom={16} spaceY={2} w="100%" display="flex">
        {/* eslint-disable-next-line @next/next/link-passhref */}
        <Link href="/" style={{ textDecoration: "none" }} onClick={() => toggle()}>
          <x.h1
            transform={{ md: "rotate(-90deg) translateX(-60px) translateY(33px)" }}
            transformOrigin="left center"
            fontSize={{ _: "56px", md: "98px" }}
            color="#ccc"
            letterSpacing={{ _: `${-(56 / 98) * 4.9}px`, md: "-4.9px" }}
          >
            Comaterial
          </x.h1>
        </Link>
      </x.div>
    </x.div>
  );
};

const MenuButton: FC<{
  m: UiContext["menu"];
  toggle: (s: UiContext["menu"]) => unknown;
  children?: ReactNode;
} & SystemProps> = ({ m, toggle, children, ...props }) => {
  const isMd = useUp("md");
  const { menu } = useUi();

  return (
    <ButtonStyle
      w={{ _: "4rem", md: "4.75rem" }}
      h={{ _: "4rem", md: "4.75rem" }}
      fontSize="52px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={menu === m ? "black" : { _: "white", hover: "#707070" }}
      {...{ color: { _: menu === m ? "white" : "black", hover: "white" } } as any}
      // color="white"
      boxShadow="0px 3px 6px #00000029"
      borderRadius={8}
      cursor="pointer"
      onClick={() => {
        !isMd && window.scrollTo(0, 0);
        toggle(menu === m ? undefined : m);
      }}
      className={menu === m ? "active" : ""}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
};

export const ButtonStyle = styled.divBox`
  &:hover img, &.active img {
    filter: invert(1);
  }
`;
