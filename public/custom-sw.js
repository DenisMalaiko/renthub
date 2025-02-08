console.log("🔥 Service Worker запущено!");

self.addEventListener("install", (event) => {
    console.log("✅ Service Worker встановлено");
    self.skipWaiting(); // Примусове оновлення SW
});

self.addEventListener("activate", (event) => {
    console.log("🚀 Service Worker активовано");
    event.waitUntil(clients.claim()); // Робимо SW активним відразу
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.method === "POST" && request.url.includes("/graphql")) {
        event.respondWith(
            (async () => {
                const cache = await caches.open("graphql-cache");
                const requestClone = request.clone();

                const requestBody = await requestClone.json();
                const cacheKey = new Request(request.url + encodeURIComponent(JSON.stringify(requestBody)), {
                    headers: request.headers,
                });

                try {
                    const networkResponse = await fetch(request);
                    const responseClone = networkResponse.clone();
                    await cache.put(cacheKey, responseClone); // Кешуємо відповідь

                    return networkResponse;
                } catch (error) {
                    console.error("Fetch failed, trying cache:", error);

                    const cachedResponse = await cache.match(cacheKey);
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return new Response("Network error and no cache available", { status: 500 });
                }
            })()
        );
    }
});
/*self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.method === "POST" && request.url.includes("/graphql")) {
        event.respondWith(
            (async () => {
                const cache = await caches.open("graphql-cache");
                const requestClone = request.clone();

                try {
                    const networkResponse = await fetch(requestClone);
                    console.log("RESPONSE ", networkResponse);

                    const responseClone = networkResponse.clone();
                    const responseData = await responseClone.json();
                    console.log("RESPONSE DATA ", responseData)

                    // Зберігаємо відповідь у кеш
                    await cache.put(requestClone, responseClone);

                    return networkResponse;
                } catch (error) {
                    console.error("Fetch failed, trying cache:", error);

                    const cachedResponse = await cache.match(request);
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return new Response("Network error and no cache available", { status: 500 });
                }
            })()
        );
    }
});*/
