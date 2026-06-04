<p align="center">
  <img src="icons/icon128.png" alt="Intermezzo" width="80" />
</p>

<h1 align="center">Intermezzo</h1>

<p align="center">
  <em>Breathe. Stretch. Be kind to your body.</em>
</p>

<p align="center">
  A Chrome extension that gives you gentle reminders to take stretch breaks throughout your workday. Because your body wasn't built to sit in a chair for 8 hours straight.
</p>


<p align="center">
  <img src="https://img.shields.io/badge/Chrome_Extension-4285F4?style=flat&logo=googlechrome&logoColor=white" alt="Chrome Extension" />
  <img src="https://img.shields.io/badge/Manifest_V3-FFC107?style=flat&logo=googlechrome&logoColor=black" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3" />
</p>

---

## Why Intermezzo?

We've all been there — hours deep in a coding session, shoulders creeping up to your ears, back slowly curling into a question mark. By the time you notice, your neck is stiff and your hips are screaming.

Intermezzo nudges you at regular intervals with a short, guided stretch break. Each break is tailored to the time of day and what your body actually needs, not just a random reminder to "take a break."

## What it does

- **Smart stretch selection** — picks 1-3 stretches per break, mixing different body areas and adapting to the time of day. Morning breaks ease you in, afternoon breaks target the tension that's built up.
- **35+ stretches** — covering neck, shoulders, spine, chest, hips, wrists, and eye-rest breaks for screen strain. Each one written like a friend is coaching you through it.
- **Reaches you in any app** — a system notification and a soft chime fire even when Chrome is in the background, so the nudge lands whether you're in Figma, a fullscreen video, or a game — not just when you're looking at the browser.
- **Snooze** — mid-task? Snooze the reminder for a few minutes and pick it back up when you're ready.
- **Built-in timer** — with per-side countdowns for stretches that need them. Just hit "Begin" and follow along.
- **Video demos** — many stretches link to short YouTube tutorials so you can see exactly what to do.
- **SVG illustrations** — every stretch has an illustrated stick-figure guide.
- **Configurable intervals** — remind you anywhere from every 15 minutes to every 2 hours. You're in control.
- **Stretch together** — optionally post to a Discord or Slack channel when you finish a break, so a friend group or team keeps each other moving.
- **Streak tracking** — see how many stretch breaks you've completed today.
- **Motivational finish** — a little confetti and a kind word when you complete your stretches. You earned it.

## Install

This extension isn't on the Chrome Web Store yet. To install it manually:

1. Clone this repo
   ```
   git clone https://github.com/annaPerdomo/intermezzo-extension.git
   ```
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked**
5. Select the `intermezzo-extension` folder

That's it. Intermezzo will appear in your toolbar.

## How it works

Click the extension icon to open the popup. From there you can:

- **Toggle reminders** on or off
- **Set your interval** — how often you want to be reminded
- **Stretch Now** — skip the wait and start a break immediately
- **See your history** — which stretches you've done today

When a reminder fires, you get a gentle system notification and a chime. Click it (or its **Stretch now** button) to open the guided break, or hit **Snooze** to be reminded again in a few minutes. Prefer the break to open on its own? Turn off **Notify before opening** in the popup and the break tab opens immediately instead.

Each exercise has a description, a visual, and a countdown timer. Navigate between exercises, skip if you need to, or follow the whole routine.

### Stretch together (optional)

Want to keep a friend group or team accountable? In the popup, paste a **Discord or Slack incoming webhook URL** and your name under "Stretch together." When you finish a break, MoveMore posts a short message to that channel — a friendly nudge for everyone else to move too. Leave it blank and nothing is ever sent. See [PRIVACY.md](PRIVACY.md) for details.

## Publishing

Want to share MoveMore with friends without the "Load unpacked" dance? See [STORE.md](STORE.md) for a step-by-step Chrome Web Store publishing guide, listing copy, and permission justifications.

## Design

Intermezzo uses a calm, earthy palette — sage greens, warm terracotta, soft creams — with frosted glass cards and gentle animations. It's designed to feel like a moment of peace, not another notification demanding your attention.

---

<p align="center">
  <em>Take care of yourself. You deserve it.</em>
</p>
