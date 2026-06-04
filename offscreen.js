// ---------------------------------------------------------------------------
// Offscreen audio — plays the zen chime when a reminder fires.
// Service workers (background.js) can't use the Web Audio API, so the
// background asks this offscreen document to play the chime instead. This is
// what lets the chime sound even when you're in another app (Figma, a game,
// a fullscreen video) with Chrome tucked away in the background.
// ---------------------------------------------------------------------------

// Singing-bowl chime — kept in sync with the version on the reminder page.
function playChime(volume = 0.4) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);

  const tones = [
    { freq: 432,  gain: 0.28, decay: 3.2, type: "sine" },
    { freq: 864,  gain: 0.10, decay: 2.2, type: "sine" },
    { freq: 1296, gain: 0.04, decay: 1.4, type: "sine" },
    { freq: 324,  gain: 0.12, decay: 3.8, type: "sine" },
    { freq: 436,  gain: 0.08, decay: 3.0, type: "sine" },
  ];

  tones.forEach(({ freq, gain, decay, type }) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;

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

chrome.runtime.onMessage.addListener((message) => {
  if (message.target === "offscreen" && message.action === "playChime") {
    playChime(message.volume ?? 0.4);
  }
});
