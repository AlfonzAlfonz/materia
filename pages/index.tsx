import { DiscoverGrid } from "components/DiscoverGrid";
import { ProjectGrid } from "components/ProjectGrid";
import { getItem } from "components/ProjectGrid/utils";
import { Ui, useUi } from "components/Ui";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

import { getDiscover } from "./api/discover";
import { listProjects } from "./api/list-projects";

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
  const { query: { discover } } = useRouter();

  const cols = !menu ? 6 : 4;

  return (
    discover
      ? <DiscoverGrid columns={cols} />
      : <ProjectGrid items={props.projects.map(getItem)} expanded={!menu} />
  );
};

const withUi = <T extends PropsOf<typeof getStaticProps>>(C: FC<T>): FC<T> => {
  const C2: FC<T> = (p) => <Ui discover={p.discover}><C {...p} /></Ui>;
  C2.displayName = `withUi(${C2.displayName ?? C2.name})`;
  return C2;
};

export default withUi(Index);
