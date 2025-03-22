const checkPermission = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No service worker support");
  }
  if (!("Notification" in window)) {
    throw new Error("No support for notifications API");
  }
};

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register("sw.js");

  return registration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  }
};

const main = async () => {
  const reg = await registerSW();
  console.log(reg);
  reg.showNotification("hello world");
};

// install

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  }

  let deferredPrompt;
  const installButton = document.getElementById("install-button");

  window.addEventListener("beforeinstallprompt", (e) => {
    console.log("beforeinstallprompt event fired");
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = "block";
  });

  installButton.addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        deferredPrompt = null;
      });
    }
  });
});
