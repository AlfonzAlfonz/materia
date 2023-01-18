import { Project } from "data/types";

export const getItem = (p: Project) => ({
  id: p.id,
  img: p.files[0],
  name: p.name,
  tags: [...p.designers, ...p.materials, ...p.technologies, ...p.manufacturers],
  project: p
});
