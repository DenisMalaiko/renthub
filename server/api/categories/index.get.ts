import { getApolloClient } from "~/server/utils/apollo";
import { GET_CATEGORIES } from "~/graphql/queries";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const client = getApolloClient(config.public.API_URL);

  const { data } = await client.query({
    query: GET_CATEGORIES,
  });

  return data.categories;
})