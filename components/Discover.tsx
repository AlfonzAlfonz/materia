import { x } from "@xstyled/emotion";
import { useRouter } from "next/router";
import { ComponentProps, FC, Fragment } from "react";
import { more } from "utils";

import { PlainSelectInput } from "./SelectInput";
import { Title, useUi } from "./Ui";

export const Discover: FC = () => {
  const { query, push } = useRouter();
  const { discover } = useUi();

  return (
    <x.div display="flex" flexDirection="column" spaceY={3} py={3}>
      <x.div spaceY="30px">
        <x.label display="flex" flexDirection="column" spaceY="20px">
          <Title as="div" alignSelf="flex-start">Hledat</Title>
          <PlainSelectInput
            value={more(query.discover).map(t => ({ value: t, label: t }))}
            onChange={v => {
              push({ query: { discover: [...new Set(v.map(o => o.value))] } });
            }}
          />
        </x.label>

        {query.discover
          ? <DiscoverMore />
          : (
            <>

              <x.label display="flex" flexDirection="column" spaceY="20px">
                <Title as="div" alignSelf="flex-start">Materiál</Title>
                <Tags tags={discover.materials} />
              </x.label>
              <x.label display="flex" flexDirection="column" spaceY="20px">
                <Title as="div" alignSelf="flex-start">Výrobce</Title>
                <Tags tags={discover.manufacturers} />
              </x.label>
              <x.label display="flex" flexDirection="column" spaceY="20px">
                <Title as="div" alignSelf="flex-start">Designér</Title>
                <Tags tags={discover.designers} />
              </x.label>
              <x.label display="flex" flexDirection="column" spaceY="20px">
                <Title as="div" alignSelf="flex-start">Technologie</Title>
                <Tags tags={discover.technologies} />
              </x.label>
            </>
          )}
      </x.div>
    </x.div>
  );
};

export const Tags: FC<{ tags: string[] }> = ({ tags }) => {
  const { push, query } = useRouter();
  return (
    <x.div display="flex" flexWrap="wrap">
      {tags.map(t => (
        <Tag
          key={t}
          onClick={() => push({ query: { discover: [...new Set([...more(query.discover) ?? [], t])] } })}
          mr="10px"
          mb="10px"
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
      fontSize="26px"
      lineHeight="32px"
      px="10px"
      py="5px"
      boxShadow="0px 1px 3px #00000029"
      bg={{ _: "white", hover: "#989898" }}
      color={{ _: undefined, hover: "white" }}
      borderRadius={4}
      cursor="pointer"
      {...p}
    />
  );
};

export const DiscoverMore: FC = () => {
  const { discover } = useUi();
  return (
    <x.div>
      <x.label display="flex" flexDirection="column" spaceY="20px">
        <Title as="div" alignSelf="flex-start">Spojení</Title>
        <Tags tags={discover.manufacturers} />
      </x.label>
    </x.div>
  );
};
