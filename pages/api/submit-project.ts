import sql from "data/sql";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { array, object, string, ValidationError } from "yup";
import { PostgresError } from "postgres";

interface ReqBody {
  name: string;
  designers: string[];
  manufacturers: string[];
  technologies: string[];
  materials: string[];
  annotation: string;
  files: { data: string; name: string }[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const body: ReqBody = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    await sql.begin(async sql => {
      schema.validateSync(req.body);

      const result = await sql`
      INSERT INTO projects(name, designers, manufacturers, technologies, materials, annotation, files) 
      VALUES (${body.name}, ${body.designers}, ${body.manufacturers}, ${body.technologies}, ${body.materials}, ${body.annotation}, ${body.files.map(f => f.name)}) 
      RETURNING *`;

      if (result === null) {
        throw new ApiError("insert failed");
      }

      const basePath = path.join(process.cwd(), "public", "uploads", `${result[0].id}`);

      await fs.mkdir(basePath, { recursive: true });

      for (const [i, file] of body.files.entries()) {
        const [info, data] = file.data.split(",");

        const ext = info.includes("image/jpeg") || info.includes("image/jpg") ? "jpg" : info.includes("image/png") ? "png" : undefined;

        if (!ext) {
          throw new ApiError("invalid image");
        }

        await fs.writeFile(
          path.join(basePath, `${file.name}`),
          Buffer.from(data, "base64"),
          { flag: "w+" }
        );
      }
      res.json(result[0]);
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      error(res, "validation error");
      return;
    }
    if (e instanceof ApiError) {
      error(res, e.message);
      return;
    }
    if (e instanceof PostgresError) {
      error(res, e.message);
      return;
    }
    res.status(500).end(e ? e.toString() : "Unknown error");
  }
};

export default handler;

export const schema = object().shape({
  name: string().required(),
  designers: array().of(string().required()).max(5),
  manufacturers: array().of(string().required()).max(5),
  technologies: array().of(string().required()).max(5),
  materials: array().of(string().required()).max(5),
  annotation: string(),
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

export const error = async (res: NextApiResponse, msg: string = "Bad request") => {
  res.status(400).end(msg);
};

class ApiError extends Error {}
