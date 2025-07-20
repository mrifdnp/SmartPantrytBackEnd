export const initOneSignal = () => {
  if (typeof window !== "undefined" && "OneSignal" in window) {
    // Sudah pernah init
    return;
  }

  // Inject script
  const script = document.createElement("script");
  script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    // @ts-ignore
    window.OneSignal = window.OneSignal || [];
    // @ts-ignore
    window.OneSignal.push(function () {
      // @ts-ignore
      window.OneSignal.init({
             appId: "c65aacca-0f5e-4bac-8ae9-ce124b5fa3a4",
        safari_web_id: "", // optional
        notifyButton: {
          enable: true,
        },
      });
    });
  };
};
