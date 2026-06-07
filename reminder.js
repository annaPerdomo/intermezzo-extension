// ---------------------------------------------------------------------------
// Cello chime — a warm, bowed-string voice via Web Audio API. The rebrand
// retired the singing bowl for something that sounds like a comforting cello:
// detuned sawtooths through a mellow low-pass for the body, a sub-octave sine
// for warmth, gentle vibrato, and a slow bowed swell into a long release.
// ---------------------------------------------------------------------------

// One bowed-cello note. Returns the time (seconds, ctx clock) it finishes, so
// callers can schedule overlapping notes and know when to close the context.
function playCelloVoice(ctx, master, freq, startAt, opts = {}) {
  const attack  = opts.attack  ?? 0.16;   // slow bow onset
  const sustain = opts.sustain ?? 0.85;   // held body
  const release = opts.release ?? 1.4;    // long, soft tail
  const peak    = (opts.gain ?? 1) * (opts.peak ?? 0.85);
  const cutoff  = opts.cutoff ?? Math.min(2600, freq * 6 + 480);
  const end     = startAt + attack + sustain + release;

  // Amplitude: gentle swell up, hold, long exponential release.
  const vca = ctx.createGain();
  vca.gain.setValueAtTime(0.0001, startAt);
  vca.gain.exponentialRampToValueAtTime(peak, startAt + attack);
  vca.gain.setValueAtTime(peak, startAt + attack + sustain);
  vca.gain.exponentialRampToValueAtTime(0.0001, end);

  // Mellow low-pass tames the sawtooth edge into a warm cello body; the cutoff
  // opens a little as the bow settles.
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 0.7;
  lp.frequency.setValueAtTime(cutoff * 0.55, startAt);
  lp.frequency.linearRampToValueAtTime(cutoff, startAt + attack + 0.12);
  lp.connect(vca);
  vca.connect(master);

  // Gentle vibrato — the shimmer of a bowed string.
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 5.1;
  lfoGain.gain.value = freq * 0.006;
  lfo.connect(lfoGain);

  // Two slightly detuned saws (chorus/body) + a quiet sub-octave sine (warmth).
  const partials = [
    { type: "sawtooth", detune: -5, octave: 1,   level: 0.40 },
    { type: "sawtooth", detune: 6,  octave: 1,   level: 0.40 },
    { type: "sine",     detune: 0,  octave: 0.5, level: 0.42 },
  ];
  partials.forEach((p) => {
    const osc = ctx.createOscillator();
    osc.type = p.type;
    osc.frequency.value = freq * p.octave;
    osc.detune.value = p.detune;
    lfoGain.connect(osc.frequency);
    const g = ctx.createGain();
    g.gain.value = p.level;
    osc.connect(g);
    g.connect(lp);
    osc.start(startAt);
    osc.stop(end + 0.05);
  });
  lfo.start(startAt);
  lfo.stop(end + 0.05);

  return end;
}

function newCelloContext(volume) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = volume;
  // A soft compressor glues the overlapping voices and guards against clipping.
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp);
  comp.connect(ctx.destination);
  return { ctx, master };
}

function playChime(volume = 0.32) {
  const { ctx, master } = newCelloContext(volume);
  const now = ctx.currentTime;

  // A warm open fifth (D3 + A3) — a comforting cello double-stop, the second
  // note entering a beat later like a bow settling onto the string.
  let end = playCelloVoice(ctx, master, 146.83, now, { gain: 0.55 });
  end = Math.max(end, playCelloVoice(ctx, master, 220.0, now + 0.13, { gain: 0.45 }));

  setTimeout(() => ctx.close(), Math.max(2500, (end - now + 0.4) * 1000));
}

