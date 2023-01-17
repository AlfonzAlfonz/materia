import styled, { SystemProps, x } from "@xstyled/emotion";
import { Project } from "data/types";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { only } from "utils";
import { Modal } from "./Model";

import { SmallTag, Title } from "./Ui";
import CloseIcon from "@mui/icons-material/Close";

type Item = { id: number; img: string; name: string; tags: string[]; project: Project };

interface Props {
  columns: number;
  items: Item[];
}

export const ProjectGrid: FC<Props> = ({ columns, items }) => {
  const { query, push } = useRouter();

  const project = useMemo(() => query.project ? items.find(i => i.id === +only(query.project)!) : undefined, [items, query.project]);

  return (
    <>
      {/* <ProjectModal project={project} onClose={() => push({ query: { ...query, project: [] } })} /> */}
      <x.div
        display="grid"
        gap="10px"
        gridTemplateColumns={[...Array(columns)].map(_ => "1fr").join(" ")}
      >
        {items.map((itm, i) => (
          <Tile
            key={i}
            overflow="hidden"
            backgroundImage={getImgUrl("https://placekitten.com/300/400")}
            backgroundPosition="center"
            backgroundSize="cover"
            onClick={() => push({ query: { project: itm.id } })}
          >
            <x.div opacity={0} h="100%" position="relative" cursor="pointer">
              <x.div position="absolute" top={0} left={0} right={0} bottom={0} bg="gray-200" opacity={0.5} />
              <x.div position="relative" h="100%" display="flex" flexDirection="column" justifyContent="space-between">
                <x.h2 fontSize="2rem" mb={3}>{itm.name}</x.h2>
                <x.div display="flex" spaceX={1}>
                  {itm.tags.map(t => <SmallTag key={t} borderRadius={4}>{t}</SmallTag>)}
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

export const Tile = styled.divBox`
  transition: 100ms background-color, opacity;
  aspect-ratio: 289 / 335;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;

  & > div {
    transition: 100ms background-color, opacity;
    padding: 2;
  }

  &:hover {
    & > div {
      opacity: 1;
    }
  }
`;

export const ProjectModal: FC<{ project?: Item; onClose: () => unknown }> = ({ project, onClose }) => {
  return (
    <Modal open={!!project} onClose={onClose}>
      {project && (
        <x.div
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          maxW="60vw"
          maxH="70vh"
          gap="12px"
        >
          <x.div
            gridColumn="1"
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            w="100%"
            overflowY="scroll"
            pr="12px"
          >
            <x.button p="1px" boxShadow="0px 1px 3px #00000029" borderRadius="5px" bg="white" onClick={onClose}>
              <CloseIcon fontSize="medium" />
            </x.button>

            <Title mt="20px">Projekt</Title>

            <x.h1 fontSize="26px" mt="23px">{project.name}</x.h1>

            <x.div display="flex" mt="14px" flexWrap="wrap" gap="7px">
              {project.tags.map((t) => <SmallTag key={t}>{t}</SmallTag>)}
            </x.div>

            <x.p mt="25px" fontSize="13px">
              {project.project.annotation}
            </x.p>
          </x.div>

          <x.div gridColumn="2 / span 2" display="flex" flexDirection="column" gap="16px" overflowX="hidden" overflowY="scroll" h="100%">
            <x.div display="flex" flexGrow={0} w="100%" gap="16px">
              {project.project.files.slice(0, 2).map((f, i) => (
                <x.div key={i}>
                  <ModalImg w="100%" id={project.id} f={f} />
                </x.div>
              ))}
            </x.div>

            <x.div>
              <ModalImg w="100%" id={project.id} f={project.project.files[2]} />
            </x.div>
          </x.div>
        </x.div>
      )}
    </Modal>
  );
};

export const ModalImg: FC<{ id: number; f: string } & SystemProps> = ({ id, f, ...props }) => (
  <x.img
    src={`/static/uploads/${id}/${f.slice(1, -1)}`}
    alt={f.slice(1, -1)}
    {...props}
  />
);
