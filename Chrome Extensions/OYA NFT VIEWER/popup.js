function fillDropdown() {
    const dropdown = document.getElementById('image-number');
    for (let i = 2; i <= 300; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      dropdown.appendChild(option);
    }
  }
  
  function fetchImage() {
    const selectedNumber = document.getElementById('image-number').value;
    const imageUrl = `https://ipfs.io/ipfs/bafybeietvfbx4jhws2zwxxgqxrd73ebwyotbw3d6zadatnhx63nt4sq2u4/${selectedNumber}.jpg`;
  
    document.getElementById('parcel-title').textContent = `Parcel #${selectedNumber}`;
    document.getElementById('parcel-image').src = imageUrl;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fillDropdown();
    fetchImage();
    document.getElementById('image-number').addEventListener('change', fetchImage);
  });
  