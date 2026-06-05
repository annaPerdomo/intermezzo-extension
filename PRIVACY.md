# Intermezzo — Privacy Policy

_Last updated: 2026-06-04_

Intermezzo is built to be private by default. It exists to gently remind you to
move, and it collects as little as possible to do that.

## What Intermezzo stores

All of your settings and activity stay **on your own device**, using Chrome's
local extension storage (`chrome.storage.local`). This includes:

- Your reminder settings (interval, exercises per break, delivery style, sound,
  and your "Mind moments" preference)
- Today's stretch history and your daily streak count
- An inactivity timer used to pause reminders while you're away
- Your optional accountability webhook URL and display name

### Mind moments (optional well-being check-ins)

If you use the optional "Mind moments" features, the following also stay **only
on your device** and are never sent anywhere:

- **Mood check-ins** — the one-tap "how are you feeling?" ratings you choose at
  the end of a break.
- **Saved notes** — anything you type into the "one small thing that went okay"
  prompt. These are kept as a small private list, just for you.

These are gentle self-reflection aids, **not** medical or clinical records, and
they are **never** included in the accountability webhook message (see below) or
sent to the developer or anyone else. The optional support resource that may
appear after several low check-ins is just a link — nothing about your moods or
notes leaves your device when it shows.

Intermezzo has **no account, no server, and no analytics**. None of this data is
sent to the developer or to any third party — with one exception that you turn
on yourself, described below.

## The optional accountability webhook

If — and only if — you paste a Discord or Slack **webhook URL** into the
"Stretch together" setting, Intermezzo will send a short message to that channel
when you complete a stretch break, for example:

> 🌿 Anna just finished a stretch break — 4 breaks today. Your turn to move?

The message contains only the display name you chose and your stretch-break
count for the day. It **never** includes your mood check-ins or saved notes. It
is sent directly from your browser to the URL you provided. Clearing the URL
field turns this off completely. Intermezzo never sends anything to a webhook you
did not configure.

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
