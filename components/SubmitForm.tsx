import { x } from "@xstyled/emotion";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import useSWRMutation from "swr/mutation";
import { AnySchema, array, object, string } from "yup";
import { Button } from "./Button";
import { Error } from "./inputs/Error";

import { FileInput } from "./inputs/FileInput";
import { InputField } from "./inputs/Input";
import { SelectInput } from "./inputs/SelectInput";
import { Title, useUi } from "./Ui";

const fetchSubmit = (key: string, { arg }: { arg: any }) =>
  fetch(key, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(async r => {
    if (r.ok) {
      r.json();
    } else {
      throw new window.Error(await r.text());
    }
  });

type SubmitForm = {
  name?: string;
  designers?: string[];
  materials?: string[];
  technologies?: string[];
  manufacturers?: string[];
  annotation: string;
  files: File[];
};

export const SubmitForm: FC = () => {
  const { push } = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const { trigger } = useSWRMutation("/api/submit-project", fetchSubmit);
  const { discover } = useUi();

  return !submitted ? (
    <Formik
      initialValues={{
        name: "",
        designers: [],
        materials: [],
        technologies: [],
        manufacturers: [],
        annotation: "",
        files: []
      } as SubmitForm}
      validationSchema={schema}
      onSubmit={async ({ files, ...rest }, a) => {
        const encodedFiles = await Promise.all(files.map(f => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(f);
          reader.onload = ev => {
            resolve({ name: f.name, data: reader.result as any });
          };
          reader.onerror = reject;
        })));

        try {
          await trigger({ ...rest, files: encodedFiles });
          a.setSubmitting(false);
          setSubmitted(true);
          push("/");
        } catch (e) {
          if (e instanceof window.Error) {
            alert(`Nepoda??ilo se odeslat project (${e.message})`);
          } else {
            alert("Nepoda??ilo se odeslat project");
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <x.div display="flex" flexDirection="column" spaceY={3}>
            <Title>
              Vytvo??it projekt
            </Title>
            <x.div spaceY="10px" display="flex" flexDirection="column">
              <x.label fontSize="sm" spaceY={1}>
                <span>N??zev projektu</span>
                <InputField name="name" />
                <Error name="name" />
              </x.label>
              <x.label fontSize="sm" spaceY={1}>
                <span>Design??r</span>
                <SelectInput name="designers" options={discover.designers} />
                <Error name="designers" />
              </x.label>
              <x.label fontSize="sm" spaceY={1}>
                <span> Materi??ly</span>
                <SelectInput name="materials" options={discover.materials} />
                <Error name="materials" />
              </x.label>
              <x.label fontSize="sm" spaceY={1}>
                <span> Technologie tisku</span>
                <SelectInput name="technologies" options={discover.technologies} />
                <Error name="technologies" />
              </x.label>
              <x.label fontSize="sm" spaceY={1}>
                <span>V??robce / Tisk??rna</span>
                <SelectInput name="manufacturers" options={discover.manufacturers} />
                <Error name="manufacturers" />
              </x.label>

              <x.label fontSize="sm" spaceY={1}>
                <span>Anotace</span>
                <InputField name="annotation" as="textarea" minHeight="300px" py={2} />
                <Error name="annotation" />
              </x.label>
            </x.div>

            <FileInput name="files" />

            <Button type="submit">
              {!isSubmitting ? "Vytvo??it projekt" : "Odes??l??n??"}
            </Button>
          </x.div>

        </Form>
      )}

    </Formik>
  ) : <Submitted back={() => setSubmitted(false)} />;
};

export const Submitted: FC<{ back: () => unknown }> = ({ back }) => {
  return (
    <x.div display="flex" alignItems="flex-start" flexDirection="column" spaceY="20px">
      <Title>D??kujeme za projekt</Title>

      <Button onClick={back}>Odeslat dal???? projekt</Button>
    </x.div>
  );
};

const stringRequired = () => string().required("Pole je povinn??");
const arrayRequired = (min: number, max: number, of: AnySchema) =>
  array()
    .of(string().required())
    .max(max, "Maximum je 5 polo??ek")
    .min(min, "Pole je povinn??")
    .required();

export const schema = object().shape({
  name: stringRequired(),
  designers: arrayRequired(1, 5, string().required()),
  manufacturers: arrayRequired(1, 5, string().required()),
  technologies: arrayRequired(1, 5, string().required()),
  materials: arrayRequired(1, 5, string().required()),
  annotation: string(),
  files: arrayRequired(1, 3, string().required())
});
