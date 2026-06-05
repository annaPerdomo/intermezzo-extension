// ---------------------------------------------------------------------------
// Zen chime — singing bowl sound via Web Audio API
// ---------------------------------------------------------------------------

function playChime(volume = 0.35) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);

  // Singing bowl harmonics — tuned to a warm, resonant tone
  const tones = [
    { freq: 432,  gain: 0.28, decay: 3.2, type: "sine" },     // fundamental
    { freq: 864,  gain: 0.10, decay: 2.2, type: "sine" },     // 2nd harmonic
    { freq: 1296, gain: 0.04, decay: 1.4, type: "sine" },     // 3rd harmonic
    { freq: 324,  gain: 0.12, decay: 3.8, type: "sine" },     // warm sub-tone
    { freq: 436,  gain: 0.08, decay: 3.0, type: "sine" },     // slight detune for shimmer
  ];

  tones.forEach(({ freq, gain, decay, type }) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;

    // Soft attack, long exponential decay
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(gain, now + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.connect(env);
    env.connect(master);
    osc.start(now);
    osc.stop(now + decay + 0.1);
  });

  setTimeout(() => ctx.close(), 5000);
}

function playCompletionChime() {
  // Two gentle chimes in sequence for the final "done" moment
  playChime(0.3);
  setTimeout(() => playChime(0.25), 600);
}

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
const subtitleEl = document.getElementById("subtitle");
const closeBtn = document.getElementById("closeBtn");
const newStretchBtn = document.getElementById("newStretchBtn");
const statExercises = document.getElementById("statExercises");
const statExercisesLabel = document.getElementById("statExercisesLabel");
const statMinutes = document.getElementById("statMinutes");
const statMinutesLabel = document.getElementById("statMinutesLabel");
const statBreaks = document.getElementById("statBreaks");
const statBreaksLabel = document.getElementById("statBreaksLabel");

const CIRCUMFERENCE = 2 * Math.PI * 84;

const MOTIVATIONAL_QUOTES = [
  "That was a lovely little pause. Hope it felt nice.",
  "Look at you, taking a moment for yourself.",
  "Your body appreciates that more than you know.",
  "A small stretch, a deep breath. Sometimes that\u2019s all you need.",
  "Hope your shoulders feel a little lighter now.",
  "You\u2019re doing a really good job today. Just thought you should hear that.",
  "What a nice way to spend a couple of minutes.",
  "Notice how a few deep breaths can quiet everything down.",
  "That little bit of movement goes a long way.",
  "One gentle moment at a time. You\u2019ve got this.",
  "Doesn\u2019t it feel good to just slow down for a second?",
  "A quiet stretch in the middle of a busy day. How nice.",
  "Your body says thank you. And so do we.",
  "Carry that calm feeling with you into whatever comes next.",
  "Sometimes the smallest pause makes the biggest difference.",
  "Hey, you showed up for yourself just now. That\u2019s a beautiful thing.",
  "Imagine if everyone took a moment like you just did. The world would be a softer place.",
  "You just turned two minutes into something really kind.",
  "That felt good, didn\u2019t it? You can always come back for more.",
  "Somewhere in your body, a little knot just said goodbye.",
  "You didn\u2019t have to do that. But you did. And that\u2019s wonderful.",
  "If today is being a lot, just know this was a really good thing you did.",
  "The best part of your day might just be the parts where you slow down.",
  "You\u2019re a little more relaxed now than you were two minutes ago. That counts.",
  "There\u2019s something really lovely about choosing to be still for a moment.",
  "Rest isn\u2019t a reward. It\u2019s just a nice thing you can give yourself anytime.",
  "Your future self is going to feel that stretch. In a good way.",
  "That was time well spent. Not productive. Just\u2026 well spent.",
  "A little gentleness in the middle of the day. You deserve that.",
  "You just did something really simple and really important at the same time.",
];