function playCompletionChime() {
  const { ctx, master } = newCelloContext(0.3);
  const now = ctx.currentTime;

  // A soft, resolving D-major chord — cello voices swelling in one after another
  // and settling together. A warm "beautifully done" cadence.
  const notes = [
    { f: 146.83, t: 0.0,  g: 0.5 },  // D3
    { f: 220.0,  t: 0.18, g: 0.42 }, // A3
    { f: 293.66, t: 0.36, g: 0.42 }, // D4
    { f: 369.99, t: 0.54, g: 0.34 }, // F#4
  ];
  let end = now;
  notes.forEach((n) => {
    end = Math.max(
      end,
      playCelloVoice(ctx, master, n.f, now + n.t, { gain: n.g, sustain: 1.2, release: 1.9 })
    );
  });

  setTimeout(() => ctx.close(), Math.max(3200, (end - now + 0.5) * 1000));
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
const timerArea = document.querySelector(".timer-area");
const doneBtn = document.getElementById("doneBtn");
const skipBtn = document.getElementById("skipBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const rerollBtn = document.getElementById("rerollBtn");
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

// ---------------------------------------------------------------------------
// Music glyphs — accurate Noto Music outlines (crisp, recolorable, offline).
// Quarter rest is the brand mark; fermata is the recurring divider motif;
// notes & beams decorate the completion moment.
// ---------------------------------------------------------------------------

const MUSIC_GLYPHS = {
  quarterRest:      { vb: "51 -878 256 755",  d: "M104-878L147-878L307-683Q257-624 230-581Q203-538 203-494L203-494Q203-457 227-416.50Q251-376 303-314L303-314L287-292Q243-320 205-320L205-320Q177-320 163-301.50Q149-283 149-257L149-257Q149-225 162.50-196.50Q176-168 199-142L199-142L186-123Q117-173 84-214Q51-255 51-303L51-303Q51-346 78-366Q105-386 143-386L143-386Q173-386 221-363L221-363L221-365L67-570Q168-659 168-736L168-736Q168-797 104-878L104-878Z" },
  quarterNote:      { vb: "51 -563 180 549",  d: "M194-148L194-563L231-563L231-148Q231-88 195.50-51Q160-14 107-14L107-14Q79-14 65-27.50Q51-41 51-63L51-63Q51-89 65-110Q79-131 102-144Q125-157 150-157L150-157Q172-157 194-148L194-148Z" },
  eighthNote:       { vb: "51 -563 308 549",  d: "M194-148L194-563L231-563L231-514L305-420Q333-386 346-346Q359-306 359-265L359-265Q359-191 313-133L313-133L290-133Q318-193 318-254L318-254Q318-293 305-323.50Q292-354 272-373Q252-392 231-395L231-395L231-148Q231-88 195.50-51Q160-14 107-14L107-14Q79-14 65-27.50Q51-41 51-63L51-63Q51-89 65-110Q79-131 102-144Q125-157 150-157L150-157Q172-157 194-148L194-148Z" },
  beamedEighths:    { vb: "51 -566 484 587",  d: "M499-113L499-451L230-486L230-157Q230-100 196.50-62Q163-24 107-24L107-24Q51-24 51-72L51-72Q51-96 64-117.50Q77-139 99-152.50Q121-166 147-166L147-166Q172-166 194-157L194-157L194-566L535-521L535-113Q535-72 517-41.50Q499-11 471.50 5Q444 21 413 21L413 21Q357 21 357-28L357-28Q357-68 387-95Q417-122 455-122L455-122Q478-122 499-113L499-113Z" },
  beamedSixteenths: { vb: "51 -566 484 587",  d: "M535-566L535-158Q535-116 517-86Q499-56 471.50-40Q444-24 413-24L413-24Q357-24 357-73L357-73Q357-113 387-140Q417-167 455-167L455-167Q478-167 499-158L499-158L499-377L230-304L230-112Q230-55 196.50-17Q163 21 107 21L107 21Q79 21 65 8Q51-5 51-27L51-27Q51-51 64-72.50Q77-94 99-107.50Q121-121 147-121L147-121Q172-121 194-112L194-112L194-479L535-566ZM230-422L230-366L499-439L499-496L230-422Z" },
  fermata:          { vb: "50 -1000 658 352", d: "M708-648L673-648Q671-698 646-743Q621-788 579.50-823Q538-858 486-878Q434-898 378-898L378-898Q324-898 272.50-879Q221-860 179-825.50Q137-791 111-746Q85-701 83-648L83-648L50-648Q57-720 83-783.50Q109-847 152-896Q195-945 252-972.50Q309-1000 378-1000L378-1000Q447-1000 505.50-971.50Q564-943 607.50-894Q651-845 677-781.50Q703-718 708-648L708-648ZM378-648L378-648Q353-648 337-662Q321-676 321-699L321-699Q321-719 337.50-732.50Q354-746 378-746L378-746Q401-746 417-731.50Q433-717 433-699L433-699Q433-676 417-662Q401-648 378-648Z" },
};

function glyphSVG(name, height, opts = {}) {
  const g = MUSIC_GLYPHS[name];
  if (!g) return "";
  const p = g.vb.split(" ").map(Number);
  const w = +(height * (p[2] / p[3])).toFixed(1);
  const color = opts.color || "var(--moss)";
  const cls = opts.cls ? ` class="${opts.cls}"` : "";
  return `<svg${cls} width="${w}" height="${height}" viewBox="${g.vb}" fill="none" aria-hidden="true"><path d="${g.d}" fill="${color}"/></svg>`;
}

// Paint the static brand marks once the overlay loads: the fermata dividers,
// the quarter-rest completion emblem, and the ambient glyph texture.
function renderBrandGlyphs() {
  // Each staff divider renders whichever glyph it names. The header carries the
  // fermata ("hold this moment"); the footer carries an eighth note — matching
  // the prototype. Per-glyph heights keep them visually balanced in the rule.
  const dividerHeights = { fermata: 16, eighthNote: 26, quarterNote: 26 };
  document.querySelectorAll(".staff-divider [data-glyph]").forEach((el) => {
    const name = el.dataset.glyph;
    el.innerHTML = glyphSVG(name, dividerHeights[name] || 16, { color: "var(--moss)" });
  });
  document.querySelectorAll('[data-glyph="quarter-rest"]').forEach((el) => {
    el.innerHTML = glyphSVG("quarterRest", 52, { color: "var(--forest)" });
  });

  const deco = document.querySelector(".completion-deco");
  if (deco) {
    deco.innerHTML =
      glyphSVG("eighthNote", 132, { cls: "cd cd-1" }) +
      glyphSVG("beamedEighths", 150, { cls: "cd cd-2" }) +
      glyphSVG("quarterNote", 104, { cls: "cd cd-3" }) +
      glyphSVG("fermata", 120, { cls: "cd cd-4" }) +
      glyphSVG("beamedSixteenths", 112, { cls: "cd cd-5" });
  }

  const chipGlyphs = ["beamedEighths", "quarterNote", "quarterRest"];
  document.querySelectorAll(".stat-chip").forEach((chip, i) => {
    chip.insertAdjacentHTML(
      "beforeend",
      glyphSVG(chipGlyphs[i % chipGlyphs.length], 64, { cls: "chip-deco" })
    );
  });
}

renderBrandGlyphs();

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
  // Self-compassion — for the days that are heavier than they look.
  "If a friend felt how you feel right now, you'd be gentle with them. Try giving yourself that too.",
  "You're doing better than the hard days tell you. Showing up here is proof.",
  "Whatever kind of day this is, you're allowed to be kind to yourself in it.",
  "You don't have to earn rest. You just took some, and that's allowed.",
  "Some days, getting through is the whole achievement. This counts.",
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
let state = "READY"; // READY, RUNNING, PAUSED, COMPLETE
// Which exercises have been carried all the way through — drives the dots so a
// finished exercise still reads as "done" even though we no longer auto-advance.
const completed = new Set();

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
  // Mind moments don't get a stretch illustration — they get a soft, breathing
  // fermata (the "hold this moment" mark) to rest your eyes on while you settle.
  if (stretch.type === "mind") {
    return `
      <div class="mind-visual">
        <span class="mind-orb"></span>
        ${glyphSVG("fermata", 56, { cls: "mind-mark", color: "var(--moss)" })}
      </div>
    `;
  }

  return `
    <div class="illustration-wrap">${getStretchVisual(stretch.name)}</div>
    ${buildVideoLinkHTML(stretch)}
  `;
}

function buildInfoHTML(stretch) {
  // The check-in is an interactive mind card: a savoring note + mood scale,
  // wired up after render by wireCheckInCard().
  if (stretch.isCheckIn) {
    const cue = stretch.cue ? `<span class="mind-eyebrow">${stretch.cue}</span>` : "";
    return `
      ${cue}
      <h2 class="stretch-name">${stretch.name}</h2>
      <hr class="stretch-divider">
      <div class="mind-block savoring" id="savoringBlock">
        <p class="mind-q">One thing — however tiny — that went okay since your last break?</p>
        <div class="savoring-row">
          <input type="text" id="savoringInput" class="savoring-input"
                 placeholder="Even something small counts…" autocomplete="off" maxlength="200">
          <button class="mind-mini-btn" id="savoringSave">Keep it</button>
        </div>
        <span class="savoring-confirm" id="savoringConfirm" hidden>Kept — just for you.</span>
      </div>
      <div class="mind-block mood-checkin" id="moodBlock">
        <p class="mind-q">And how are you feeling right now?</p>
        <div class="mood-scale" id="moodScale" role="group" aria-label="How are you feeling?">
          <button class="mood-dot" data-mood="1" aria-label="Having a really hard time"></button>
          <button class="mood-dot" data-mood="2" aria-label="Low"></button>
          <button class="mood-dot" data-mood="3" aria-label="Okay"></button>
          <button class="mood-dot" data-mood="4" aria-label="Pretty good"></button>
          <button class="mood-dot" data-mood="5" aria-label="Good"></button>
        </div>
        <div class="mood-ends">
          <span>Having a hard time</span>
          <span>Doing okay</span>
        </div>
        <span class="mood-confirm" id="moodConfirm" hidden>Thank you for checking in.</span>
      </div>
      <div class="support-note" id="supportNote" hidden>
        <p class="support-text">
          It looks like things have felt heavy for a little while. If it would help to
          talk to a real person, support is there — and reaching out is a strong, kind
          thing to do for yourself.
        </p>
        <div class="support-actions">
          <a class="support-link" id="supportLink"
             href="https://findahelpline.com" target="_blank" rel="noopener">Find someone to talk to</a>
          <button class="support-dismiss" id="supportDismiss">I'm okay for now</button>
        </div>
      </div>
    `;
  }

  // Mind moments lead with a soft cue and read as an invitation, not a drill.
  if (stretch.type === "mind") {
    const cue = stretch.cue ? `<span class="mind-eyebrow">${stretch.cue}</span>` : "";
    return `
      ${cue}
      <h2 class="stretch-name">${stretch.name}</h2>
      <hr class="stretch-divider">
      <p class="stretch-description mind-prompt">${stretch.description}</p>
    `;
  }

  return `
    <h2 class="stretch-name">${stretch.name}</h2>
    <hr class="stretch-divider">
    <p class="stretch-description">${stretch.description}</p>
  `;
}

// An optional YouTube how-to demo, shown beneath the diagram with full credit to
// the creator. The diagram stays the primary guide; this only renders when a
// video has been curated for this exercise. Opens in a new tab — never embedded.
function buildVideoLinkHTML(stretch) {
  const video = typeof getStretchVideo === "function" ? getStretchVideo(stretch.name) : null;
  if (!video) return "";
  const credit = video.creator
    ? `<span class="mvl-credit">Demonstration by ${escapeHTML(video.creator)}</span>`
    : "";
  return `
    <a class="media-video-link" href="${escapeHTML(video.url)}" target="_blank" rel="noopener noreferrer"
       title="Watch a demonstration of this stretch on YouTube">
      <span class="yt-badge" aria-hidden="true"><span class="yt-tri"></span></span>
      <span class="mvl-text">
        <span class="mvl-title">Watch a demo on YouTube <span class="mvl-out" aria-hidden="true">&#8599;</span></span>
        ${credit}
      </span>
    </a>
  `;
}

// Small escaper for any creator-supplied strings rendered via innerHTML.
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
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
      i === currentIndex ? "active" : completed.has(i) ? "done" : "";
    html += `<div class="progress-dot ${cls}"></div>`;
  }
  exerciseProgress.innerHTML = html;
}

