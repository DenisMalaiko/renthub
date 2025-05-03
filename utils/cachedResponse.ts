import {Product} from "~/models/Product";
import {useRuntimeConfig} from "nuxt/app";

export const checkCachedProducts = async (requestBody: Object): Promise<Product[] | []> => {
  const config = useRuntimeConfig()
  const cacheKey = new Request(`${config.public.API_URL}/graphql` + encodeURIComponent(JSON.stringify(requestBody)), {
    headers: {},
  });

  const cache = await caches.open("graphql-cache");
  const cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) {
    const data = await cachedResponse.json();
    console.log("SUCCESS PRODUCTS CACHED ", data.data.products);
    return data.data.products;
  }

  return []
}
