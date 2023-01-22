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
  const designers = await sql`SELECT DISTINCT unnest(designers), created_at FROM projects ORDER BY created_at LIMIT 20`;
  const technologies = await sql`SELECT DISTINCT unnest(technologies), created_at FROM projects ORDER BY created_at LIMIT 20`;
  const materials = await sql`SELECT DISTINCT unnest(materials), created_at FROM projects ORDER BY created_at LIMIT 20`;
  const manufacturers = await sql`SELECT DISTINCT unnest(manufacturers), created_at FROM projects ORDER BY created_at LIMIT 20`;

  return Object.fromEntries(
    Object.entries({ designers, technologies, materials, manufacturers }).map(([k, v]) => [k, v.map(x => x.unnest)])
  ) as DiscoverRes;
};