function updateArrows() {
  // With a single exercise there's nowhere to navigate — hide the arrows entirely.
  const single = stretches.length <= 1;
  prevBtn.style.display = single ? "none" : "";
  nextBtn.style.display = single ? "none" : "";

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= stretches.length - 1;
}

// The bottom primary button steps through the break: "Next" while there are more
// exercises, "Finish" on the last one — so it never silently ends a multi-
// exercise break from the middle.
function updatePrimaryAction() {
  const isLast = currentIndex >= stretches.length - 1;
  doneBtn.innerHTML = isLast ? "Finish &#x2713;" : "Next &#x203a;";
}

// ---------------------------------------------------------------------------
// Exercise flow
// ---------------------------------------------------------------------------

function showExercise(index) {
  // Leaving an exercise always stops its timer — navigation resets the clock.
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  currentIndex = index;
  const stretch = stretches[index];
  const isMind = stretch.type === "mind";
  phases = parsePhases(stretch);
  currentPhase = 0;
  state = "READY";

  // Mind moments get a softer treatment (calmer panel, gentler copy).
  exercisePanel.classList.toggle("mind-card", isMind);

  updateProgressDots();
  updateArrows();
  updatePrimaryAction();

  // Animate panel
  exercisePanel.classList.remove("card-enter");
  void exercisePanel.offsetWidth;
  exercisePanel.classList.add("card-enter");

  // Render left column (media)
  cardMedia.innerHTML = buildMediaHTML(stretch);

  // Render right column (info)
  stretchInfo.innerHTML = buildInfoHTML(stretch);

  if (isMind) {
    // Mindfulness moments aren't timed — there's nothing to count down. Hide the
    // timer ring and the Start/Reroll controls; sitting with the prompt at your
    // own pace is the whole exercise. When finished with everything, the "Done"
    // button below wraps up the break.
    if (stretch.isCheckIn) wireCheckInCard();
    timerArea.style.display = "none";
    return;
  }

  // Body stretches keep the timer.
  timerArea.style.display = "";

  // Set up timer for first phase
  setupPhase(0);

  // Reset the in-card Start control to a fresh, ready state.
  startBtn.textContent = "Start";
  startBtn.hidden = false;
  startBtn.disabled = false;

  // Reroll is offered for body stretches only — mind moments aren't swapped.
  rerollBtn.style.display = "inline-flex";
  rerollBtn.disabled = false;
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
  startBtn.textContent = "Pause";
  startBtn.hidden = false;
  startBtn.disabled = false;
  rerollBtn.disabled = true; // no swapping mid-stretch
  updateArrows();
  tick();
}

