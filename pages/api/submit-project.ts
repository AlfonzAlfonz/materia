import sql from "data/sql";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { array, object, string } from "yup";

interface ReqBody {
  name: string;
  designers: string[];
  manufacturers: string[];
  technologies: string[];
  materials: string[];
  files: string[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const body: ReqBody = req.body;

  try {
    schema.validateSync(req.body);
  } catch (e) {
    res.status(400).end("validation error");
    return;
  }

  const result = await sql`INSERT INTO projects(name) VALUES (${body.name}) RETURNING *`.catch(() => null);
  if (result === null) {
    res.status(400).end();
    return;
  }

  const basePath = path.join(process.cwd(), "static", "uploads", `${result[0].id}`);

  await fs.mkdir(basePath, { recursive: true });

  for (const [i, file] of body.files.entries()) {
    const [info, data] = file.split(",");

    const ext = info.includes("image/jpeg") || info.includes("image/jpg") ? "jpg" : info.includes("data/png") ? "png" : undefined;

    if (!ext) {
      res.status(400).end();
      return;
    }

    await fs.writeFile(
      path.join(basePath, `${i}.${ext}`),
      Buffer.from(data, "base64"),
      { flag: "w+" }
    );
  }

  res.json(result[0]);
};

export default handler;

export const schema = object().shape({
  name: string().required(),
  files: array().of(string().required())
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
};
