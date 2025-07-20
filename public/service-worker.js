self.addEventListener("push", function (event) {
  let data = {};
  try {
    data = event.data?.json() || {};
  } catch (e) {
    console.error("Failed to parse push event data", e);
  }

  const notificationData = data.notification || {};

  const title = notificationData.title || "Untitled";
  const options = {
    body: notificationData.body || "No body",
    data: {
      url: notificationData.deep_link || "https://smart-pantry-back-end.vercel.app/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "https://smart-pantry-back-end.vercel.app/";

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
