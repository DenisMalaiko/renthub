import { getApolloClient } from '~/server/utils/apollo'
import { GET_PRODUCTS } from "~/graphql/queries";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const client = getApolloClient(config.public.API_URL);
    const { data } = await client.query({
        query: GET_PRODUCTS
    });
    return data.products;
});