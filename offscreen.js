// ---------------------------------------------------------------------------
// Offscreen audio — plays the zen chime when a reminder fires.
// Service workers (background.js) can't use the Web Audio API, so the
// background asks this offscreen document to play the chime instead. This is
// what lets the chime sound even when you're in another app (Figma, a game,
// a fullscreen video) with Chrome tucked away in the background.
// ---------------------------------------------------------------------------

// Cello chime — kept in sync with the version on the reminder page. A warm,
// bowed open fifth (D3 + A3) instead of the old singing bowl, so the "time for
// an interlude" cue matches the rebrand even when it reaches you in another app.
function playCelloVoice(ctx, master, freq, startAt, opts = {}) {
  const attack  = opts.attack  ?? 0.16;
  const sustain = opts.sustain ?? 0.85;
  const release = opts.release ?? 1.4;
  const peak    = (opts.gain ?? 1) * (opts.peak ?? 0.85);
  const cutoff  = opts.cutoff ?? Math.min(2600, freq * 6 + 480);
  const end     = startAt + attack + sustain + release;

  const vca = ctx.createGain();
  vca.gain.setValueAtTime(0.0001, startAt);
  vca.gain.exponentialRampToValueAtTime(peak, startAt + attack);
  vca.gain.setValueAtTime(peak, startAt + attack + sustain);
  vca.gain.exponentialRampToValueAtTime(0.0001, end);

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 0.7;
  lp.frequency.setValueAtTime(cutoff * 0.55, startAt);
  lp.frequency.linearRampToValueAtTime(cutoff, startAt + attack + 0.12);
  lp.connect(vca);
  vca.connect(master);

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 5.1;
  lfoGain.gain.value = freq * 0.006;
  lfo.connect(lfoGain);

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

function playChime(volume = 0.4) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = volume;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp);
  comp.connect(ctx.destination);

  const now = ctx.currentTime;
  let end = playCelloVoice(ctx, master, 146.83, now, { gain: 0.55 });
  end = Math.max(end, playCelloVoice(ctx, master, 220.0, now + 0.13, { gain: 0.45 }));

  setTimeout(() => ctx.close(), Math.max(2500, (end - now + 0.4) * 1000));
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.target === "offscreen" && message.action === "playChime") {
    playChime(message.volume ?? 0.4);
  }
});
