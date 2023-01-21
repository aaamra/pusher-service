const publicVapidKey =
  "BKXrJMPXpEDOb69100ItzgujUisGOaom7JccFybYcMSkE_zt9d8iB-qtWNjRpwyWH5PyYIvWW1xeBVwjgRA8sH0";

if ("serviceWorker" in navigator) {
  registerServiceWorker().catch(console.log);
}

async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
