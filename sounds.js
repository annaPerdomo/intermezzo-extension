// ---------------------------------------------------------------------------
// Intermezzo — the sound vocabulary.
//
// Every sound in the app is synthesized here in real time with the Web Audio
// API (no audio files — the app stays fully offline and MV3-friendly). Shared by
// the break overlay (reminder.html), the offscreen audio doc (offscreen.html, which
// plays the reminder so it's heard even when Chrome is in the background) and the
// sound-check page — so all three stay perfectly in sync.
//
// The palette is a tiny CHAMBER ENSEMBLE, all in D major, so the soundscape feels
// predictable and therefore safe: a warm bowed CELLO (the binding voice), a gentle
// HARP/pizzicato PLUCK, and a soft CELESTA/glass BELL for sparkle. Five distinct cues
// let you follow a whole break by ear — rest, resume, complete and celebrate —
// plus the reminder that calls you to it.
//
// Music-therapy principles baked into every cue:
//   • Soft onsets — anxious listeners startle easily, so nothing ever "hits"; the
//     celebration *swells* in. (≥~8 ms attacks for pluck/bell, ~160 ms for cello.)
//   • Contour carries meaning — descending = exhale/settle (rest), ascending =
//     gentle activation/onward (resume, reminder).
//   • Consonance & cadence — perfect fifths, major triads and V→I resolutions read
//     as stability, safety and reward; D-major pentatonic (D E F# A B) has no
//     semitone clashes, so the melodic cues literally can't sound wrong.
//   • Low register grounds — the cello's low roots draw attention into the body.
// ---------------------------------------------------------------------------

