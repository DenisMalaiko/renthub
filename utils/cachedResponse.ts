import {Product} from "~/models/Product";

export const checkCachedProducts = async (requestBody: Object): Promise<Product[] | []> => {
  const cacheKey = new Request("http://localhost:8080/graphql" + encodeURIComponent(JSON.stringify(requestBody)), {
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
