import { x } from "@xstyled/emotion";
import { FC } from "react";
import { Title } from "./Ui";

export const Info: FC = () => {
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
          Comaterial
        </x.h1>

        <x.p whiteSpace="pre-wrap" fontSize="md" lineHeight="22px">
          Comaterial je webové rozhraní, které umožňuje institucím, grafickým designérům a výrobcům sdílet mezi sebou technické specifikace konkrétních projektů. Uživatelé zde mohou nahrávat své práce a sdílet podrobné informace ohledně výroby, volby materiálů a realizace výsledného produktu. Webové rozhraní funguje na systému klíčových slov, kde návštěvník může jednoduše najít informace o konkrétním materiálu, který by rád ve svém projektu použil, ale například o něm nezná dostatek informací nebo neví o výrobci, který by zvládl jeho představy zrealizovat. Z webové stránky se tak do budoucna může stát databáze pro výuku grafického designu, která je editovatelná samotnými designéry nebo výrobci.
          {"\n"}
          {"\n"}
          design & koncept: Jan Stuchlík (janstuchlik.com){"\n"}
          code: Denis Homolík (homolik.cz)

        </x.p>
      </x.div>
    </x.div>
  );
};
