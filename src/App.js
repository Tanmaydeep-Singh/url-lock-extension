import React, { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      const handleMessage = (message) => {
        if (!message || message.type !== 'FROM_BACKGROUND') {
          console.error("Invalid or unexpected message:", message);
          return;
        }

        const { payload } = message;
        if (payload && payload.url) {
          setUrl(payload.url); // Set the URL received from background
          setLoading(false); // Once the URL is set, stop loading
        } else {
          console.error("No URL found in the message payload");
        }
      };

      chrome.runtime.onMessage.addListener(handleMessage);

      return () => {
        chrome.runtime.onMessage.removeListener(handleMessage);
      };
    } else {
      console.warn("chrome.runtime is not available. This will not work in a non-extension environment.");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-white">HELLO</h1>
      <h1> Another Minor Update Yet Again </h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <h1 className="text-white">URL: {url}</h1>
      )}
    </div>
  );
}

export default App;
