import styled, { css, x } from "@xstyled/emotion";
import { Project } from "data/types";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { getImgUrl, only } from "utils";

import { SmallTag } from "../Ui";
import { ProjectModal } from "./ProjectModal";

export type GridItem = { id: number; img: string; name: string; tags: string[]; project: Project };

interface Props {
  expanded: boolean;
  items: GridItem[];
}

export const ProjectGrid: FC<Props> = ({ expanded, items }) => {
  const { query, push } = useRouter();

  const project = useMemo(() => query.project ? items.find(i => i.id === +only(query.project)!) : undefined, [items, query.project]);

  return (
    <>
      <ProjectModal project={project} onClose={() => push({ query: { ...query, project: [] } }, undefined, { shallow: true })} />
      <x.div
        display="grid"
        gap="10px"
        overflow="hidden"
        h="100%"
        alignContent="start"
        gridTemplateColumns={{
          _: "1fr",
          sm: "minmax(0, 1fr) minmax(0, 1fr)",
          md: `repeat(${expanded ? 4 : 2}, minmax(0, 1fr))`,
          lg: `repeat(${expanded ? 6 : 4}, minmax(0, 1fr))`
        }}
        mb={{ _: "40px", md: 0 }}
        py="20px"
      >
        {items.map((itm, i) => (
          <Tile
            key={i}
            exp={expanded}
            position="relative"
            backgroundImage={getImgUrl(itm.img ? `/uploads/${itm.id}/${itm.img}` : "https://placekitten.com/300/400")}
            backgroundPosition="center"
            backgroundSize="cover"
            onClick={() => push({ query: { project: itm.id } }, undefined, { shallow: true })}
          >
            <x.div opacity={0} h="100%" position="relative" cursor="pointer">
              <x.div position="absolute" top={0} left={0} right={0} bottom={0} bg="black" opacity={1} borderRadius="5px" />
              <x.div
                position="relative"
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                overflow="hidden"
              >
                <x.h2 fontSize="md" mb={3}>{itm.name}</x.h2>
                <x.div display="flex" gap={1} flexWrap="wrap">
                  {itm.tags.map(t => (
                    <SmallTag
                      key={t}
                      borderRadius={4}
                      maxW="10rem"
                      overflowX="hidden"
                      textOverflow="ellipsis"
                    >
                      {t}
                    </SmallTag>
                  ))}
                </x.div>
              </x.div>
            </x.div>
          </Tile>
        ))}
      </x.div>
    </>
  );
};

export const Tile = styled.divBox<{ exp: boolean }>`
  transition: 100ms background-color, 100ms opacity;
  aspect-ratio: 289 / 335;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;

  & > div {
    transition: 100ms background-color, opacity;
    padding: 2;
  }

  &:hover {
    color: white;
    & > div {
      opacity: 1;
    }
  }

  &:first-of-type::before {
    content: "";
    display: block;
    position: absolute;
    top: -300px;
    width: 100%;
    border-left: 2px solid #e3e3e3;
    border-right: 2px solid #e3e3e3;
    height: 10000px;
    z-index: -1;
  }

  @media (min-width: sm) {
    &:nth-of-type(-n+2)::before {
      content: "";
      display: block;
      position: absolute;
      top: -300px;
      width: 100%;
      border-left: 2px solid #e3e3e3;
      border-right: 2px solid #e3e3e3;
      height: 10000px;
      z-index: -1;
    }
  }

  ${p => p.exp ? css`
    @media (min-width: md)::before {
      &:nth-of-type(-n+4) {
        content: "";
        display: block;
        position: absolute;
        top: -300px;
        width: 100%;
        border-left: 2px solid #e3e3e3;
        border-right: 2px solid #e3e3e3;
        height: 10000px;
        z-index: -1;
      }
    }
  ` : css`
    @media (min-width: md) {
      &:nth-of-type(-n+2)::before {
        content: "";
        display: block;
        position: absolute;
        top: -300px;
        width: 100%;
        border-left: 2px solid #e3e3e3;
        border-right: 2px solid #e3e3e3;
        height: 10000px;
        z-index: -1;
      }
    }
  `}

${p => p.exp ? css`
  @media (min-width: lg) {
    &:nth-of-type(-n+6)::before {
      content: "";
      display: block;
      position: absolute;
      top: -300px;
      width: 100%;
      border-left: 2px solid #e3e3e3;
      border-right: 2px solid #e3e3e3;
      height: 10000px;
      z-index: -1;
    }
  }
` : css`
  @media (min-width: lg) {
    &:nth-of-type(-n+4)::before {
      content: "";
      display: block;
      position: absolute;
      top: -300px;
      width: 100%;
      border-left: 2px solid #e3e3e3;
      border-right: 2px solid #e3e3e3;
      height: 10000px;
      z-index: -1;
    }
  }
`}
`;
