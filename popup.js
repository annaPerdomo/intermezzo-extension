const enabledToggle = document.getElementById("enabledToggle");
const intervalBtns = document.querySelectorAll(".interval-btn:not(.count-btn):not(.mind-btn):not(.video-btn):not(.pause-btn)");
const pauseBtn = document.querySelector(".pause-btn");
const countBtns = document.querySelectorAll(".count-btn");
const mindBtns = document.querySelectorAll(".mind-btn");
const mindIndicator = document.getElementById("mindIndicator");
const videoBtns = document.querySelectorAll(".video-btn");
const videoIndicator = document.getElementById("videoIndicator");
const stretchNowBtn = document.getElementById("stretchNow");
const streakEl = document.getElementById("streak");
const indicator = document.getElementById("intervalIndicator");
const countIndicator = document.getElementById("countIndicator");
const nextReminderEl = document.getElementById("nextReminder");
const sessionTimeEl = document.getElementById("sessionTime");
const sessionPhraseEl = document.getElementById("sessionPhrase");

const notifyToggle = document.getElementById("notifyToggle");
const soundToggle = document.getElementById("soundToggle");

const INTERVAL_INDEX = { 15: 0, 30: 1, 45: 2, 60: 3, 90: 4, 120: 5 };
// "Pause" is the far-right segment of the cadence scale — selecting it stops
// reminders (the same enabled:false state the Reminders toggle drives). Picking
// any numeric interval resumes. currentInterval remembers the chosen cadence so
// resuming from Pause restores it instead of snapping back to a default.
const PAUSE_INDEX = 6;
let currentInterval = 30;
// 0 = "Mix" (random 2–3), sits in the last slot of the track
const COUNT_INDEX = { 1: 0, 2: 1, 3: 2, 0: 3 };
const MIND_INDEX = { off: 0, occasional: 1, always: 2 };
const VIDEO_INDEX = { link: 0, inline: 1 };

// Tolerate the older "gentle"/"more" labels so a saved value still highlights
// the right button after the rename.
function normalizeMind(level) {
  if (level === "gentle") return "occasional";
  if (level === "more") return "always";
  return level || "occasional";
}

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
chrome.storage.local.get(
  ["enabled", "intervalMinutes", "exerciseCount", "streak", "streakDate",
   "reminderStyle", "soundEnabled", "mindLevel", "videoMode"],
  (data) => {
    const enabled = data.enabled !== false;
    const interval = data.intervalMinutes || 30;
    // Default to 1 — a single exercise is the easiest to actually do.
    const count = data.exerciseCount ?? 1;
    // The streak counts today's interludes — yesterday's value reads as 0.
    const today = new Date().toISOString().slice(0, 10);
    const streak = data.streakDate === today ? data.streak || 0 : 0;
    const mindLevel = normalizeMind(data.mindLevel);

    enabledToggle.checked = enabled;
    // "notify" is the default delivery style (works in any app); "auto" opens
    // the break tab straight away.
    notifyToggle.checked = (data.reminderStyle ?? "notify") !== "auto";
    soundToggle.checked = data.soundEnabled !== false;

    currentInterval = interval;
    highlightInterval(interval, !enabled);
    highlightCount(count);
    highlightMind(mindLevel);
    highlightVideo(data.videoMode || "link");
    updateStreakDisplay(streak);
  }
);

// Delivery: notify-first vs open-automatically
notifyToggle.addEventListener("change", () => {
  chrome.storage.local.set({ reminderStyle: notifyToggle.checked ? "notify" : "auto" });
});

// Chime on/off
soundToggle.addEventListener("change", () => {
  chrome.storage.local.set({ soundEnabled: soundToggle.checked });
});

// Toggle reminders — keep the cadence row's "Pause" segment in sync, since both
// controls drive the same enabled state.
enabledToggle.addEventListener("change", () => {
  chrome.storage.local.set({ enabled: enabledToggle.checked });
  highlightInterval(currentInterval, !enabledToggle.checked);
});

// Interval buttons — choosing a cadence also resumes reminders if they were
// Paused, so the picker reads as one scale: 15m … 2hr … Pause.
intervalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const minutes = parseInt(btn.dataset.minutes, 10);
    currentInterval = minutes;
    chrome.storage.local.set({ intervalMinutes: minutes, enabled: true });
    enabledToggle.checked = true;
    highlightInterval(minutes, false);
  });
});

