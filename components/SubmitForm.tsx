import { x } from "@xstyled/emotion";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import useSWRMutation from "swr/mutation";
import { Button } from "./Button";

import { FileInput } from "./FileInput";
import { InputField } from "./Input";
import { SelectInput } from "./SelectInput";
import { Title } from "./Ui";

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
  const [submitted, setSubmitted] = useState(true);
  const { trigger } = useSWRMutation("/api/submit-project", fetchSubmit);

  return !submitted ? (
    <Formik
      initialValues={{ files: [] } as SubmitForm}
      onSubmit={async ({ files, ...rest }, a) => {
        const encodedFiles = await Promise.all(files.map(f => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(f);
          reader.onload = ev => {
            resolve(reader.result as any);
          };
          reader.onerror = reject;
        })));

        const result = await trigger({ ...rest, files: encodedFiles });
        a.setSubmitting(false);
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
                <InputField name="name" required />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span>Designér</span>
                <SelectInput name="designers" />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span> Materiály</span>
                <SelectInput name="materials" />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span> Technologie tisku</span>
                <SelectInput name="technologies" />
              </x.label>
              <x.label fontSize="13px" spaceY={1}>
                <span>Výrobce / Tiskárna</span>
                <SelectInput name="manufacturers" />
              </x.label>
            </x.div>

            <FileInput name="files" />

            <Button>
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
