
function displayCurrentQuitDate() {
  chrome.storage.sync.get("quitDate", ({ quitDate }) => {
    if (quitDate) {
      const quitDateElement = document.getElementById("currentQuitDate");
      const formattedQuitDate = new Date(quitDate).toLocaleString();
      quitDateElement.textContent = `${formattedQuitDate}`;
    }
  });
}

function updateCountdown() {
    chrome.storage.sync.get("quitDate", ({ quitDate }) => {
      const now = new Date();
      const startDate = new Date(quitDate);
      const diff = now.getTime() - startDate.getTime();
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const totalHours = diff / (60*60*1000);
  
      document.getElementById("days").textContent = days.toString().padStart(2, "0");
      document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
      document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
      document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

      const progressBar = document.getElementById("progressBar");
      const progressPercentage = Math.min((diff / (3*24*60*60*1000)) * 100, 100);
      progressBar.style.width = progressPercentage + "%";

      const progressBarHours = document.getElementById("progressBarHours");
      const progressPercentageHours = Math.min((hours / 24) * 100, 100);
      progressBarHours.style.width = progressPercentageHours + "%";

      const progressBarMinutes = document.getElementById("progressBarMinutes");
      const progressPercentageMinutes = Math.min((minutes / 60) * 100, 100);
      progressBarMinutes.style.width = progressPercentageMinutes + "%";

      const progressBarSeconds = document.getElementById("progressBarSeconds");
      const progressPercentageSeconds = Math.min((seconds / 60) * 100, 100);
      progressBarSeconds.style.width = progressPercentageSeconds + "%";


      const stageElement = document.getElementById("stage");
      let stage = "";
      if (totalHours <= 0) {
        stage = "Stage 0: Preparing to quit";
      }
      if (totalHours > 0 && totalHours < 24) {
        stage = "Stage 1: Can't stop thinking about smoking";
      }
      if (totalHours >= 24 && totalHours < 72) {
        stage = "Stage 2: Withdrawals are peaking";
      }
      if (totalHours >= 72) {
        stage = "Stage 3: Strongest symptoms are over! Yay!";
      }
      stageElement.textContent = stage + " (" + Math.round(totalHours) + "h)";

      

    });
  }
  
  const motivationalQuotes = [
    "On your way to homeostasis!",
    "You're doing great!",
    "Keep it up!",
    "Stay strong!",
    "Believe in yourself!",
    "You can do it!",
    "Every moment counts!",
    "Health is improving!",
    "Be proud of progress!",
    "Pain leads to success!",
    "Embrace the pain!",
    "Pain today, strength tomorrow!",
    "Smoking is your cheating ex!",
    "Smoking's deceiving you!",
    "Stress reduces when you quit!",
    "Healthier life ahead!",
    "Taste and smell improve!",
    "Don't fall for smoke deception!",
    "You deserve better!",
    "Better heart health!",
    "Freedom from smoking!",
    "Savor improved lung capacity!",
    "Chase your dreams!",
    "Nothing can stop you!",
    "Unlock your potential!",
    "Success is within reach!",
    "Rise above challenges!",
    "Create a better future!",
    "Take control of your life!",
    "Seize the day!",
    "Be your own hero!",
    "Trust the process!",
    "Conquer your fears!",
    "Be unstoppable!",
    "Change begins with you!",
    "Embrace impermanence!",
    "Find peace within!",
    "Be mindful, be present!",
    "Cultivate compassion!",
    "Detach from cravings!",
    "Accept life's flow!",
    "Cherish the now!",
    "Let go of attachment!",
    "Seek balance and harmony!",
    "Breathe in, breathe out!",
    "Unleash your potential!",
    "Transform your life!",
    "Resilience is key!",
    "Persevere and overcome!",
    "Find your inner strength!",
    "Rise above adversity!",
    "Better days ahead!",
    "Embrace the journey!",
    "Celebrate small victories!",
    "Keep pushing forward!",
    "Your 30's will be your best!",
    "Your ultimate form awaits!"
  ];
  
  
  
  
  function setRandomMotivationalQuote() {
    const quoteElement = document.getElementById("motivationalQuote");
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    quoteElement.textContent = randomQuote;
  }

  setInterval(updateCountdown, 1000);
  setInterval(displayCurrentQuitDate, 1000);
  setRandomMotivationalQuote();
  setInterval(setRandomMotivationalQuote, 10*60*1000);
  