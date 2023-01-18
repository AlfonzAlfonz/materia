import { SystemProps, x } from "@xstyled/emotion";
import { Modal } from "components/Model";
import { FC } from "react";
import { GridItem } from "./index";
import CloseIcon from "@mui/icons-material/Close";
import { SmallTag, Title } from "components/Ui";

export const ProjectModal: FC<{ project?: GridItem; onClose: () => unknown }> = ({ project, onClose }) => {
  const noImgs = project && project.project.files.length === 0;

  return (
    <Modal open={!!project} onClose={onClose}>
      {project && (
        <x.div
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          maxW="60vw"
          maxH="70vh"
          gap="12px"
          h="70vh"
        >
          <x.div
            gridColumn={noImgs ? "1 / span 3" : "1"}
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

          {!noImgs && (
            <x.div gridColumn="2 / span 2" display="flex" flexDirection="column" gap="16px" overflowX="hidden" overflowY="scroll" h="100%">
              <x.div display="flex" flexGrow={0} w="100%" gap="16px">
                {project.project.files.slice(0, 2).map((f, i) => (
                  <x.div key={i}>
                    <ModalImg w="100%" id={project.id} f={f} />
                  </x.div>
                ))}
              </x.div>

              {project.project.files[2] && (
                <x.div>
                  <ModalImg w="100%" id={project.id} f={project.project.files[2]} />
                </x.div>
              )}
            </x.div>
          )}
        </x.div>
      )}
    </Modal>
  );
};

export const ModalImg: FC<{ id: number; f: string } & SystemProps> = ({ id, f, ...props }) => (
  <x.img
    src={`/static/uploads/${id}/${f}`}
    alt={f}
    {...props}
  />
);
