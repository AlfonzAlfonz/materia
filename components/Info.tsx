import { x } from "@xstyled/emotion";
import { FC } from "react";
import { Title } from "./Ui";

export const Info: FC<{ title: string; text: string }> = ({ title, text }) => {
  return (
    <x.div display="flex" flexDirection="column" spaceY={3} py={3}>
      <x.div spaceY="30px" display="flex" alignItems="flex-start" flexDirection="column">
        <Title as="div" alignSelf="flex-start">O projektu</Title>

        <x.h1
          transformOrigin="left center"
          fontSize={{ _: "56px", md: "98px" }}
          color="#ccc"
          letterSpacing={{ _: `${-(56 / 98) * 4.9}px`, md: "-4.9px" }}
        >
          {title}
        </x.h1>

        <x.p whiteSpace="pre-wrap" fontSize="md" lineHeight="22px">
          {text}
        </x.p>
      </x.div>
    </x.div>
  );
};
