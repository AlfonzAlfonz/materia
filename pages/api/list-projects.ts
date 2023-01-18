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

const arrayQuery = (array: string | string[]) =>
  sql`to_tsquery('simple', ${more(array).map(s => s.split(" ").join(" & ")).join(" | ")})`;

export const listProjects = async (discover: string[]): Promise<Project[]> => {
  const x = only(discover);
  console.log(x);

  return await sql`
    SELECT id, name, designers, materials, technologies, manufacturers, annotation, files FROM projects  
    ${discover.length > 0 ? sql`
      WHERE
        name_vec @@ ${arrayQuery(discover)} or
        designers_vec @@ ${arrayQuery(discover)} or
        materials_vec @@ ${arrayQuery(discover)} or
        technologies_vec @@ ${arrayQuery(discover)} or
        manufacturers_vec @@ ${arrayQuery(discover)}

    ` : sql``}
    ORDER BY created_at DESC
   `;
};
