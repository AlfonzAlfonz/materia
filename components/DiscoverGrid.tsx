import { x } from "@xstyled/emotion";
import { Project } from "data/types";
import { useRouter } from "next/router";
import { FC } from "react";
import useSWR from "swr";
import { more } from "utils";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

import { ProjectGrid } from "./ProjectGrid";
import { getItem } from "./ProjectGrid/utils";

const fetcher = ([key, discover]: [string, string[]]): Promise<Project[]> =>
  fetch(key + `?${discover.map(d => `discover=${encodeURIComponent(d)}`).join("&")}`).then(r => r.json());

export const DiscoverGrid: FC<{ columns: number; expanded: boolean }> = (p) => {
  const { query: { discover } } = useRouter();
  const { data } = useSWR(["/api/list-projects", more(discover)], fetcher);

  return (
    data
      ? <ProjectGrid {...p} items={data?.map(getItem) ?? []} />
      : (
        <x.div h="100%" display="flex" alignItems="center" justifyContent="center">
          <HourglassBottomIcon style={{ fontSize: "76px" }} />
        </x.div>
      )
  );
};
