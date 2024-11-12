/* eslint-disable no-undef */

window.onload = () => {
  function getCurrentURL() {
    return window.location.href;
  }

  function sendCurrentURL() {
    const currentURL = getCurrentURL();
    chrome.runtime.sendMessage({ type: "FROM_CONTENT", payload: { url: currentURL } });
    console.log('Current URL:', currentURL);
  }

  sendCurrentURL();

  setInterval(sendCurrentURL, 2000);

  console.log("Script active");
};
