import styled, { css, x } from "@xstyled/emotion";
import { Project } from "data/types";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { only } from "utils";

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
        gridTemplateColumns={{
          _: "1fr",
          sm: "1fr 1fr",
          md: [...Array(expanded ? 4 : 2)].map(_ => "1fr").join(" "),
          lg: [...Array(expanded ? 6 : 4)].map(_ => "1fr").join(" ")
        }}
      >
        {items.map((itm, i) => (
          <Tile
            key={i}
            expanded={expanded}
            position="relative"
            backgroundImage={getImgUrl(itm.img ? `/static/uploads/${itm.id}/${itm.img}` : "https://placekitten.com/300/400")}
            backgroundPosition="center"
            backgroundSize="cover"
            onClick={() => push({ query: { project: itm.id } }, undefined, { shallow: true })}
          >
            <x.div opacity={0} h="100%" position="relative" cursor="pointer">
              <x.div position="absolute" top={0} left={0} right={0} bottom={0} bg="black" opacity={1} borderRadius="5px" />
              <x.div position="relative" h="100%" display="flex" flexDirection="column" justifyContent="space-between">
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

const getImgUrl = (src: string) =>
  `url("/_next/image?url=${encodeURIComponent(src)}&w=640&q=75")`;

export const Tile = styled.divBox<{ expanded: boolean }>`
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

  &:last-of-type::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 5;
    width: 100%;
    border-left: 2px solid #e3e3e3;
    border-right: 2px solid #e3e3e3;
    height: 10000px;
    z-index: -1;
  }

  @media (min-width: sm) {
    &:nth-last-of-type(-n+2)::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 5;
      width: 100%;
      border-left: 2px solid #e3e3e3;
      border-right: 2px solid #e3e3e3;
      height: 10000px;
      z-index: -1;
    }
  }

  ${p => p.expanded ? css`
    @media (min-width: md)::after {
      &:nth-last-of-type(-n+4) {
        content: "";
        display: block;
        position: absolute;
        bottom: 5;
        width: 100%;
        border-left: 2px solid #e3e3e3;
        border-right: 2px solid #e3e3e3;
        height: 10000px;
        z-index: -1;
      }
    }
  ` : css`
    @media (min-width: md) {
      &:nth-last-of-type(-n+2)::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 5;
        width: 100%;
        border-left: 2px solid #e3e3e3;
        border-right: 2px solid #e3e3e3;
        height: 10000px;
        z-index: -1;
      }
    }
  `}

${p => p.expanded ? css`
  @media (min-width: lg) {
    &:nth-last-of-type(-n+6)::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 5;
      width: 100%;
      border-left: 2px solid #e3e3e3;
      border-right: 2px solid #e3e3e3;
      height: 10000px;
      z-index: -1;
    }
  }
` : css`
  @media (min-width: lg) {
    &:nth-last-of-type(-n+4)::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 5;
      width: 100%;
      border-left: 2px solid #e3e3e3;
      border-right: 2px solid #e3e3e3;
      height: 10000px;
      z-index: -1;
    }
  }
`}
`;
