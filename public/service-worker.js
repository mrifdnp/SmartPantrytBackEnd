self.addEventListener("push", function(event) {
  let payload = {};

  try {
    payload = event.data?.json();
  } catch {
    payload = {
      title: "Push Notification",
      body: event.data?.text() || "No body",
    };
  }

  const title = payload.title || "Untitled";
  const options = {
    body: payload.body || "No body",
    icon: "/icons/icon-192x192.png",
    data: { url: payload.deep_link || "https://smart-pantry-back-end.vercel.app/" }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
