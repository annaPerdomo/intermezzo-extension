// ---------------------------------------------------------------------------
// Sound-check wiring. Plays each cue from the shared sounds.js at the same
// volumes the app uses, scaled by the master slider. Kept in its own file (no
// inline handlers) so it complies with the extension's script-src 'self' CSP.
// ---------------------------------------------------------------------------

// The per-event volumes the real app passes (reminder.js / offscreen.js).
const VOL = {
  reminder: 0.4,
  rest: 0.24,
  resume: 0.28,
  complete: 0.3,
  celebrate: 0.32,
};

let master = 1;

const slider = document.getElementById("vol");
const volLabel = document.getElementById("volLabel");
if (slider) {
  slider.addEventListener("input", () => {
    master = parseFloat(slider.value);
    volLabel.textContent = Math.round(master * 100) + "%";
  });
}

function play(name) {
  if (typeof IntermezzoSounds === "undefined" || !IntermezzoSounds[name]) return;
  IntermezzoSounds[name]((VOL[name] ?? 0.3) * master);
}

document.querySelectorAll("[data-cue]").forEach((btn) => {
  btn.addEventListener("click", () => play(btn.dataset.cue));
});

// The full by-ear narrative of a held exercise (with a rest), spaced so each cue
// rings out before the next — start → rest → resume → complete → celebrate.
const seqBtn = document.getElementById("seq");
if (seqBtn) {
  seqBtn.addEventListener("click", () => {
    const steps = [
      [0,     "resume"],
      [2600,  "rest"],
      [5000,  "resume"],
      [7600,  "complete"],
      [10400, "celebrate"],
    ];
    steps.forEach(([ms, name]) => setTimeout(() => play(name), ms));
  });
}