const SUBTITLE_PHRASES = [
  "This is your moment. Take it slow.",
  "A little stretch can make a big difference in your day.",
  "Your body has been working hard. Let\u2019s give it a nice break.",
  "You\u2019ve been at it for a while. How about a gentle reset?",
  "Just a couple of minutes. You\u2019ll feel so much better.",
  "Think of this as a little gift to yourself.",
  "Everything else can wait. This is your time.",
  "You showed up for yourself. That\u2019s already wonderful.",
  "Take a breath. Stretch it out. You\u2019ve got nowhere else to be right now.",
  "Even a short pause can make your whole day feel different.",
  "Hey, you. Yes, you. Time to be kind to your body for a minute.",
  "The best thing you can do right now is exactly this.",
  "Let\u2019s shake off some of that tension, shall we?",
  "A few minutes of gentle movement. That\u2019s all this is.",
  "Your shoulders called. They\u2019d like a break.",
  "Pause, breathe, stretch. The simplest kind of self-care.",
  "Here\u2019s a little break, just for you.",
  "Whatever you were doing, it\u2019ll still be there in two minutes. Promise.",
  "This is the easy part. Just follow along and breathe.",
  "Ready to feel a little more like yourself?",
];

subtitleEl.textContent = SUBTITLE_PHRASES[Math.floor(Math.random() * SUBTITLE_PHRASES.length)];

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

  // Extract per-hold duration from description (e.g. "Hold for 15 seconds")
  const holdMatch = desc.match(/hold\b[^.]*?(\d+)\s*seconds?/i);
  const holdSec = holdMatch ? parseInt(holdMatch[1], 10) : null;

  // Extract rep count (e.g. "Repeat 3 times", "Repeat twice")
  let reps = null;
  const repeatMatch = desc.match(/repeat\s+(?:\w+\s+)*?(twice|thrice|three|four|five|six|\d+)\s*times?/i);
  if (repeatMatch) {
    const word = repeatMatch[1].toLowerCase();
    const wordMap = { twice: 2, thrice: 3, three: 3, four: 4, five: 5, six: 6 };
    reps = wordMap[word] || parseInt(word, 10);
  }

  // Detect side-switching
  const hasSides =
    /per\s+(side|hand|arm|leg)/i.test(desc) ||
    /switch\s+(sides|which)/i.test(desc) ||
    /then\s+switch/i.test(desc) ||
    /other\s+(side|shoulder)/i.test(desc) ||
    /both\s+sides/i.test(desc) ||
    /do\s+both/i.test(desc);

  // Detect direction-switching
  const hasDirections = /each\s+direction/i.test(desc);

  // Determine body-part labels for sides
  let sideA = "Right side";
  let sideB = "Left side";
  if (/per\s+hand/i.test(desc)) { sideA = "Right hand"; sideB = "Left hand"; }
  else if (/per\s+arm/i.test(desc)) { sideA = "Right arm"; sideB = "Left arm"; }
  else if (/per\s+leg/i.test(desc)) { sideA = "Right leg"; sideB = "Left leg"; }

  // Side-switching exercises — use per-side hold time if available
  if (hasSides) {
    const perSide = holdSec || Math.round(totalSec / 2);
    return [
      { label: sideA, seconds: perSide, type: "side" },
      { label: sideB, seconds: perSide, type: "side" },
    ];
  }

  // Direction exercises
  if (hasDirections) {
    const half = Math.round(totalSec / 2);
    return [
      { label: "First direction", seconds: half, type: "direction" },
      { label: "Other direction", seconds: totalSec - half, type: "direction" },
    ];
  }

  // Rep-based holds — only create guided rounds for substantial holds (≥8s)
  // with a manageable number of reps (2–6). Quick reps like "hold 3s × 8"
  // stay as a single timed phase.
  if (holdSec && holdSec >= 8 && reps && reps >= 2 && reps <= 6) {
    const result = [];
    for (let i = 0; i < reps; i++) {
      result.push({
        label: `Round ${i + 1} of ${reps}`,
        seconds: holdSec,
        type: "rep",
      });
    }
    return result;
  }

  return [{ label: null, seconds: totalSec, type: "single" }];
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
  // A single exercise needs no counter or dots — keep it calm and uncluttered.
  if (stretches.length <= 1) {
    progressLabel.textContent = "A gentle moment to move";
    exerciseProgress.innerHTML = "";
    return;
  }

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
  // With a single exercise there's nowhere to navigate — hide the arrows entirely.
  const single = stretches.length <= 1;
  prevBtn.style.display = single ? "none" : "";
  nextBtn.style.display = single ? "none" : "";

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

  // Open video in new tab
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
  startBtn.textContent = "Begin";
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
    let text = phase.label;
    // Add position counter for side/direction phases
    if ((phase.type === "side" || phase.type === "direction") && phases.length > 1) {
      text += ` \u00b7 ${phaseIndex + 1} of ${phases.length}`;
    }
    phaseLabel.textContent = text;
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
  playChime(0.25);
  currentPhase++;

  if (currentPhase < phases.length) {
    const nextPhase = phases[currentPhase];
    let transitionText, delay;

    if (nextPhase.type === "side") {
      transitionText = "Switch sides";
      delay = 2000;
    } else if (nextPhase.type === "direction") {
      transitionText = "Switch direction";
      delay = 2000;
    } else if (nextPhase.type === "rep") {
      transitionText = "Rest \u2014 next round";
      delay = 2500;
    } else {
      transitionText = "Next";
      delay = 1500;
    }

    phaseLabel.textContent = "\u2728 " + transitionText;
    phaseLabel.style.display = "block";
    phaseLabel.classList.add("phase-switch-anim");

    setTimeout(() => {
      phaseLabel.classList.remove("phase-switch-anim");
      setupPhase(currentPhase);
      startRunning();
    }, delay);
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
  playCompletionChime();

  // Let the background ping the accountability webhook (Discord/Slack), if the
  // user set one up. Fire-and-forget — never block the celebration on it.
  chrome.runtime.sendMessage({ action: "breakCompleted" }).catch(() => {});

  activeScreen.classList.add("fade-out");

  setTimeout(() => {
    activeScreen.style.display = "none";
    doneScreen.style.display = "flex";
    launchConfetti();
  }, 350);

  // Stat chips \u2014 what you just did
  const exCount = stretches.length;
  statExercises.textContent = exCount;
  statExercisesLabel.textContent = exCount === 1 ? "Exercise" : "Exercises";

  const totalSeconds = stretches.reduce((sum, s) => sum + parseDuration(s.duration), 0);
  const mins = Math.max(1, Math.round(totalSeconds / 60));
  statMinutes.textContent = mins;
  statMinutesLabel.textContent = mins === 1 ? "Minute moved" : "Minutes moved";

  // A warm, rotating note in the sub spot
  doneMessage.textContent =
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  chrome.storage.local.get("streak", (data) => {
    const streak = data.streak || 0;
    statBreaks.textContent = streak;
    statBreaksLabel.textContent = streak === 1 ? "Break today" : "Breaks today";
    motivationalEl.textContent =
      streak <= 1
        ? "Your first break today \u2014 a gentle place to begin."
        : `That\u2019s ${streak} moments you\u2019ve chosen yourself today.`;
  });
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

// "New stretch" — pull a fresh set and run the break again without leaving.
newStretchBtn.addEventListener("click", () => {
  newStretchBtn.disabled = true;

  const restart = (fresh) => {
    if (fresh && fresh.length) stretches = fresh;
    doneScreen.style.display = "none";
    activeScreen.classList.remove("fade-out");
    activeScreen.style.display = "";
    subtitleEl.textContent =
      SUBTITLE_PHRASES[Math.floor(Math.random() * SUBTITLE_PHRASES.length)];
    currentIndex = 0;
    state = "READY";
    showExercise(0);
    window.scrollTo(0, 0);
    newStretchBtn.disabled = false;
  };

  chrome.runtime
    .sendMessage({ action: "newStretches" })
    .then((res) => restart(res && res.stretches))
    .catch(() => restart(null)); // fall back to replaying the current set
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
