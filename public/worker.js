console.log("Service worker loaded...");

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log(event.notification, event);
  console.log("Notification Click.");

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        includeUncontrolled: true,
      });

      console.log(allClients);

      await clients.openWindow("https://google.com");
    })()
  );
});

self.addEventListener("push", function (e) {
  const { title, options } = e.data.json();

  self.registration.showNotification(title, options);
});
