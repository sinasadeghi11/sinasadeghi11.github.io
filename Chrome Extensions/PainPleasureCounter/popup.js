document.addEventListener("DOMContentLoaded", function () {
    const addPleasure = document.getElementById("addPleasure");
    const addPain = document.getElementById("addPain");
    const pleasureCounter = document.getElementById("pleasureCounter");
    const painCounter = document.getElementById("painCounter");
    const total = document.getElementById("total");
  
    function updateCounters() {
      chrome.storage.sync.get(["pleasure", "pain"], function (items) {
        pleasureCounter.textContent = items.pleasure || 0;
        painCounter.textContent = items.pain || 0;
        const totalValue = (items.pleasure || 0) - (items.pain || 0);
        total.textContent = Math.abs(totalValue);
        if (totalValue > 0) {
          total.style.color = "red";
        } else if (totalValue < 0) {
          total.style.color = "green";
        } else {
          total.style.color = "#444"; // Reset to default color if total is 0
        }
      });
    }
    
  
    addPleasure.addEventListener("click", function () {
      chrome.storage.sync.get("pleasure", function (item) {
        const newCount = (item.pleasure || 0) + 1;
        chrome.storage.sync.set({ pleasure: newCount }, updateCounters);
      });
    });
  
    addPain.addEventListener("click", function () {
      chrome.storage.sync.get("pain", function (item) {
        const newCount = (item.pain || 0) + 1;
        chrome.storage.sync.set({ pain: newCount }, updateCounters);
      });
    });
    updateCounters();
  });
  