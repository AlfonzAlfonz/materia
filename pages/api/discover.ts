import sql from "data/sql";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await getDiscover());
};

export default handler;

export type DiscoverRes = {
  designers: string[];
  technologies: string[];
  materials: string[];
  manufacturers: string[];
};

export const getDiscover = async (): Promise<DiscoverRes> => {
  const designers = await sql`SELECT DISTINCT unnest(designers)  FROM projects`;
  const technologies = await sql`SELECT DISTINCT unnest(technologies)  FROM projects`;
  const materials = await sql`SELECT DISTINCT unnest(materials)  FROM projects`;
  const manufacturers = await sql`SELECT DISTINCT unnest(manufacturers)  FROM projects`;

  return Object.fromEntries(
    Object.entries({ designers, technologies, materials, manufacturers }).map(([k, v]) => [k, v.map(x => x.unnest)])
  ) as DiscoverRes;
};
