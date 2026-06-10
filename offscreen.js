// ---------------------------------------------------------------------------
// Offscreen audio — plays the reminder cue when a break is due.
// Service workers (background.js) can't use the Web Audio API, so the background
// asks this offscreen document to play the sound instead. This is what lets the
// reminder be heard even when you're in another app (Figma, a game, a fullscreen
// video) with Chrome tucked away in the background.
//
// The actual synthesis lives in the shared sounds.js (loaded just before this),
// so the "time for an interlude" cue here is exactly the one defined for the rest
// of the app — no duplicated audio code to drift out of sync.
// ---------------------------------------------------------------------------

chrome.runtime.onMessage.addListener((message) => {
  if (message.target !== "offscreen" || message.action !== "playChime") return;
  // The reminder is the only sound that needs to reach you across apps; the rest
  // of the cues play from the break overlay itself.
  if (typeof IntermezzoSounds !== "undefined") {
    IntermezzoSounds.reminder(message.volume ?? 0.4); // wrapped — can't throw
  }
});
