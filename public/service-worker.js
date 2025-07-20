self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "http://smartpantrybackend.vercel.app/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Jika sudah ada tab terbuka, fokuskan
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }

      // Kalau belum ada, buka baru
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
