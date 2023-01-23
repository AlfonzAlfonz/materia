import { x } from "@xstyled/emotion";
import { Info as InfoType } from "data/types";
import { useRouter } from "next/router";
import { ComponentProps, createContext, FC, ReactNode, useContext, useMemo, useState } from "react";

import { Discover } from "../Discover";
import { Info } from "../Info";
import { Nav } from "./Nav";
import { SubmitForm } from "../SubmitForm";

import type { DiscoverRes } from "pages/api/discover";

export const Ui: FC<{ children: ReactNode; discover: DiscoverRes; info: InfoType }> = ({ children, discover, info }) => {
  const { query, push } = useRouter();
  const [context, setContext] = useState<UiContext>({ discover, info });

  const menu = useMemo<MenuState | undefined>(() => query.discover ? "discover" : context.menu, [context.menu, query.discover]);

  return (
    <ReactUiContext.Provider value={context}>
      <x.div
        display="flex"
        minHeight="100vh"
        px="20px"
        gap="20px"
        flexDirection={{ _: "column", md: "row" }}
      >
        <Nav
          toggle={m => {
            m !== "discover" && push("/", "/", { shallow: true });
            setContext(s => ({ ...s, menu: m }));
          }}
        />

        <x.div
          display="grid"
          gap="10px"
          gridTemplateColumns={{
            _: "1fr",
            md: "repeat(4, minmax(0, 1fr))",
            lg: "repeat(6, minmax(0, 1fr))"
          }}
          flexGrow={1}
        >
          {menu && (
            <x.div
              gridColumn="1 / span 2"
              minWidth={0}
              pr={{ _: 0, md: 5 }}
              borderRight={{ _: "none", md: "2px solid #e3e3e3" }}
              py="20px"
            >
              <x.div position="sticky" top={16}>
                {menu === "discover" && <Discover />}
                {menu === "submit" && <SubmitForm />}
                {menu === "info" && <Info title={info.title} text={info.text} />}
              </x.div>
            </x.div>
          )}
          <x.div gridColumn={{ _: "1", md: menu ? "3 / span 4" : "1 / span 6" }}>
            {children}
          </x.div>

        </x.div>
      </x.div>
    </ReactUiContext.Provider>
  );
};

export interface UiContext {
  menu?: MenuState;
  discover: DiscoverRes;
  info: InfoType;
}

type MenuState = "discover" | "submit" | "info";

const ReactUiContext = createContext<UiContext>(null!);

export const useUi = () => useContext(ReactUiContext);

export const Title: FC<ComponentProps<typeof x.h2>> = p => (
  <x.h2
    borderWidth={1}
    borderRadius="3px"
    textTransform="uppercase"
    px={1}
    py="1px"
    letterSpacing="4.55px"
    fontSize="sm"
    alignSelf="flex-start"
    {...p}
  />
);

export const SmallTag: FC<ComponentProps<typeof x.div>> = p => (
  <x.div
    p="5px 10px"
    borderWidth={1}
    borderRadius={3}
    fontSize="sm"
    whiteSpace="nowrap"
    {...p}
  />
);