// Pause — the far end of the cadence scale. Stops reminders (same state as the
// Reminders toggle off); the chosen interval is remembered for when you resume.
pauseBtn.addEventListener("click", () => {
  chrome.storage.local.set({ enabled: false });
  enabledToggle.checked = false;
  highlightInterval(currentInterval, true);
});

// Exercises-per-break buttons
countBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const count = parseInt(btn.dataset.count, 10);
    chrome.storage.local.set({ exerciseCount: count });
    highlightCount(count);
  });
});

// Mind-moments level
mindBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const level = btn.dataset.mind;
    chrome.storage.local.set({ mindLevel: level });
    highlightMind(level);
  });
});

// Demo playback: open on YouTube (new tab) vs play inline on the break page
videoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.video;
    chrome.storage.local.set({ videoMode: mode });
    highlightVideo(mode);
  });
});

// Stretch now
stretchNowBtn.addEventListener("click", async () => {
  stretchNowBtn.disabled = true;
  try {
    await chrome.runtime.sendMessage({ action: "triggerNow" });
  } catch {
    // Service worker may have been waking up — retry once. If the retry fails
    // too, still close cleanly rather than leaving the popup stuck disabled.
    try {
      await chrome.runtime.sendMessage({ action: "triggerNow" });
    } catch {}
  }
  window.close();
});

function highlightInterval(minutes, paused = false) {
  intervalBtns.forEach((btn) => {
    btn.classList.toggle("active", !paused && parseInt(btn.dataset.minutes, 10) === minutes);
  });
  pauseBtn.classList.toggle("active", paused);
  const index = paused ? PAUSE_INDEX : (INTERVAL_INDEX[minutes] ?? 1);
  indicator.style.transform = `translateX(${index * 100}%)`;
}

function highlightCount(count) {
  countBtns.forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.count, 10) === count);
  });
  const index = COUNT_INDEX[count] ?? 0;
  countIndicator.style.transform = `translateX(${index * 100}%)`;
}

function highlightMind(level) {
  level = normalizeMind(level);
  mindBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mind === level);
  });
  const index = MIND_INDEX[level] ?? 1;
  mindIndicator.style.transform = `translateX(${index * 100}%)`;
}

function highlightVideo(mode) {
  if (mode !== "link" && mode !== "inline") mode = "link";
  videoBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.video === mode);
  });
  const index = VIDEO_INDEX[mode] ?? 0;
  videoIndicator.style.transform = `translateX(${index * 100}%)`;
}

function updateStreakDisplay(streak) {
  if (streak === 0) {
    streakEl.textContent = "No interludes yet";
  } else {
    streakEl.textContent = `${streak} interlude${streak === 1 ? "" : "s"} today`;
  }
}

// Live countdown to next reminder — whichever fires sooner, the regular
// interval alarm or a pending snooze.
function updateCountdown() {
  Promise.all([
    chrome.alarms.get("intermezzo-reminder"),
    chrome.alarms.get("intermezzo-snooze"),
  ]).then(([main, snooze]) => {
    const alarm = [main, snooze]
      .filter(Boolean)
      .sort((a, b) => a.scheduledTime - b.scheduledTime)[0];
    if (alarm) {
      const remaining = Math.max(0, alarm.scheduledTime - Date.now());
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      nextReminderEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
      return;
    }
    // No alarm — check if paused (idle) or truly off
    chrome.storage.local.get(["enabled", "alarmRemainingMs"], (data) => {
      if (data.enabled === false) {
        nextReminderEl.textContent = "Off";
      } else if (data.alarmRemainingMs != null) {
        const mins = Math.floor(data.alarmRemainingMs / 60000);
        const secs = Math.floor((data.alarmRemainingMs % 60000) / 1000);
        nextReminderEl.textContent = `${mins}:${secs.toString().padStart(2, "0")} (paused)`;
      } else {
        nextReminderEl.textContent = "Off";
      }
    });
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

document.getElementById("footerVersion").textContent = `v${chrome.runtime.getManifest().version}`;