(function (root) {
  // --- Note frequencies (Hz), D major / D-major pentatonic ------------------
  const N = {
    D2: 73.42,  A2: 110.00,
    D3: 146.83, E3: 164.81, Fs3: 185.00, A3: 220.00, B3: 246.94,
    D4: 293.66, E4: 329.63, Fs4: 369.99, A4: 440.00, B4: 493.88,
    D5: 587.33, Fs5: 739.99, A5: 880.00,
  };

  // --- One lazily-created, shared AudioContext per page ---------------------
  // Reused for every cue (master gain → soft compressor → speakers). The
  // compressor gently glues overlapping voices and guards against clipping, so
  // nothing ever jumps out. Created on first use; resumed best-effort in case the
  // browser started it suspended pending a user gesture.
  let _ctx = null;
  let _master = null;
  function audio() {
    const AC = (typeof window !== "undefined") && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return null;
    if (!_ctx) {
      try {
        _ctx = new AC();
        _master = _ctx.createGain();
        _master.gain.value = 1;
        const comp = _ctx.createDynamicsCompressor();
        _master.connect(comp);
        comp.connect(_ctx.destination);
      } catch (e) {
        _ctx = null;
        return null;
      }
    }
    if (_ctx.state === "suspended" && _ctx.resume) _ctx.resume().catch(() => {});
    return { ctx: _ctx, master: _master };
  }

  // A per-cue bus carrying that cue's volume, into the shared master.
  function bus(ctx, master, volume) {
    const g = ctx.createGain();
    g.gain.value = volume;
    g.connect(master);
    return g;
  }

  // -------------------------------------------------------------------------
  // Voices
  // -------------------------------------------------------------------------

  // CELLO — a warm, bowed voice: two slightly detuned saws + a sub-octave sine
  // through a mellow low-pass, with gentle vibrato and a slow bowed swell. Returns
  // the time (ctx clock) it finishes. (Unchanged from the original chime.)
  function celloVoice(ctx, dest, freq, startAt, opts = {}) {
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
    vca.connect(dest);

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

  // HARP / pizzicato PLUCK — a soft (never clicky) attack and a long exponential
  // tail, with the brightness decaying faster than the loudness (the gentle "ping"
  // of a plucked string mellowing). A triangle fundamental + quiet sine partials +
  // a faintly detuned second string for warmth.
  function pluckVoice(ctx, dest, freq, startAt, opts = {}) {
    const attack = opts.attack ?? 0.008;
    const decay  = opts.decay  ?? 0.9;
    const peak   = (opts.gain ?? 1) * (opts.peak ?? 0.5);
    const end    = startAt + attack + decay;

    const vca = ctx.createGain();
    vca.gain.setValueAtTime(0.0001, startAt);
    vca.gain.exponentialRampToValueAtTime(peak, startAt + attack);
    vca.gain.exponentialRampToValueAtTime(0.0001, end);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 0.6;
    lp.frequency.setValueAtTime(Math.min(7000, freq * 8 + 1200), startAt);
    lp.frequency.exponentialRampToValueAtTime(Math.max(500, freq * 2.2), startAt + Math.min(decay, 0.5));
    lp.connect(vca);
    vca.connect(dest);

    const partials = [
      { type: "triangle", mult: 1, level: 0.60, detune: 0 },
      { type: "sine",     mult: 2, level: 0.28, detune: 0 },
      { type: "sine",     mult: 3, level: 0.12, detune: 0 },
      { type: "triangle", mult: 1, level: 0.50, detune: 7 }, // second string, gently detuned
    ];
    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      osc.type = p.type;
      osc.frequency.value = freq * p.mult;
      osc.detune.value = p.detune;
      const g = ctx.createGain();
      g.gain.value = p.level;
      osc.connect(g);
      g.connect(lp);
      osc.start(startAt);
      osc.stop(end + 0.05);
    });

    return end;
  }

  // CELESTA / glass BELL — sine partials at struck-metal ratios (one mildly
  // inharmonic for a "glassy" shimmer), each upper partial quieter and decaying
  // faster. Soft mallet attack, long shimmering tail. Kept gentle and never too
  // bright, so it reads as wonder, not alarm.
  function bellVoice(ctx, dest, freq, startAt, opts = {}) {
    const attack = opts.attack ?? 0.01;
    const decay  = opts.decay  ?? 2.2;
    const peak   = (opts.gain ?? 1) * (opts.peak ?? 0.32);
    const end    = startAt + attack + decay;

    const partials = [
      { mult: 1.00, level: 1.00, d: 1.00 },
      { mult: 2.00, level: 0.50, d: 0.80 },
      { mult: 2.41, level: 0.28, d: 0.60 }, // slight inharmonicity = glassy
      { mult: 3.00, level: 0.16, d: 0.45 },
    ];
    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq * p.mult;
      const g = ctx.createGain();
      const pEnd = startAt + attack + decay * p.d;
      g.gain.setValueAtTime(0.0001, startAt);
      g.gain.exponentialRampToValueAtTime(peak * p.level, startAt + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, pEnd);
      osc.connect(g);
      g.connect(dest);
      osc.start(startAt);
      osc.stop(pEnd + 0.05);
    });

    return end;
  }

  // -------------------------------------------------------------------------
  // The six cues
  // -------------------------------------------------------------------------

  // 1. REMINDER — "time for an interlude." A rising D-major arpeggio (F#–A–D) on
  //    bells over a soft cello drone: an inviting, ascending call — the app's
  //    signature motif. A touch of sparkle so it carries across other apps, but
  //    warm and never shrill.
  function reminder(volume = 0.4) {
    const a = audio(); if (!a) return;
    const { ctx, master } = a;
    const g = bus(ctx, master, volume);
    const t = ctx.currentTime + 0.02;

    celloVoice(ctx, g, N.D3, t, { gain: 0.5, attack: 0.25, sustain: 1.1, release: 1.4, peak: 0.7 });
    bellVoice(ctx, g, N.Fs4, t + 0.06, { gain: 0.70, decay: 1.8 });
    bellVoice(ctx, g, N.A4,  t + 0.30, { gain: 0.72, decay: 1.9 });
    bellVoice(ctx, g, N.D5,  t + 0.56, { gain: 0.80, decay: 2.4 });
  }

  // 2. REST — a hold/side/round ends, rest begins. The rising "resume" run played
  //    in reverse: a light harp tinkle descending home (A4–F#4–E4–D4). The mirror
  //    of stepping into work — this is stepping gently down into rest, for a moment.
  function rest(volume = 0.24) {
    const a = audio(); if (!a) return;
    const { ctx, master } = a;
    const g = bus(ctx, master, volume);
    const t = ctx.currentTime + 0.02;

    const run = [N.A4, N.Fs4, N.E4, N.D4];
    run.forEach((f, i) => pluckVoice(ctx, g, f, t + i * 0.10, { gain: 0.50, decay: 0.8 }));
  }

  // 3. RESUME — stepping into a work phase: the start of an exercise, and the
  //    moment a rest ends. A rising D-major-pentatonic run
  //    (D4–E4–F#4–A4) on harp: momentum
  //    and encouragement, ending leaning-forward on the dominant — "you're not
  //    done, keep going." The brightest, most motivating cue (still soft). It
  //    doubles as the start-of-exercise cue.
  function resume(volume = 0.28) {
    const a = audio(); if (!a) return;
    const { ctx, master } = a;
    const g = bus(ctx, master, volume);
    const t = ctx.currentTime + 0.02;

    const run = [N.D4, N.E4, N.Fs4, N.A4];
    run.forEach((f, i) => pluckVoice(ctx, g, f, t + i * 0.10, { gain: 0.50, decay: 0.8 }));
  }

  // 4. COMPLETE — the last phase of one exercise finishes. A small V→I cadence: a
  //    dominant A resolving to a warm D-major dyad (D + F#) with a faint bell halo
  //    two octaves up — the strongest "that's done, well done" in tonal music, but
  //    warm and without finality (more exercises may follow).
  function complete(volume = 0.3) {
    const a = audio(); if (!a) return;
    const { ctx, master } = a;
    const g = bus(ctx, master, volume);
    const t = ctx.currentTime + 0.02;

    pluckVoice(ctx, g, N.A3, t, { gain: 0.45, decay: 0.8 });
    celloVoice(ctx, g, N.D3, t + 0.18, { gain: 0.48, attack: 0.16, sustain: 1.0, release: 1.7 });
    celloVoice(ctx, g, N.Fs3, t + 0.26, { gain: 0.40, attack: 0.16, sustain: 1.0, release: 1.7 });
    bellVoice(ctx, g, N.D5, t + 0.30, { gain: 0.30, decay: 2.2 });
  }

  // 5. CELEBRATE — the whole break is finished. Cello voices swell in one after
  //    another (soft attacks — it *grows*, it never hits), overlapping into a
  //    sustained, warm D-major bloom, with a descending bell shimmer settling
  //    over the top like light coming to rest. Grand and uplifting, yet it can
  //    never startle.
  function celebrate(volume = 0.32) {
    const a = audio(); if (!a) return;
    const { ctx, master } = a;
    const g = bus(ctx, master, volume);
    const t = ctx.currentTime + 0.03;

    const chord = [
      { f: N.D3,  t: 0.00, gain: 0.50 },
      { f: N.A3,  t: 0.16, gain: 0.42 },
      { f: N.D4,  t: 0.32, gain: 0.42 },
      { f: N.Fs4, t: 0.48, gain: 0.36 },
    ];
    chord.forEach((n) =>
      celloVoice(ctx, g, n.f, t + n.t, { gain: n.gain, attack: 0.30, sustain: 1.6, release: 2.4, peak: 0.8 })
    );

    bellVoice(ctx, g, N.A5,  t + 0.70, { gain: 0.34, decay: 2.6 });
    bellVoice(ctx, g, N.Fs5, t + 0.95, { gain: 0.36, decay: 2.8 });
    bellVoice(ctx, g, N.D5,  t + 1.20, { gain: 0.40, decay: 3.4 });
  }

  // --- Public API — every cue wrapped so a chime can never throw -------------
  const CUES = { reminder, rest, resume, complete, celebrate };
  const api = {};
  Object.keys(CUES).forEach((name) => {
    api[name] = function (volume) {
      try { return CUES[name](volume); } catch (e) { /* never let a chime break the break */ }
    };
  });

  root.IntermezzoSounds = api;
})(typeof self !== "undefined" ? self : this);
