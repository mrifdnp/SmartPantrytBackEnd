self.addEventListener("push", function (event) {
  const data = event.data?.json();

  const title = data.notification?.title || "Untitled";
  const options = {
    body: data.notification?.body || "No body",
    data: {
      url: data.notification?.deep_link || "https://smart-pantry.vercel.app/",
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "https://smart-pantry.vercel.app/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
