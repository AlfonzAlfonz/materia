import { x } from "@xstyled/emotion";
import { useRouter } from "next/router";
import { ComponentProps, FC, useMemo } from "react";
import { more, only } from "utils";

import { PlainSelectInput } from "./inputs/SelectInput";
import { Title, useUi } from "./Ui";
import useSWR from "swr";
import { Info, Project } from "data/types";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

export const Discover: FC = () => {
  const { query, push } = useRouter();
  const { discover } = useUi();

  return (
    <x.div display="flex" flexDirection="column" spaceY={3}>
      <x.div spaceY="30px">
        <x.label display="flex" flexDirection="column" spaceY="20px">
          <Title as="div" alignSelf="flex-start">Hledat</Title>
          <PlainSelectInput
            value={more(query.discover).map(t => ({ value: t, label: t }))}
            onChange={v => {
              push({ query: { discover: [...new Set(v.map(vv => vv.value))] } }, undefined, { shallow: true });
            }}
            onCreateOption={v => {
              push({ query: { discover: [...new Set([...more(query.discover), v])] } }, undefined, { shallow: true });
            }}
          />
        </x.label>

        {query.discover
          ? <DiscoverMore />
          : (
            <>
              <x.label display="flex" flexDirection="column" spaceY="20px" maxH="200px" overflow="hidden">
                <Title as="div" alignSelf="flex-start">Materiál</Title>
                <Tags tags={discover.materials} />
              </x.label>
              <x.label display="flex" flexDirection="column" spaceY="20px" maxH="200px" overflow="hidden">
                <Title as="div" alignSelf="flex-start">Výrobce</Title>
                <Tags tags={discover.manufacturers} />
              </x.label>
              <x.label display="flex" flexDirection="column" spaceY="20px" maxH="200px" overflow="hidden">
                <Title as="div" alignSelf="flex-start">Designér</Title>
                <Tags tags={discover.designers} />
              </x.label>
              <x.label display="flex" flexDirection="column" spaceY="20px" maxH="200px" overflow="hidden">
                <Title as="div" alignSelf="flex-start">Technologie</Title>
                <Tags tags={discover.technologies} />
              </x.label>
            </>
          )}
      </x.div>
    </x.div>
  );
};

const Tags: FC<{ tags: string[] }> = ({ tags }) => {
  const { push, query } = useRouter();
  return (
    <x.div display="flex" flexWrap="wrap" gap="10px">
      {[...tags].sort((a, b) => a.localeCompare(b)).map(t => (
        <Tag
          key={t}
          onClick={() => push({ query: { discover: [...new Set([...more(query.discover) ?? [], t])] } }, undefined, { shallow: true })}
          fontSize="sm"
          py={0}
        >
          {t}
        </Tag>
      ))}
    </x.div>
  );
};

export const Tag: FC<ComponentProps<typeof x.div>> = (p) => {
  return (
    <x.div
      fontSize="18px"
      lineHeight="32px"
      px="10px"
      py="0"
      boxShadow="0px 1px 3px #00000029"
      bg={{ _: "white", hover: "#989898" }}
      color={{ _: undefined, hover: "white" }}
      borderRadius={4}
      cursor="pointer"
      {...p}
    />
  );
};

const getPageFetcher = ([key, discover]: [string, string ]): Promise<Info> =>
  fetch(key + `?code=${encodeURIComponent(discover)}`).then(r => r.json());

const listProjFetcher = ([key, discover]: [string, string[]]): Promise<Project[]> =>
  fetch(key + `?${discover.map(d => `discover=${encodeURIComponent(d)}`).join("&")}`).then(r => r.json());

export const DiscoverMore: FC = () => {
  const { query } = useRouter();
  const { discover } = useUi();

  const dicsMore = useSWR(["/api/list-projects", more(query.discover)], listProjFetcher);
  const { data, isLoading } = useSWR(["/api/get-page", only(query.discover)], getPageFetcher);

  const tags = useMemo(() =>
    dicsMore.data?.flatMap(p => [...p.materials, ...p.manufacturers, ...p.designers, ...p.technologies]),
  [dicsMore.data]);

  return (
    <x.div>
      <x.label display="flex" flexDirection="column" spaceY="20px">
        <Title as="div" alignSelf="flex-start">Spojení</Title>
        <Tags tags={tags ?? []} />
      </x.label>

      {!isLoading
        ? data && (
          <x.div display="flex" flexDirection="column" mt="20px">
            <Title mb="15px">Info</Title>

            <x.p fontSize="md">{data.text}</x.p>
          </x.div>
        )
        : (
          <x.div h="100%" display="flex" alignItems="center" justifyContent="center">
            <HourglassBottomIcon style={{ fontSize: "76px" }} />
          </x.div>
        )}
    </x.div>
  );
};
