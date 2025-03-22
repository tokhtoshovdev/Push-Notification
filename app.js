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

  // else {
  //   new Notification("hello world");
  // }
};

const main = async () => {
  const reg = await registerSW();
  console.log(reg);
  reg.showNotification("hello world");
};
