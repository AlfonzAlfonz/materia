import sql from "data/sql";
import { Project } from "data/types";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "url";
import { more, only } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { discover } } = parse(req.url!, true);

  res.json(await listProjects(more(discover)));
};

export default handler;

const arrayQuery = (array: string[]) => sql`to_tsquery('simple', ${array.map(x => x + ":*").join(" ")})`;

export const listProjects = async (discover: string[]): Promise<Project[]> => {
  return await sql`
    SELECT id, name, designers, materials, technologies, manufacturers, annotation, files FROM projects  
    ${discover.length > 0 ? sql`
      WHERE
        name_vec @@ to_tsquery('simple', ${only(discover) + ":*"})
        designers_vec @@ ${arrayQuery(more(discover))}
        materials_vec @@ ${arrayQuery(more(discover))}
        technologies_vec @@ ${arrayQuery(more(discover))}
        manufacturers_vec @@ ${arrayQuery(more(discover))}
    ` : sql``}
   `;
};