function tick() {
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

// Pause the in-card timer, leaving it ready to resume from where it stopped.
function pauseRunning() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  state = "PAUSED";
  startBtn.textContent = "Resume";
  rerollBtn.disabled = false;
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
  // The exercise is finished. We no longer auto-advance \u2014 the person moves on
  // with the arrows/dots when they're ready, or taps "Done" to wrap the break.
  state = "COMPLETE";
  completed.add(currentIndex);

  phaseLabel.textContent = "\u2713 Complete";
  phaseLabel.style.display = "block";

  startBtn.hidden = true; // nothing left to start for this one
  rerollBtn.disabled = false;

  updateProgressDots();
  updateArrows();
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

  // Stat chips \u2014 what you just did. Mind moments are part of the break but
  // aren't "movement", so they don't count toward the exercise/minutes tallies.
  const bodyStretches = stretches.filter((s) => s.type !== "mind");
  const exCount = bodyStretches.length;
  statExercises.textContent = exCount;
  statExercisesLabel.textContent = exCount === 1 ? "Exercise" : "Exercises";

  const totalSeconds = bodyStretches.reduce((sum, s) => sum + parseDuration(s.duration), 0);
  const mins = Math.max(1, Math.round(totalSeconds / 60));
  statMinutes.textContent = mins;
  statMinutesLabel.textContent = mins === 1 ? "Minute moved" : "Minutes moved";

  // A warm, rotating note in the sub spot
  doneMessage.textContent =
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  chrome.storage.local.get("streak", (data) => {
    const streak = data.streak || 0;
    statBreaks.textContent = streak;
    statBreaksLabel.textContent = streak === 1 ? "Interlude today" : "Interludes today";
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
    "#8A93B2", "#AAB2CC", "#4E5A86",
    "#C08A86", "#E8D8CB", "#D9C38C",
    "#A98A6F", "#FBF8F3",
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

// The in-card Start control: Start → Pause → Resume, all within the overlay.
startBtn.addEventListener("click", () => {
  if (state === "READY" || state === "PAUSED") {
    startRunning();
  } else if (state === "RUNNING") {
    pauseRunning();
  }
});

// The bottom primary button advances through the break, then finishes on the
// last exercise — showing the pride moment. It never ends a multi-exercise break
// from the middle; "Skip for now" is the early exit. People don't have to run
// every timer to the end.
doneBtn.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  completed.add(currentIndex); // moving on counts this exercise as done

  if (currentIndex >= stretches.length - 1) {
    showDone();
  } else {
    goToExercise(currentIndex + 1);
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

// Navigate freely — moving away just resets that exercise's timer.
function goToExercise(index) {
  if (index < 0 || index >= stretches.length || index === currentIndex) return;
  exercisePanel.classList.add("card-exit");
  setTimeout(() => {
    exercisePanel.classList.remove("card-exit");
    showExercise(index);
  }, 250);
}

prevBtn.addEventListener("click", () => goToExercise(currentIndex - 1));
nextBtn.addEventListener("click", () => goToExercise(currentIndex + 1));

// Dots are a shortcut straight to any exercise in the set.
exerciseProgress.addEventListener("click", (e) => {
  const dot = e.target.closest(".progress-dot");
  if (!dot) return;
  const dots = Array.from(exerciseProgress.children);
  goToExercise(dots.indexOf(dot));
});

// Reroll — swap the current stretch for a different one not already in the
// break. Background scores a replacement; the card re-renders fresh and ready.
rerollBtn.addEventListener("click", () => {
  if (state === "RUNNING") return;
  const stretch = stretches[currentIndex];
  if (!stretch || stretch.type === "mind") return;

  rerollBtn.disabled = true;
  rerollBtn.classList.add("spin");
  setTimeout(() => rerollBtn.classList.remove("spin"), 600);

  const exclude = stretches.map((s) => s.name);
  chrome.runtime
    .sendMessage({ action: "rerollStretch", exclude })
    .then((res) => {
      if (res && res.ok && res.stretch) {
        stretches[currentIndex] = res.stretch;
        completed.delete(currentIndex); // a fresh stretch starts uncompleted
        chrome.storage.local.set({ currentStretches: stretches });
        showExercise(currentIndex);
      } else {
        // No alternative available — just settle the button back.
        rerollBtn.disabled = false;
      }
    })
    .catch(() => {
      rerollBtn.disabled = false;
    });
});

closeBtn.addEventListener("click", () => {
  window.close();
});

// "New stretch" — pull a fresh set and run the break again without leaving.
newStretchBtn.addEventListener("click", () => {
  newStretchBtn.disabled = true;

  const restart = (fresh) => {
    if (fresh && fresh.length) stretches = fresh;
    completed.clear();
    resetCheckInState(); // fresh break — a new check-in

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
// Mind check-in card — savoring + mood, rendered as a mind exercise in the break
// flow. Optional, on-device only. The card is rebuilt via innerHTML on every
// navigation, so we (re)wire it on render and remember what was entered this
// break so returning to the card doesn't reset or double-log it.
// ---------------------------------------------------------------------------

let checkInState = { savoringText: null, mood: null };

function resetCheckInState() {
  checkInState = { savoringText: null, mood: null };
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10); // "2026-06-04"
}

// The quiet safety net: if the three most recent check-ins are all the lowest
// option, gently surface a path to real support — unless it was dismissed in
// the last few days. Never blocks anything; always one tap to set aside.
function maybeShowSupport(log, dismissedAt) {
  const supportNote = document.getElementById("supportNote");
  if (!supportNote || log.length < 3) return;
  const lastThree = log.slice(-3);
  const allLowest = lastThree.every((e) => e.mood === 1);
  if (!allLowest) return;

  if (dismissedAt) {
    const days = (Date.now() - new Date(dismissedAt).getTime()) / 86400000;
    if (days < 3) return; // respect a recent "I'm okay for now"
  }
  supportNote.hidden = false;
}

// Attach behaviour to the freshly-rendered check-in card and reflect anything
// already entered this break.
function wireCheckInCard() {
  const savoringInput = document.getElementById("savoringInput");
  const savoringSave = document.getElementById("savoringSave");
  const savoringConfirm = document.getElementById("savoringConfirm");
  const moodScale = document.getElementById("moodScale");
  const moodConfirm = document.getElementById("moodConfirm");
  const supportDismiss = document.getElementById("supportDismiss");

  // --- Savoring — keep one good thing, only if something was written. ---
  function saveSavoring() {
    const text = savoringInput.value.trim();
    if (!text) return;
    checkInState.savoringText = text;
    savoringInput.disabled = true;
    savoringSave.disabled = true;
    savoringConfirm.hidden = false;
    chrome.storage.local.get("journal", (data) => {
      const journal = Array.isArray(data.journal) ? data.journal : [];
      journal.push({ date: todayStamp(), text });
      // Keep it small — the last 100 notes is plenty for a private keepsake.
      if (journal.length > 100) journal.splice(0, journal.length - 100);
      chrome.storage.local.set({ journal });
    });
  }

  if (savoringSave) {
    savoringSave.addEventListener("click", saveSavoring);
    savoringInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") saveSavoring();
    });
  }

  // Restore a note already kept this break.
  if (checkInState.savoringText && savoringInput) {
    savoringInput.value = checkInState.savoringText;
    savoringInput.disabled = true;
    if (savoringSave) savoringSave.disabled = true;
    if (savoringConfirm) savoringConfirm.hidden = false;
  }

  // --- Mood check-in — one tap. Stored locally; never sent anywhere. ---
  if (moodScale) {
    moodScale.addEventListener("click", (e) => {
      const btn = e.target.closest(".mood-dot");
      if (!btn || checkInState.mood != null) return; // one log per break
      const mood = parseInt(btn.dataset.mood, 10);
      checkInState.mood = mood;

      moodScale.querySelectorAll(".mood-dot").forEach((d) => {
        d.classList.toggle("selected", d === btn);
        d.disabled = true;
      });
      if (moodConfirm) moodConfirm.hidden = false;

      chrome.storage.local.get(["moodLog", "supportDismissedAt"], (data) => {
        const log = Array.isArray(data.moodLog) ? data.moodLog : [];
        log.push({ date: todayStamp(), mood });
        if (log.length > 200) log.splice(0, log.length - 200);
        chrome.storage.local.set({ moodLog: log });
        maybeShowSupport(log, data.supportDismissedAt);
      });
    });
  }

  // Restore a mood already picked this break (and re-check the safety net).
  if (checkInState.mood != null && moodScale) {
    moodScale.querySelectorAll(".mood-dot").forEach((d) => {
      d.classList.toggle("selected", parseInt(d.dataset.mood, 10) === checkInState.mood);
      d.disabled = true;
    });
    if (moodConfirm) moodConfirm.hidden = false;
    chrome.storage.local.get(["moodLog", "supportDismissedAt"], (data) => {
      maybeShowSupport(Array.isArray(data.moodLog) ? data.moodLog : [], data.supportDismissedAt);
    });
  }

  // --- Quiet safety net dismissal ---
  if (supportDismiss) {
    supportDismiss.addEventListener("click", () => {
      chrome.storage.local.set({ supportDismissedAt: new Date().toISOString() });
      const note = document.getElementById("supportNote");
      if (note) note.hidden = true;
    });
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

chrome.storage.local.get("currentStretches", (data) => {
  stretches = data.currentStretches || [];
  if (stretches.length > 0) {
    showExercise(0);
  }
});
