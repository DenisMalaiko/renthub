import {useRuntimeConfig} from "nuxt/app";

export const uploadPhoto = async (file: any) => {
  const config = useRuntimeConfig();
  const formData = new FormData();
  formData.append("operations", JSON.stringify({
    query: `mutation ($file: Upload!) {
            uploadFile(file: $file) {
                _id
                filename
                mimetype
                path
            }
        }`,
    variables: { file: null }
  }));
  formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
  formData.append("0", file);

  console.log("--------")
  console.log(formData)
  console.log("--------")

  try {
    const response = await fetch(`${config.public.API_URL}/graphql`, {
      method: "POST",
      body: formData,
      headers: {
        "Apollo-Require-Preflight": "true"
      }
    });

    const result = await response.json();
    console.log("SUCCESSFULLY UPLOADED", result);
    return result;
  } catch (err) {
    console.error("UPLOAD ERROR", err);
    return err;
  }
};