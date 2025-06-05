import { getApolloClient } from "~/server/utils/apollo";
import { GET_PRODUCT_BY_ID } from "~/graphql/queries";

export default defineEventHandler(async (event: any) => {
  const config = useRuntimeConfig();
  const client = getApolloClient(config.public.API_URL);
  const { data } = await client.query({
    query: GET_PRODUCT_BY_ID,
    variables: {
      productId: event.context.params?.id,
    }
  });

  return data.product;
})