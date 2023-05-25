document.addEventListener("DOMContentLoaded", function () {
    const resetCounter = document.getElementById("resetCounter");
  
    resetCounter.addEventListener("click", function () {
      chrome.storage.sync.set({ pleasure: 0, pain: 0 }, function () {
        alert("Counter has been reset.");
      });
    });
  });
  