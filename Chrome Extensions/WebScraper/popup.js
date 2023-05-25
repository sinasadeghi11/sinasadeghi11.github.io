document.getElementById('scrapeButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { file: 'content.js' },
      (results) => {
        if (chrome.runtime.lastError) {
          document.getElementById('result').textContent = 'An error occurred: ' + chrome.runtime.lastError.message;
        } else {
          const data = results[0];
          let resultHTML = '';

          resultHTML += '<div class="section-title">Headings:</div>';
          resultHTML += data.headings.join('<br>');

          resultHTML += '<br><br><div class="section-title">Links:</div>';
          resultHTML += data.links.map((link) => `<a href="${link}" target="_blank">${link}</a>`).join('<br>');

          resultHTML += '<br><br><div class="section-title">Metadata:</div>';
          resultHTML += JSON.stringify(data.metadata, null, 2);

          if (data.structuredData.length > 0) {
            resultHTML += '<br><br><div class="section-title">Structured Data:</div>';
            resultHTML += JSON.stringify(data.structuredData, null, 2);
          }

          document.getElementById('result').innerHTML = resultHTML;
        }
      }
    );
  });
});
