chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'scrape_data') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      });
      return true; // Required for async sendResponse
    }
  });
  