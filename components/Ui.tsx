import { x } from "@xstyled/emotion";
import { useRouter } from "next/router";
import { ComponentProps, createContext, FC, ReactNode, useContext, useMemo, useState } from "react";

import { Discover } from "./Discover";
import { Nav } from "./Nav";
import { SubmitForm } from "./SubmitForm";

import type { DiscoverRes } from "pages/api/discover";

export const Ui: FC<{ children: ReactNode; discover: DiscoverRes }> = ({ children, discover }) => {
  const { query, push } = useRouter();
  const [context, setContext] = useState<UiContext>({ discover });

  const menu = useMemo<MenuState | undefined>(() => query.discover ? "discover" : context.menu, [context.menu, query.discover]);

  return (
    <ReactUiContext.Provider value={context}>
      <x.div display="flex" minHeight="100vh" bg="#EFEFEF" p="20px">
        <Nav
          toggle={m => {
            m !== "discover" && push("/", "/", { shallow: true });
            setContext(s => ({ ...s, menu: m }));
          }}
        />

        <x.div
          ml="20px"
          display="grid"
          gap="10px"
          gridTemplateColumns={[...Array(6)].map(_ => "1fr").join(" ")}
          flexGrow={1}
        >
          {menu && (
            <x.div gridColumn="1 / span 2" minWidth={0} mr="20px">
              <x.div position="sticky" top={16}>
                {menu === "discover" && <Discover />}
                {menu === "submit" && <SubmitForm />}
              </x.div>
            </x.div>
          )}
          <x.div gridColumn={menu ? "3 / span 4" : "1 / span 6"}>
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
    fontSize="13px"
    alignSelf="flex-start"
    {...p}
  />
);

export const SmallTag: FC<ComponentProps<typeof x.div>> = p => (
  <x.div
    p="5px 10px"
    borderWidth={1}
    borderRadius={3}
    fontSize="13px"
    whiteSpace="nowrap"
    {...p}
  />
);
