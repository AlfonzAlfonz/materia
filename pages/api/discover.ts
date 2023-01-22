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
  const designers = await sql`
    SELECT DISTINCT q.unnest
    FROM (SELECT unnest(designers), created_at FROM projects ORDER BY created_at LIMIT 20) as q
    ORDER BY q.unnest
  `;
  const technologies = await sql`
    SELECT DISTINCT q.unnest
    FROM (SELECT unnest(technologies), created_at FROM projects ORDER BY created_at LIMIT 20) as q
    ORDER BY q.unnest
  `;
  const materials = await sql`
    SELECT DISTINCT q.unnest
    FROM (SELECT unnest(materials), created_at FROM projects ORDER BY created_at LIMIT 20) as q
    ORDER BY q.unnest
  `;
  const manufacturers = await sql`
    SELECT DISTINCT q.unnest
    FROM (SELECT unnest(manufacturers), created_at FROM projects ORDER BY created_at LIMIT 20) as q
    ORDER BY q.unnest
  `;

  return Object.fromEntries(
    Object.entries({ designers, technologies, materials, manufacturers }).map(([k, v]) => [k, v.map(x => x.unnest)])
  ) as DiscoverRes;
};
