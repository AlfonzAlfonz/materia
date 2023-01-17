import styled, { x } from "@xstyled/emotion";
import { Project } from "data/types";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { only } from "utils";

import { SmallTag } from "./Ui";

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

// export const ProjectModal: FC<{ project?: Item; onClose: () => unknown }> = ({ project, onClose }) => {
//   return null;
//   return (
//     <Modal open={!!project} onClose={onClose}>
//       {project && (
//         <x.div display="flex" maxW="60vw" maxH="70vh" overflow="scroll">
//           <x.div display="flex" alignItems="flex-start" flexDirection="column" flexGrow={1}>
//             <x.button p="1px" boxShadow="0px 1px 3px #00000029" borderRadius="5px" bg="white" onClick={onClose}>
//               <CloseIcon fontSize="medium" />
//             </x.button>

//             <Title mt="20px">Projekt</Title>

//             <x.h1 fontSize="26px" mt="23px">{project.name}</x.h1>

//             <x.div display="flex" mt="14px">
//               {project.tags.map((t) => <SmallTag key={t} mr="7px">{t}</SmallTag>)}
//             </x.div>

//             <x.p mt="25px">
//               {project.project.annotation}
//             </x.p>
//           </x.div>

//           <x.div display="flex" flexWrap="wrap" flexGrow={2}>
//             {[...Array(3)].map((_, i) => <Image key={i} src="https://placekitten.com/342/645" alt="" height={645} width={324} />)}
//           </x.div>
//         </x.div>
//       )}
//     </Modal>
//   );
// };
