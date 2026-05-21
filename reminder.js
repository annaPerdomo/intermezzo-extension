// DOM elements
const cardMedia = document.getElementById("cardMedia");
const stretchInfo = document.getElementById("stretchInfo");
const exercisePanel = document.getElementById("exercisePanel");
const timerDisplay = document.getElementById("timer");
const timerRing = document.getElementById("timerRing");
const timerGlow = document.getElementById("timerGlow");
const phaseLabel = document.getElementById("phaseLabel");
const exerciseProgress = document.getElementById("exerciseProgress");
const progressLabel = document.getElementById("progressLabel");
const startBtn = document.getElementById("startBtn");
const skipBtn = document.getElementById("skipBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const activeScreen = document.getElementById("activeScreen");
const doneScreen = document.getElementById("doneScreen");
const doneMessage = document.getElementById("doneMessage");
const motivationalEl = document.getElementById("motivational");
const closeBtn = document.getElementById("closeBtn");

const CIRCUMFERENCE = 2 * Math.PI * 84;

const MOTIVATIONAL_QUOTES = [
  "Small breaks lead to big breakthroughs.",
  "You can\u2019t pour from an empty cup. Rest refills it.",
  "Movement is medicine for the mind.",
  "The best code is written by people who take care of themselves.",
  "Your posture today is your health tomorrow.",
  "A 2-minute break now saves hours of back pain later.",
  "Sitting is the new smoking. You just put it out.",
  "Your future self just sent a thank-you note.",
  "Consistency beats intensity. One stretch at a time.",
  "You showed up for yourself. That\u2019s the hardest part.",
];

// State
let stretches = [];
let currentIndex = 0;
let phases = [];
let currentPhase = 0;
let totalPhaseSeconds = 0;
let remainingSeconds = 0;
let timerInterval = null;
let state = "READY"; // READY, RUNNING, EXERCISE_DONE

// ---------------------------------------------------------------------------
// Duration & phase parsing
// ---------------------------------------------------------------------------

function parseDuration(str) {
  const match = str.match(/(\d+)\s*(second|minute)/i);
  if (!match) return 30;
  const num = parseInt(match[1], 10);
  return match[2].toLowerCase().startsWith("minute") ? num * 60 : num;
}

function parsePhases(stretch) {
  const desc = stretch.description;
  const totalSec = parseDuration(stretch.duration);

  if (
    /per\s+(side|hand|arm|leg)/i.test(desc) ||
    /switch\s+(sides|which)/i.test(desc) ||
    /then\s+switch/i.test(desc) ||
    /other\s+(side|shoulder)/i.test(desc)
  ) {
    const half = Math.round(totalSec / 2);
    return [
      { label: "First side", seconds: half },
      { label: "Other side", seconds: totalSec - half },
    ];
  }

  if (/each\s+direction/i.test(desc)) {
    const half = Math.round(totalSec / 2);
    return [
      { label: "First direction", seconds: half },
      { label: "Other direction", seconds: totalSec - half },
    ];
  }

  if (/both\s+sides/i.test(desc)) {
    const half = Math.round(totalSec / 2);
    return [
      { label: "First side", seconds: half },
      { label: "Other side", seconds: totalSec - half },
    ];
  }

  return [{ label: null, seconds: totalSec }];
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function buildMediaHTML(stretch) {
  const videoId = getVideoId(stretch.name);

  if (videoId) {
    return `
      <div class="video-container" data-video-id="${videoId}">
        <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="${stretch.name} demonstration">
        <div class="video-play-overlay">
          <div class="video-play-btn">
            <svg viewBox="0 0 24 24" fill="#3A4A35"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
    `;
  }

  return `<div class="illustration-wrap">${getStretchSVG(stretch.name)}</div>`;
}

function buildInfoHTML(stretch) {
  return `
    <h2 class="stretch-name">${stretch.name}</h2>
    <hr class="stretch-divider">
    <p class="stretch-description">${stretch.description}</p>
  `;
}

function updateProgressDots() {
  progressLabel.textContent = `Exercise ${currentIndex + 1} of ${stretches.length}`;

  let html = "";
  for (let i = 0; i < stretches.length; i++) {
    const cls =
      i === currentIndex ? "active" : i < currentIndex ? "done" : "";
    html += `<div class="progress-dot ${cls}"></div>`;
  }
  exerciseProgress.innerHTML = html;
}

function updateArrows() {
  prevBtn.disabled = currentIndex === 0 || state === "RUNNING";
  nextBtn.disabled = currentIndex >= stretches.length - 1 || state === "RUNNING";
}

// ---------------------------------------------------------------------------
// Exercise flow
// ---------------------------------------------------------------------------

function showExercise(index) {
  currentIndex = index;
  const stretch = stretches[index];
  phases = parsePhases(stretch);
  currentPhase = 0;
  state = "READY";

  updateProgressDots();
  updateArrows();

  // Animate panel
  exercisePanel.classList.remove("card-enter");
  void exercisePanel.offsetWidth;
  exercisePanel.classList.add("card-enter");

  // Render left column (media)
  cardMedia.innerHTML = buildMediaHTML(stretch);

  // Open video in new tab (iframes blocked on chrome-extension:// pages)
  const videoEl = cardMedia.querySelector(".video-container");
  if (videoEl) {
    videoEl.addEventListener("click", () => {
      const vid = videoEl.dataset.videoId;
      window.open(`https://www.youtube.com/watch?v=${vid}`, "_blank");
    });
  }

  // Render right column (info)
  stretchInfo.innerHTML = buildInfoHTML(stretch);

  // Set up timer for first phase
  setupPhase(0);

  // Reset button
  startBtn.textContent = "Done \u2713";
  startBtn.disabled = false;
  startBtn.style.opacity = "1";
  startBtn.style.cursor = "pointer";
}

function setupPhase(phaseIndex) {
  const phase = phases[phaseIndex];
  totalPhaseSeconds = phase.seconds;
  remainingSeconds = phase.seconds;

  // Reset ring instantly then re-enable transition
  timerRing.style.transition = "none";
  timerGlow.style.transition = "none";
  timerRing.style.strokeDashoffset = CIRCUMFERENCE;
  timerGlow.style.strokeDashoffset = CIRCUMFERENCE;
  void timerRing.offsetWidth;
  timerRing.style.transition = "stroke-dashoffset 1s linear";
  timerGlow.style.transition = "stroke-dashoffset 1s linear";

  updateTimerDisplay();

  if (phase.label) {
    phaseLabel.textContent = phase.label;
    phaseLabel.style.display = "block";
  } else {
    phaseLabel.style.display = "none";
  }
}

function updateTimerDisplay() {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;

  const progress = (totalPhaseSeconds - remainingSeconds) / totalPhaseSeconds;
  const offset = CIRCUMFERENCE * (1 - progress);
  timerRing.style.strokeDashoffset = offset;
  timerGlow.style.strokeDashoffset = offset;
}

function startRunning() {
  state = "RUNNING";
  startBtn.textContent = "Stretching\u2026";
  startBtn.disabled = true;
  startBtn.style.opacity = "0.5";
  startBtn.style.cursor = "default";
  updateArrows();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      onPhaseComplete();
    }
  }, 1000);
}

