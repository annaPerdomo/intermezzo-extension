// ---------------------------------------------------------------------------
// Timer phases — the single source of truth for turning an exercise into an
// ordered list of timed intervals (work + the counted rests between them).
//
// Loaded by BOTH the break overlay (reminder.js) and the QA gallery, so what you
// preview in the gallery is exactly what the timer will run during a break. No
// DOM, no chrome.* — pure functions over a { name, duration, description, timing }
// stretch object. Exposes its functions as globals for the plain <script> setup.
// ---------------------------------------------------------------------------

(function (root) {
  function parseDuration(str) {
    const match = String(str || "").match(/(\d+)\s*(second|minute)/i);
    if (!match) return 30;
    const num = parseInt(match[1], 10);
    return match[2].toLowerCase().startsWith("minute") ? num * 60 : num;
  }

  // A "real" hold worth carving into its own counted phase. Anything shorter is a
  // rep-tempo beat (e.g. "hold 3 seconds, repeat 10 times") that belongs inside one
  // flowing timer, not its own round.
  const MIN_HOLD_SEC = 8;
  const MAX_ROUNDS = 6;        // beyond this a *held* set is too many — pace it as reps
  const MAX_REPS = 20;         // a sane ceiling for paced flowing reps
  const MIN_REP_SEC = 2;       // a single rep never paces faster than this
  const REP_REST_SEC = 3;      // a few seconds to reset between deliberate reps
  const REP_REST_MIN_PACE = 3; // reps at least this slow get that reset; quicker
                               // pulses (≤2s, e.g. calf raises) flow continuously
  const SIDE_REST_SEC = 4;     // a breath to reposition for the other side
  const DIR_REST_SEC = 3;      // just long enough to reverse direction

  // Rest between repeated holds scales with the hold — long enough to actually
  // recover, never a token couple of seconds. (Prone Cobra's 10s hold → ~6s rest.)
  function restBetweenRounds(holdSec) {
    return Math.min(12, Math.max(5, Math.round(holdSec * 0.6)));
  }

  function workPhase(label, seconds) {
    return { label, seconds, kind: "work" };
  }
  function restPhase(label, seconds) {
    return { label, seconds, kind: "rest" };
  }
  // One rep of a flowing set (Cat-Cow ×8, Calf Raises ×15…). Deliberate reps get
  // a counted reset rest between them (and chime at each rest boundary); quick
  // pulses run back-to-back with no rests, so they flow as one unbroken rhythm
  // and only the final "complete" chimes.
  function repPhase(label, seconds) {
    return { label, seconds, kind: "rep" };
  }

  // Interleave a counted rest between consecutive work intervals. The rests are
  // real, visible phases (their own countdown + ring) — that's what turns a vague
  // pause into actual guidance.
  function withRests(works, makeRest) {
    const out = [];
    works.forEach((w, i) => {
      out.push(w);
      if (i < works.length - 1) out.push(makeRest(i));
    });
    return out;
  }

  // Words → numbers for rep counts, including the standalone "twice"/"thrice"
  // (which, unlike "three times", are never followed by the word "times").
  const REP_WORDS = { two: 2, three: 3, four: 4, five: 5, six: 6 };

  function parseReps(desc) {
    const twice = /\b(twice|thrice)\b/i.exec(desc);
    if (twice) return twice[1].toLowerCase() === "thrice" ? 3 : 2;

    // "Repeat 3 times", "repeat five times", "10 reps", "8 times"
    const m =
      desc.match(/(?:repeat|do)\b[^.]*?\b(two|three|four|five|six|\d+)\s*(?:times|reps)\b/i) ||
      desc.match(/\b(\d+)\s*(?:times|reps)\b/i);
    if (!m) return null;
    const word = m[1].toLowerCase();
    return REP_WORDS[word] || parseInt(word, 10);
  }

  // Turn an exercise into an ordered list of timed phases — work intervals plus the
  // counted rests between them. Each phase is { label, seconds, kind }, where kind
  // is "work" or "rest". An optional explicit `stretch.timing` overrides the prose
  // parsing for exercises whose wording is ambiguous.
  function parsePhases(stretch) {
    if (stretch.timing) return phasesFromTiming(stretch.timing);

    const desc = stretch.description;
    const totalSec = parseDuration(stretch.duration);

    // Per-hold duration, e.g. "Hold for 15 seconds" (takes the first figure of a
    // "20-30 seconds" range).
    const holdMatch = desc.match(/hold\b[^.]*?(\d+)\s*seconds?/i);
    const holdSec = holdMatch ? parseInt(holdMatch[1], 10) : null;

    const reps = parseReps(desc);

    const hasSides =
      /per\s+(side|hand|arm|leg)/i.test(desc) ||
      /switch\s+(sides|which)/i.test(desc) ||
      // "then switch" means change sides — but not "switch back" (focus shifts,
      // not a body side) which would mislabel an eye exercise as left/right.
      /then\s+switch(?!\s+back)/i.test(desc) ||
      /other\s+(side|shoulder)/i.test(desc) ||
      /both\s+sides/i.test(desc) ||
      /do\s+both/i.test(desc);

    const hasDirections = /each\s+direction/i.test(desc);

    // Body-part labels for sides
    let sideA = "Right side";
    let sideB = "Left side";
    if (/per\s+hand/i.test(desc)) { sideA = "Right hand"; sideB = "Left hand"; }
    else if (/per\s+arm/i.test(desc)) { sideA = "Right arm"; sideB = "Left arm"; }
    else if (/per\s+leg/i.test(desc)) { sideA = "Right leg"; sideB = "Left leg"; }

    // Two sides — hold each, with a reposition rest between. A genuine per-side hold
    // (≥8s) sets the time; a short rep-tempo hold like "3 seconds, 6 per side" is
    // NOT the per-side time, so fall back to splitting the total evenly.
    if (hasSides) {
      const perSide = holdSec && holdSec >= MIN_HOLD_SEC ? holdSec : Math.round(totalSec / 2);
      return withRests(
        [workPhase(sideA, perSide), workPhase(sideB, perSide)],
        () => restPhase("Switch sides", SIDE_REST_SEC)
      );
    }

    // Two directions — e.g. circles each way.
    if (hasDirections) {
      const half = Math.round(totalSec / 2);
      return withRests(
        [workPhase("First direction", half), workPhase("Other direction", totalSec - half)],
        () => restPhase("Switch direction", DIR_REST_SEC)
      );
    }

    // A real hold (≥8s) repeated a few times — guide each round with a true
    // recovery rest between (Prone Cobra: hold 10s, rest, ×3).
    if (holdSec && holdSec >= MIN_HOLD_SEC && reps && reps >= 2 && reps <= MAX_ROUNDS) {
      const works = [];
      for (let i = 0; i < reps; i++) works.push(workPhase(`Round ${i + 1} of ${reps}`, holdSec));
      return withRests(works, () => restPhase("Rest", restBetweenRounds(holdSec)));
    }

    // A flowing set of reps (Cat-Cow ×8, Calf Raises ×15, Glute Bridge ×10…) —
    // pace each rep ("Rep i of N") back-to-back so the timer walks through all the
    // rounds, instead of one undifferentiated countdown.
    if (reps && reps >= 2 && reps <= MAX_REPS) {
      // Pace each rep at least as long as its own hold — a "hold 5s ×8" set gives
      // 5s/rep rather than a rushed 4s, even when the labeled total undercounts.
      const repFloor = holdSec && holdSec < MIN_HOLD_SEC ? holdSec : MIN_REP_SEC;
      const perRep = Math.max(repFloor, Math.round(totalSec / reps));
      const works = [];
      for (let i = 0; i < reps; i++) works.push(repPhase(`Rep ${i + 1} of ${reps}`, perRep));
      // Deliberate reps (a hold, a slow controlled move) get a few seconds to
      // reset between each — an unhurried beat. But a quick rhythmic pulse like
      // calf raises ("hold 2s, lower, ×15") is calmest as a *continuous* rhythm
      // you sink into; stopping 3s after every 2s raise would be jarring and
      // defeat the point ("get the blood flowing"). So fast pulses flow gap-less.
      if (perRep >= REP_REST_MIN_PACE) return withRests(works, () => restPhase("Rest", REP_REST_SEC));
      return works;
    }

    return [workPhase(null, totalSec)];
  }

  // Build phases from an explicit timing override. Shapes:
  //   { work: 30 }                          → one timed interval
  //   { hold: 20, sides: true }             → hold each side, with a switch rest
  //   { hold: 10, reps: 3 }                 → 3 rounds with recovery rests
  //   { hold: 15, reps: 2, rest: 8 }        → custom rest between rounds
  //   { hold: 20, sides: true, labels: ["Right leg","Left leg"] }
  function phasesFromTiming(t) {
    if (t.sides) {
      const [a, b] = t.labels || ["Right side", "Left side"];
      return withRests(
        [workPhase(a, t.hold), workPhase(b, t.hold)],
        () => restPhase("Switch sides", t.rest || SIDE_REST_SEC)
      );
    }
    if (t.reps && t.reps >= 2) {
      const works = [];
      for (let i = 0; i < t.reps; i++) works.push(workPhase(`Round ${i + 1} of ${t.reps}`, t.hold));
      return withRests(works, () => restPhase("Rest", t.rest || restBetweenRounds(t.hold)));
    }
    return [workPhase(t.label || null, t.work || t.hold)];
  }

  // Expose for the plain <script> setup used by both pages.
  root.parseDuration = parseDuration;
  root.parsePhases = parsePhases;
  root.IntermezzoPhases = { parseDuration, parsePhases, phasesFromTiming };
})(typeof self !== "undefined" ? self : this);
