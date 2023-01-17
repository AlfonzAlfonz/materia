import { ProjectGrid } from "components/ProjectGrid";
import { Ui, useUi } from "components/Ui";
import { Project } from "data/types";
import { GetStaticProps } from "next";
import { FC } from "react";

import { listProjects } from "./api/list-projects";

import { DiscoverRes, getDiscover } from "./api/discover";
export const getStaticProps = async () => {
  return {
    props: {
      projects: await listProjects([]),
      discover: await getDiscover()
    },
    revalidate: 10
  };
};

type PropsOf<T extends GetStaticProps> = Awaited<ReturnType<T>> extends { props: infer U } ? U : never;

export const Index: FC<PropsOf<typeof getStaticProps>> = (props) => {
  const { menu } = useUi();

  return (
    <ProjectGrid items={props.projects.map(getItem)} columns={!menu ? 6 : 4} />
  );
};

const withUi = <T extends PropsOf<typeof getStaticProps>>(C: FC<T>): FC<T> => {
  const C2: FC<T> = (p) => <Ui discover={p.discover}><C {...p} /></Ui>;
  C2.displayName = `withUi(${C2.displayName ?? C2.name})`;
  return C2;
};

export default withUi(Index);

const getItem = (p: Project) => ({
  id: p.id,
  img: p.files[0]?.slice(1, -1),
  name: p.name,
  tags: [...p.designers, ...p.materials, ...p.technologies, ...p.manufacturers].map(t => t.slice(1, -1)),
  project: p
});