function onPhaseComplete() {
  currentPhase++;

  if (currentPhase < phases.length) {
    // Switch sides prompt then auto-start
    phaseLabel.textContent = "\u2728 Switch sides";
    phaseLabel.style.display = "block";
    phaseLabel.classList.add("phase-switch-anim");

    setTimeout(() => {
      phaseLabel.classList.remove("phase-switch-anim");
      setupPhase(currentPhase);
      startRunning();
    }, 1800);
  } else {
    onExerciseComplete();
  }
}

function onExerciseComplete() {
  if (currentIndex < stretches.length - 1) {
    // Brief pause then advance to next exercise
    phaseLabel.textContent = "\u2713 Complete";
    phaseLabel.style.display = "block";
    state = "EXERCISE_DONE";
    updateArrows();

    setTimeout(() => {
      exercisePanel.classList.add("card-exit");
      setTimeout(() => {
        exercisePanel.classList.remove("card-exit");
        showExercise(currentIndex + 1);
      }, 250);
    }, 800);
  } else {
    showDone();
  }
}

// ---------------------------------------------------------------------------
// Done screen
// ---------------------------------------------------------------------------

function showDone() {
  activeScreen.classList.add("fade-out");

  setTimeout(() => {
    activeScreen.style.display = "none";
    doneScreen.style.display = "block";
    launchConfetti();
  }, 350);

  chrome.storage.local.get("streak", (data) => {
    const streak = data.streak || 0;
    doneMessage.textContent = `That\u2019s ${streak} stretch break${streak === 1 ? "" : "s"} completed today. Keep it going!`;
  });

  motivationalEl.textContent =
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

// ---------------------------------------------------------------------------
// Confetti
// ---------------------------------------------------------------------------

function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = [
    "#8FA67E", "#A8BC9A", "#D0DFC4",
    "#C4907A", "#D4A894", "#E8D8CB",
    "#6B8A5A", "#F7F3E8",
  ];
  const particles = [];

  for (let i = 0; i < 100; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.38,
      vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
      vy: Math.sin(angle) * speed - 3,
      w: Math.random() * 8 + 4,
      h: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 14,
      gravity: 0.12 + Math.random() * 0.06,
      opacity: 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.007;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }

    if (alive) requestAnimationFrame(animate);
    else canvas.remove();
  }

  requestAnimationFrame(animate);
}

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

startBtn.addEventListener("click", () => {
  if (state === "READY") {
    startRunning();
  }
});

skipBtn.addEventListener("click", () => {
  if (timerInterval) clearInterval(timerInterval);
  chrome.storage.local.get("streak", (data) => {
    const streak = Math.max((data.streak || 1) - 1, 0);
    chrome.storage.local.set({ streak });
  });
  window.close();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0 && state !== "RUNNING") {
    exercisePanel.classList.add("card-exit");
    setTimeout(() => {
      exercisePanel.classList.remove("card-exit");
      showExercise(currentIndex - 1);
    }, 250);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < stretches.length - 1 && state !== "RUNNING") {
    exercisePanel.classList.add("card-exit");
    setTimeout(() => {
      exercisePanel.classList.remove("card-exit");
      showExercise(currentIndex + 1);
    }, 250);
  }
});

closeBtn.addEventListener("click", () => {
  window.close();
});

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

chrome.storage.local.get("currentStretches", (data) => {
  stretches = data.currentStretches || [];
  if (stretches.length > 0) {
    showExercise(0);
  }
});
