# Intermezzo — Privacy Policy

_Last updated: 2026-06-04_

Intermezzo is built to be private by default. It exists to gently remind you to
move, and it collects as little as possible to do that.

## What Intermezzo stores

All of your settings and activity stay **on your own device**, using Chrome's
local extension storage (`chrome.storage.local`). This includes:

- Your reminder settings (interval, exercises per break, delivery style, sound)
- Today's stretch history and your daily streak count
- An inactivity timer used to pause reminders while you're away
- Your optional accountability webhook URL and display name

Intermezzo has **no account, no server, and no analytics**. None of this data is
sent to the developer or to any third party — with one exception that you turn
on yourself, described below.

## The optional accountability webhook

If — and only if — you paste a Discord or Slack **webhook URL** into the
"Stretch together" setting, Intermezzo will send a short message to that channel
when you complete a stretch break, for example:

> 🌿 Anna just finished a stretch break — 4 breaks today. Your turn to move?

The message contains only the display name you chose and your stretch-break
count for the day. It is sent directly from your browser to the URL you
provided. Clearing the URL field turns this off completely. Intermezzo never
sends anything to a webhook you did not configure.

## Permissions and why they're used

- **alarms** — schedule your reminder intervals.
- **storage** — save your settings and streak locally.
- **notifications** — show the system notification that reminds you to stretch.
- **idle** — pause reminders when you step away, and resume when you're back.
- **offscreen** — play the reminder chime even when Chrome is in the background.
- **host access to discord.com / slack.com** — only used to deliver the optional
  accountability message to a webhook URL you enter yourself.

## Data deletion

Uninstalling Intermezzo removes all locally stored data. You can also clear your
webhook URL and name at any time from the popup.

## Contact

Questions about privacy? Open an issue on the project repository.
