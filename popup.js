const enabledToggle = document.getElementById("enabledToggle");
const intervalBtns = document.querySelectorAll(".interval-btn");
const stretchNowBtn = document.getElementById("stretchNow");
const streakEl = document.getElementById("streak");
const indicator = document.getElementById("intervalIndicator");
const nextReminderEl = document.getElementById("nextReminder");
const sessionTimeEl = document.getElementById("sessionTime");
const sessionPhraseEl = document.getElementById("sessionPhrase");

const INTERVAL_INDEX = { 15: 0, 30: 1, 45: 2, 60: 3 };

const ENCOURAGING_PHRASES = [
  "A quick stretch does wonders for focus.",
  "Your body will thank you for moving!",
  "Movement is medicine — even a little helps.",
  "Time to give your body some love!",
  "Small movements make a big difference.",
  "Take a breath. Move a little. Feel better.",
  "You deserve a moment to move and recharge.",
  "Stretching now = fewer aches later!",
  "A little stretch goes a long way.",
  "Your future self will thank you for stretching.",
  "Be kind to your body — it works hard for you.",
  "Even 30 seconds of movement can reset your energy.",
  "Your muscles are cheering for a stretch!",
  "A short break now means better focus later.",
  "Your body wasn't built to sit all day — move it!"
];

// Load saved settings
chrome.storage.local.get(["enabled", "intervalMinutes", "streak"], (data) => {
  const enabled = data.enabled !== false;
  const interval = data.intervalMinutes || 30;
  const streak = data.streak || 0;

  enabledToggle.checked = enabled;
  highlightInterval(interval);
  updateStreakDisplay(streak);
});

// Toggle reminders
enabledToggle.addEventListener("change", () => {
  chrome.storage.local.set({ enabled: enabledToggle.checked });
});

// Interval buttons
intervalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const minutes = parseInt(btn.dataset.minutes, 10);
    chrome.storage.local.set({ intervalMinutes: minutes });
    highlightInterval(minutes);
  });
});

// Stretch now
stretchNowBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "triggerNow" });
  window.close();
});

function highlightInterval(minutes) {
  intervalBtns.forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.minutes, 10) === minutes);
  });
  const index = INTERVAL_INDEX[minutes] ?? 1;
  indicator.style.transform = `translateX(${index * 100}%)`;
}

function updateStreakDisplay(streak) {
  if (streak === 0) {
    streakEl.textContent = "No stretches yet";
  } else {
    streakEl.textContent = `${streak} stretch${streak === 1 ? "" : "es"} today`;
  }
}

// Live countdown to next reminder
function updateCountdown() {
  chrome.alarms.get("movemore-reminder", (alarm) => {
    if (!alarm) {
      nextReminderEl.textContent = "Off";
      return;
    }
    const remaining = Math.max(0, alarm.scheduledTime - Date.now());
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    nextReminderEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Session timer & encouraging phrases
function formatActiveTime(ms) {
  const totalMinutes = Math.floor(ms / 60000);
  if (totalMinutes < 1) return "just now";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) return `${mins}m`;
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

function randomPhrase() {
  return ENCOURAGING_PHRASES[Math.floor(Math.random() * ENCOURAGING_PHRASES.length)];
}

sessionPhraseEl.textContent = randomPhrase();
setInterval(() => { sessionPhraseEl.textContent = randomPhrase(); }, 60000);

function updateSessionTimer() {
  chrome.storage.local.get(["activeStartTime", "accumulatedInactiveMs"], (data) => {
    const accumulated = data.accumulatedInactiveMs || 0;
    const currentPeriod = data.activeStartTime ? Date.now() - data.activeStartTime : 0;
    const total = accumulated + currentPeriod;
    sessionTimeEl.textContent = `Inactive for ${formatActiveTime(total)}`;
  });
}
updateSessionTimer();
setInterval(updateSessionTimer, 30000);

// Load today's stretch history
const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");

chrome.storage.local.get("stretchHistory", (data) => {
  const history = data.stretchHistory || {};
  const today = new Date().toISOString().slice(0, 10);

  if (history._date !== today) return;

  const entries = Object.entries(history)
    .filter(([key]) => key !== "_date")
    .sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) return;

  historySection.style.display = "block";

  entries.forEach(([name, count]) => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <span class="history-item-name">${name}</span>
      <span class="history-item-count">${count}x</span>
    `;
    historyList.appendChild(item);
  });
});
