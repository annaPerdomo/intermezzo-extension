# Intermezzo — Mind-Work Design Doc

_Draft · 2026-06-04 · how to weave gentle CBT-style micro-practices into Intermezzo_

> **One-line vision:** Intermezzo already nudges the body. This doc is about
> letting it nudge the mind too — quietly, kindly, and without ever pretending
> to be therapy — so the people we love who are struggling get a few small
> doorways back toward joy.

---

## 0. The core insight

Intermezzo is **already a CBT tool**. The single most evidence-backed
behavioral treatment for depression is **behavioral activation**: scheduling
small, regular, positive actions to interrupt the withdraw → ruminate → withdraw
spiral. A gentle recurring break that pulls you out of the chair and asks one
kind question of yourself *is* behavioral activation.

So we are not bolting on a foreign feature. We are deepening the thing the app
already does well. Everything below builds on the existing break flow rather
than replacing it.

---

## 1. Design principles

1. **Body-first, mind-optional.** The app's identity stays "breathe, stretch,
   be kind to your body." Mind-work is a quiet companion, never the headline.
   Everything here is opt-in or skippable in one tap.
2. **Sneak it in, don't stage an intervention.** A single reflective prompt at
   the end of a break does more, sustained over weeks, than a heavy "wellness
   module" people avoid. Small and frequent beats big and dreaded.
3. **Support, not treatment.** No copy ever claims to *treat* depression or
   anxiety. We offer "small practices," "a moment," "a gentle question." This is
   both honest and keeps us safe for the Chrome Web Store.
4. **Joy-leaning over problem-focused.** For a friend who's depressed, savoring
   and noticing-the-good earn their place before heavy cognitive restructuring.
   We lead with warmth.
5. **Private by default.** Anything a person types stays in `chrome.storage.local`,
   same as streaks today. Nothing new leaves the device. (See §7.)
6. **One quiet safety net.** Because the intended audience includes people who
   are *very* low, we include an unobtrusive path toward real human support for
   the lowest moods. A few lines of code; the responsible thing to ship. (See §6.)

---

## 2. Where mind-work lands in the existing flow

The break already has three natural slots. Each suits a different kind of
practice.

| Slot | Where in code | Current content | Mind-work that fits |
|---|---|---|---|
| **Arrival** | `subtitle` in `reminder.html`, set in `reminder.js` | "Time to Move" subtitle | A one-line grounding or intention to *arrive* in the break |
| **Card carousel** | `exercise-panel` / cards built from `currentStretches` (`pickStretches()` in `background.js`) | 1–3 stretch cards w/ SVG + timer | An optional **mind card** mixed into the deck |
| **Completion** | `done-screen` + `MOTIVATIONAL_QUOTES` in `reminder.js` (~line 480) | Confetti + one kind line + stats | **Savoring / Three Good Things**, optional mood check-in |

The **completion screen** is the cheapest, safest, highest-return entry point.
The **card carousel** is the real foundation. The **arrival** line is a nice
low-effort polish pass.

---

## 3. The mind-work modules

Ranked for the stated goal — helping struggling friends find some joy — by
joy-to-effort ratio and safety.

### 3.1 Three Good Things / Savoring  ⭐ start here
- **What:** On the completion screen, one gentle prompt: _"Name one small thing
  that's gone okay since your last break."_ Optional one-line text field; can be
  skipped with zero friction.
- **Why it works:** "Three Good Things" is among the best-studied positive-
  psychology / CBT-adjacent exercises for *wellbeing* specifically. It trains
  attention toward the positive, which depression systematically filters out.
- **Lands in:** completion screen. Reuses `MOTIVATIONAL_QUOTES` real estate.
- **Effort:** small — `reminder.html` + `reminder.js` + one storage key.

