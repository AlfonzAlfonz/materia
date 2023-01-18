import { x } from "@xstyled/emotion";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import useSWRMutation from "swr/mutation";
import { AnySchema, array, object, string } from "yup";
import { Button } from "./Button";
import { Error } from "./Error";

import { FileInput } from "./FileInput";
import { InputField } from "./Input";
import { SelectInput } from "./SelectInput";
import { Title, useUi } from "./Ui";

const fetchSubmit = (key: string, { arg }: { arg: any }) =>
  fetch(key, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());

type SubmitForm = {
  name?: string;
  designers?: string[];
  materials?: string[];
  technologies?: string[];
  manufacturers?: string[];
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

        const result = await trigger({ ...rest, files: encodedFiles });

        a.setSubmitting(false);
        setSubmitted(true);
        push("/");
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <x.div display="flex" flexDirection="column" spaceY={3}>
            <Title>
              Nový projekt
            </Title>
            <x.div spaceY="10px" display="flex" flexDirection="column">
              <x.label fontSize="13px" spaceY={1}>
                <span>Název projektu</span>
                <InputField name="name" />
                <Error name="name" />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span>Designér</span>
                <SelectInput name="designers" options={discover.designers} />
                <Error name="designers" />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span> Materiály</span>
                <SelectInput name="materials" options={discover.materials} />
                <Error name="materials" />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span> Technologie tisku</span>
                <SelectInput name="technologies" options={discover.technologies} />
                <Error name="technologies" />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span>Výrobce / Tiskárna</span>
                <SelectInput name="manufacturers" options={discover.manufacturers} />
                <Error name="manufacturers" />
              </x.label>

              <x.label fontSize="13px" spaceY={1}>
                <span>Anotace</span>
                <InputField name="annotation" as="textarea" minHeight="300px" />
                <Error name="annotation" />
              </x.label>
            </x.div>

            <FileInput name="files" />

            <Button type="submit">
              {!isSubmitting ? "Send" : "Loading"}
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
      <Title>Děkujeme za projekt</Title>

      <Button onClick={back}>Odeslat další projekt</Button>
    </x.div>
  );
};

const stringRequired = () => string().required("Pole je povinné");
const arrayRequired = (min: number, max: number, of: AnySchema) =>
  array()
    .of(string().required())
    .max(max, "Maximum je 5 položek")
    .min(min, "Pole je povinné")
    .required();

export const schema = object().shape({
  name: stringRequired(),
  designers: arrayRequired(1, 5, string().required()),
  manufacturers: arrayRequired(1, 5, string().required()),
  technologies: arrayRequired(1, 5, string().required()),
  materials: arrayRequired(1, 5, string().required()),
  annotation: stringRequired(),
  files: arrayRequired(1, 3, string().required())
});
