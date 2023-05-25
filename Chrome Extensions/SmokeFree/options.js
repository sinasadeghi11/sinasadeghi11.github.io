document.getElementById("saveButton").addEventListener("click", () => {
    const quitDate = new Date(document.getElementById("quitDateTime").value);
    chrome.storage.sync.set({ quitDate: quitDate.toISOString() }, () => {
      alert("Quit date saved!");
    });
  });
  