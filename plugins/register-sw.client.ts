export default defineNuxtPlugin(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/custom-sw.js") // ✅ Вірний шлях
      .then((registration) => {
        console.log("✅ Service Worker зареєстрований:", registration);
      })
      .catch((err) => console.error("❌ Помилка реєстрації SW:", err));
  }
});