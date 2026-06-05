# Chrome Web Store — Publishing Guide

Everything you need to get Intermezzo from "Load unpacked" to a one-click install
your friends can use. The big win: once it's on the store, nobody has to clone a
repo or toggle Developer mode — they just click **Add to Chrome**.

## Before you submit

- [ ] Register a Chrome Web Store developer account (one-time **$5** fee).
- [ ] Confirm `manifest.json` version is bumped for each upload (currently `1.1.0`).
- [ ] Zip the extension folder (see "Packaging" below).
- [ ] Host `PRIVACY.md` somewhere public (e.g. the GitHub repo) and have the URL
      ready — the store requires a privacy policy link because the extension
      can send data to a webhook.

## Packaging

From the project root, create the upload zip (excludes git, docs, and OS junk):

```bash
zip -r intermezzo.zip . \
  -x ".git/*" -x "*.DS_Store" -x "STORE.md" -x "PRIVACY.md" -x "README.md"
```

Upload `intermezzo.zip` in the Web Store Developer Dashboard → **Add new item**.

## Store listing copy

**Name:** Intermezzo — Stretch & Posture Breaks

**Summary (132 char max):**
Gentle reminders to stretch, rest your eyes, and fix your posture — no matter
which app you're in. Move more, ache less.

**Description:**
> Intermezzo nudges you to take short, guided movement breaks throughout your day.
> Each break mixes 1–3 stretches chosen for the time of day and what your body
> needs — neck, shoulders, hips, wrists, and eye-rest breaks for screen strain.
>
> Because you don't spend your whole day in the browser, Intermezzo reaches you
> with a system notification and a soft chime that work even when you're heads-
> down in another app. Snooze a reminder when you're mid-task, and pick it back
> up when you're ready.
>
> • Smart, time-of-day stretch selection from 35+ exercises
> • System notifications + a calming chime that reach you in any app
> • Snooze, adjustable intervals (15 min – 2 hr), and 1–3 exercises per break
> • Guided timers with per-side countdowns, illustrations, and video demos
> • Streak tracking and a little confetti when you finish
> • Optional: post to a Discord/Slack channel to stretch alongside friends
>
> Calm, private, and account-free. Your data stays on your device.

## Required assets

- [ ] **Icon** — 128×128 (already in `icons/icon128.png`).
- [ ] **Screenshots** — 1280×800 or 640×400, at least one. Suggested shots:
      the popup, an active break with the timer ring, and the done/confetti screen.
- [ ] **Small promo tile** — 440×280 (optional but recommended).

## Permission justifications (store review asks for these)

| Permission | Justification |
| --- | --- |
| `alarms` | Schedule recurring stretch reminders at the user's chosen interval. |
| `storage` | Save settings, streak, and history locally on the user's device. |
| `notifications` | Show the reminder so it surfaces over other apps. |
| `idle` | Pause reminders while the user is away and resume on return. |
| `offscreen` | Play the reminder chime while Chrome is in the background. |
| `host_permissions` (discord.com, slack.com) | Deliver the optional accountability message to a webhook the user enters themselves. |

- [ ] **Single purpose statement:** "Remind users to take stretch and movement
      breaks." (Required field.)
- [ ] **Data usage:** Declare that data is stored locally and, if the webhook is
      configured, a stretch-completion message is sent to the user's chosen URL.
      Not sold or used for advertising.

## After submission

Review typically takes 1–3 business days. Once approved, share the store URL —
that's the one-click install link for friends.
