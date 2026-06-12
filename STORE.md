# Chrome Web Store — Publishing Guide

Everything you need to get Intermezzo from "Load unpacked" to a one-click install
your friends can use. The big win: once it's on the store, nobody has to clone a
repo or toggle Developer mode — they just click **Add to Chrome**.

## Before you submit

- [ ] Register a Chrome Web Store developer account (one-time **$5** fee).
- [ ] Confirm `manifest.json` version is bumped for each upload (currently `1.0.1`,
      which renames the extension to "Intermezzo — Stretch & Wellness Breaks" so
      the store title explains what it does; `short_name` keeps browser UI compact).
- [ ] Zip the extension folder (see "Packaging" below).
- [ ] Host `PRIVACY.md` somewhere public (e.g. the GitHub repo) and have the URL
      ready — the store requires a privacy policy link because the extension
      can send data to a webhook.

## Packaging

From the project root, create the upload zip:

```bash
./scripts/build-zip.sh
```

This builds `intermezzo-<version>.zip` from an explicit allowlist of the files the
extension loads at runtime (the marketing site, demo pages, and docs are excluded).
Upload it in the Web Store Developer Dashboard → **Add new item**.

## Store listing copy

**Name:** Intermezzo — Stretch & Wellness Breaks

**Summary (132 char max):**
Gentle reminders to stretch, fix your posture, and care for your mind — no
matter which app you're in. Move more, ache less.

**Description:**
> In music, an *intermezzo* is a short interlude between the movements of a larger
> work — a moment to breathe before the next one begins. This is that pause for your
> workday.
>
> Intermezzo nudges you to take short, guided wellness breaks throughout your day.
> Each break mixes 1–3 stretches chosen for the time of day and what your body
> needs — neck, shoulders, hips, wrists, and eye-rest breaks for screen strain.
> Some breaks end with an optional mind moment: a gentle grounding prompt, a moment
> to savor something good, or a quick, private mood check-in — care for your mind,
> not just your body.
>
> Because you don't spend your whole day in the browser, Intermezzo reaches you
> with a system notification and a soft chime that work even when you're heads-
> down in another app. Snooze a reminder when you're mid-task, and pick it back
> up when you're ready.
>
> • Smart, time-of-day stretch selection from 35+ exercises
> • Optional mind moments — grounding, savoring, and on-device mood check-ins
> • System notifications + a calming chime that reach you in any app
> • Snooze, adjustable intervals (15 min – 2 hr), and 1–3 exercises per break
> • Guided timers with per-side countdowns and illustrations
> • Streak tracking and a little confetti when you finish
>
> Calm, private, and account-free. Your data stays on your device.

## Required assets

- [ ] **Icon** — 128×128 (already in `icons/icon128.png`).
- [x] **Screenshots** — 1280×800, four framed slides in `store-screenshots/`
      (`0-cover.png` → `3-popup.png`, upload in that order). Raw UI captures
      live in `store-screenshots/raw/`; frames are generated from
      `scripts/store-frames/` (local tooling, untracked) — see the README there.
- [x] **Small promo tile** — 440×280, JPEG or 24-bit PNG (no alpha):
      `store-promo/small-promo-tile-440x280.png`.
- [x] **Marquee promo tile** — 1400×560, JPEG or 24-bit PNG (no alpha):
      `store-promo/marquee-promo-tile-1400x560.png`.

Both tiles are generated from `scripts/promo-tiles/` (local tooling, untracked)
— see the README there to regenerate after a branding change.

## Permission justifications (store review asks for these)

| Permission | Justification |
| --- | --- |
| `alarms` | Schedule recurring stretch reminders at the user's chosen interval. |
| `storage` | Save settings, streak, and history locally on the user's device. |
| `notifications` | Show the reminder so it surfaces over other apps. |
| `idle` | Pause reminders while the user is away and resume on return. |
| `offscreen` | Play the reminder chime while Chrome is in the background. |

- [ ] **Single purpose statement:** "Remind users to take stretch and movement
      breaks." (Required field.)
- [ ] **Remote code:** No — all scripts are bundled; no eval or remote `<script>`.
- [ ] **Data usage:** The extension collects no user data. Everything (settings,
      streak, history, mood check-ins) stays on-device via `chrome.storage.local`
      and is never transmitted. Not sold or used for advertising.

## After submission

Review typically takes 1–3 business days. Once approved, share the store URL —
that's the one-click install link for friends.
