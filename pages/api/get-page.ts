import sql from "data/sql";
import { Info } from "data/types";
import { NextApiRequest, NextApiResponse } from "next";
import { only } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!only(req.query.code)) {
    res.status(400).end("Bad request");
    return;
  }

  const i = await getPage(only(req.query.code!));

  if (!i) {
    res.status(404).end("Not found");
    return;
  }

  res.json(i);
};

export default handler;

export const getPage = async (code: string): Promise<Info | undefined> => {
  const q = await sql`
    SELECT * FROM info WHERE code=${code} LIMIT 1
  `;

  if (!q[0]) {
    return;
  }

  return q[0] as Info;
};
