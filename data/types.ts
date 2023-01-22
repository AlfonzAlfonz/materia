export type Project = {
  id: number;

  name: string;
  designers: string[];
  materials: string[];
  technologies: string[];
  manufacturers: string[];
  annotation: string;

  files: string[];
};

export type Info = {
  code: string;
  title: string;
  text: string;
};
