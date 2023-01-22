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
  files: { data: string; name: string }[];
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

  const result = await sql`
    INSERT INTO projects(name, designers, manufacturers, technologies, materials, files) 
    VALUES (${body.name}, ${body.designers}, ${body.manufacturers}, ${body.technologies}, ${body.materials}, ${body.files.map(f => f.name)}) 
    RETURNING *`
    .catch(() => null);

  if (result === null) {
    res.status(400).end();
    return;
  }

  const basePath = path.join(process.cwd(), "public", "uploads", `${result[0].id}`);

  await fs.mkdir(basePath, { recursive: true });

  for (const [i, file] of body.files.entries()) {
    const [info, data] = file.data.split(",");

    const ext = info.includes("image/jpeg") || info.includes("image/jpg") ? "jpg" : info.includes("data/png") ? "png" : undefined;

    if (!ext) {
      res.status(400).end();
      return;
    }

    await fs.writeFile(
      path.join(basePath, `${file.name}`),
      Buffer.from(data, "base64"),
      { flag: "w+" }
    );
  }

  res.json(result[0]);
};

export default handler;

export const schema = object().shape({
  name: string().required(),
  designers: array().of(string().required()).max(5),
  manufacturers: array().of(string().required()).max(5),
  technologies: array().of(string().required()).max(5),
  materials: array().of(string().required()).max(5),
  files: array().max(3).of(object().shape({
    name: string().required(),
    data: string().required()
  }))
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
};
