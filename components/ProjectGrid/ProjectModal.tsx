import { SystemProps, x } from "@xstyled/emotion";
import { Modal } from "components/Modal";
import { FC } from "react";
import { GridItem } from "./index";
import CloseIcon from "@mui/icons-material/Close";
import { SmallTag, Title } from "components/Ui";

export const ProjectModal: FC<{ project?: GridItem; onClose: () => unknown }> = ({ project, onClose }) => {
  const noImgs = project && project.project.files.length === 0;

  return (
    <Modal open={!!project} onClose={onClose}>
      {project ? (
        <x.div
          bg="#EFEFEF"
          p="22px"
          overflowY={{ _: "scroll" }}
          maxW={{ md: "60vw" }}
          maxH={{ md: "70vh" }}
          h={{ _: "100vh", md: "70vh" }}
          outline="none"
        >
          <x.div
            display="grid"
            gridTemplateColumns={{ _: "1fr", md: "1fr 1fr 1fr" }}
            gridTemplateRows={{ _: "1fr 1fr", md: "1fr" }}
            gap={3}
          >
            <x.div
              gridColumn={noImgs ? { _: 1, md: "1 / span 3" } : 1}
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              w="100%"
              mr="12px"
            >
              {/* <x.div h="24px"></x.div>
              <x.button p="1px" boxShadow="0px 1px 3px #00000029" borderRadius="5px" bg="white" onClick={onClose} position="fixed">
                <CloseIcon fontSize="medium" />
              </x.button> */}
              <x.button p="1px" boxShadow="0px 1px 3px #00000029" borderRadius="5px" bg="white" onClick={onClose}>
                <CloseIcon fontSize="medium" />
              </x.button>

              <Title mt="20px">Projekt</Title>

              <x.h1 fontSize="lg" mt="23px">{project.name}</x.h1>

              <x.div display="flex" mt="14px" flexWrap="wrap" gap="7px">
                {project.tags.map((t) => <SmallTag key={t}>{t}</SmallTag>)}
              </x.div>

              <x.p mt="25px" fontSize="sm" textAlign="left">
                {project.project.annotation}
              </x.p>
            </x.div>

            {!noImgs && (
              <x.div
                gridColumn={{ md: "2 / span 2" }}
                gridRow={{ _: 2, md: 1 }}
                display="flex"
                flexDirection="column"
                gap={4}
                overflowY="visible"
                pb={{ _: "22px" }}
              >
                <x.div
                  display="flex"
                  flexDirection={{ _: "column", md: "row" }}
                  flexGrow={0}
                  w="100%"
                  gap={4}
                >
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

        </x.div>
      ) : <div />}
    </Modal>
  );
};

export const ModalImg: FC<{ id: number; f: string } & SystemProps> = ({ id, f, ...props }) => (
  <x.img
    src={`/uploads/${id}/${f}`}
    alt={f}
    {...props}
  />
);