### 3.2 Behavioral activation micro-nudge
- **What:** A mind card suggesting one tiny, doable, pleasant-or-meaningful
  action: _"Text someone you like one sentence,"_ _"Step outside for 60 seconds,"_
  _"Make the warm drink you keep putting off."_
- **Why it works:** Directly operationalizes behavioral activation — the
  evidence-backed core. Reinforces the action-taking the app already encourages.
- **Lands in:** card carousel (a `type: "activate"` mind card).

### 3.3 5-4-3-2-1 Grounding
- **What:** A mind card that walks the senses: 5 things you see, 4 you hear, 3
  you feel, 2 you smell, 1 you taste. Pairs with the existing breathing
  background and the `timer-ring` you already animate.
- **Why it works:** First-line anxiety / acute-distress grounding. Pulls
  attention out of the spiral and into the body and room.
- **Lands in:** card carousel (`type: "ground"`), reusing the timer ring for
  pacing.

### 3.4 Self-compassion lines
- **What:** Expand and **tag** the existing `MOTIVATIONAL_QUOTES` with a few
  explicitly self-compassion-framed lines ("If a friend felt how you feel, you'd
  be gentle with them. Try giving yourself that.").
- **Why it works:** Self-compassion buffers the harsh self-talk central to both
  depression and anxiety. You're already 80% doing this — it's a copy pass.
- **Lands in:** completion screen (already wired).

### 3.5 Light thought reframe  (heaviest — gate behind opt-in)
- **What:** A gentle two-beat mind card. Beat 1: _"Is there a thought weighing on
  you right now?"_ Beat 2: _"Is there a kinder or truer way to look at it?"_
  Never forced; always one-tap skippable.
- **Why it works:** This is cognitive restructuring, the "C" in CBT. Powerful,
  but heavier and can backfire if it feels invalidating — so it's opt-in and
  rare, not in the default rotation.
- **Lands in:** card carousel (`type: "reframe"`), only when the user has
  enabled "deeper prompts" in settings.

### 3.6 Mood check-in
- **What:** A one-tap mood log (e.g. 5 faces/dots) on the arrival or completion
  screen. Optional. Feeds gentle responsiveness (a low log → a softer completion
  message; repeated very-low logs → the safety net in §6).
- **Why it works:** Builds the self-awareness CBT depends on, and pairs
  naturally with the streak storage you already keep. Also gives *you* (privately,
  on-device) a sense of how a friend is trending if they choose to glance at it.
- **Lands in:** arrival or completion; new `moodLog` storage key.

---

## 4. Data model

Mirror the existing `STRETCHES` schema so the break-builder treats mind cards as
just another kind of card.

```js
// background.js — sits alongside STRETCHES
const MIND_EXERCISES = [
  {
    name: "Three Good Things",
    type: "savor",                 // savor | activate | ground | reframe
    duration: "30 seconds",
    prompt: "Name one small thing that's gone okay since your last break.",
    focus: "Savoring",
    deeper: false,                 // true = only when "deeper prompts" enabled
    priority: 1,
  },
  {
    name: "5-4-3-2-1 Grounding",
    type: "ground",
    duration: "60 seconds",
    prompt: "Notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.",
    focus: "Grounding",
    deeper: false,
    priority: 1,
  },
  {
    name: "One Small Reach",
    type: "activate",
    duration: "30 seconds",
    prompt: "Pick one tiny kind thing to do next: a text, a glass of water, a step outside.",
    focus: "Behavioral activation",
    deeper: false,
    priority: 1,
  },
  // reframe entries: deeper: true
];
```

**Selection:** extend `pickStretches()` in `background.js`. Cheapest viable
version: with probability _p_ (settings-controlled, default modest), append
**one** mind card as the final card of the break — so the body stays the focus
and the mind moment is a soft landing. Honor `deeper` against a settings flag.
Store the resulting deck in the existing `currentStretches` key (consider
renaming to `currentCards` later, but not required for v1).

**Rendering:** in `reminder.js`, branch on the card having a `type` (mind) vs a
body `area`. Mind cards reuse the existing card shell — swap the SVG/illustration
region for the `prompt` text and, where useful, an optional one-line input or
the existing `timer-ring` for paced exercises (grounding, breathing).

---

## 5. Tone guidelines (copy)

- Speak like the existing voice: warm, lowercase-friendly, never clinical.
  ("Look at you, taking a moment for yourself.")
- Invite, never instruct: "if you'd like…", "maybe…", "no pressure."
- Always offer a graceful skip. A skipped prompt should still feel like a
  complete, valid break — no guilt, no streak penalty.
- Never diagnose, never use "should," never imply the person is broken.
- Validate before redirect: acknowledge a hard moment before offering a reframe.

---

## 6. The safety net (required for this audience)

Because Intermezzo may be used by people who are very low, we ship one quiet,
optional support path:

- If the **mood check-in** (§3.6) lands at the lowest level repeatedly (e.g. the
  bottom option N times in a rolling window), the completion screen surfaces a
  soft, dismissible line — not an alarm — pointing toward real human support.
- Copy stays gentle and non-clinical: _"Rough stretch lately. If it'd help to
  talk to a real person, support is here — and reaching out is a strong move."_
  with a locale-aware resource (e.g. **988** in the US; make the resource
  configurable / locale-detected, with an international fallback link).
- Never blocks the UI, never auto-sends anything anywhere, fully dismissible,
  respects the same privacy posture as everything else.

This is a few lines of code and is the right thing to ship for the people this
feature is meant to help.

---

## 7. Privacy

Everything mind-related follows the existing posture (see `PRIVACY.md`):

- New keys live in `chrome.storage.local`, on-device only:
  `moodLog`, `gratitudeEntries` (if we persist them at all), `mindSettings`.
- **Default to not persisting free text.** The savoring/reframe prompts can be
  purely reflective — shown, answered in the person's head or a transient field,
  and *not* stored — unless the user explicitly opts into a private "journal."
  Storing less is both kinder and simpler.
- The optional accountability webhook (§ existing feature) must **never** include
  mood or reflection content — only the existing break-count message. Add a test/
  note to guard this.
- Update `PRIVACY.md` to describe any new stored keys before shipping.

---

## 8. Settings surface

Add a small "Mind moments" section to `popup.html` / `popup.js`:

- **Mind moments:** Off · Gentle (default) · More — controls probability _p_ of a
  mind card per break.
- **Deeper prompts** (reframe, mood check-in): off by default; opt-in toggle.
- **Mood check-in:** on/off.
- All default conservative so the app's body-first identity is unchanged for
  anyone who doesn't want this.

---

## 9. Suggested rollout

1. **Phase 1 — Savoring on completion (§3.1) + self-compassion copy (§3.4).**
   Smallest diff, highest joy-to-effort, touches only `reminder.html/js`. Ship,
   live with it, feel the tone.
2. **Phase 2 — `MIND_EXERCISES` catalog + mind-card rendering + selection in
   `pickStretches()`.** Adds grounding (§3.3) and behavioral-activation (§3.2)
   cards. This is the foundation everything else hangs off.
3. **Phase 3 — Mood check-in (§3.6) + the safety net (§6).** Care-focused;
   slightly more design (the mood UI + rolling-window logic).
4. **Phase 4 — Deeper prompts: light reframe (§3.5), opt-in journal.** Only once
   the gentle layers feel right.

---

## 10. Open questions for Anna

- How "present" should this be — a mind card in most breaks, or a rare,
  surprising gift every handful of breaks?
- Do we persist any reflections (a private journal), or keep prompts purely
  in-the-moment and store nothing but mood?
- Is the safety net US-first (988) for v1, or do we want locale detection from
  the start?
- Should the mood trend ever be *visible* (a tiny private chart in the popup),
  or is it purely internal plumbing for responsiveness?
