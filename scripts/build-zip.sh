#!/usr/bin/env bash
# Build the Chrome Web Store upload zip from an explicit allowlist of runtime files.
# Usage: scripts/build-zip.sh   (run from the project root)
#
# Allowlist beats exclude-list here: the repo contains a whole marketing site
# (site/), demo pages (gallery.html, sounds-preview.*), source prompt sheets,
# and docs that must NOT ship inside the extension. We name only what the
# extension actually loads at runtime.
set -euo pipefail

cd "$(dirname "$0")/.."

VERSION=$(grep -oE '"version"[[:space:]]*:[[:space:]]*"[^"]+"' manifest.json | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
OUT="intermezzo-${VERSION}.zip"
rm -f "$OUT"

# Runtime files referenced by manifest.json + the extension HTML pages.
FILES=(
  manifest.json
  background.js
  popup.html popup.css popup.js
  reminder.html reminder.css reminder.js
  offscreen.html offscreen.js
  sounds.js
  stretch-illustrations.js
  stretch-videos.js
  timer-phases.js
  icons
  fonts
  illustrations
)

# Fail loudly if anything in the allowlist is missing.
for f in "${FILES[@]}"; do
  [ -e "$f" ] || { echo "ERROR: missing runtime file: $f" >&2; exit 1; }
done

zip -r "$OUT" "${FILES[@]}" -x "*.DS_Store" >/dev/null

echo "Built $OUT (version $VERSION)"
echo "  $(unzip -l "$OUT" | tail -1 | awk '{print $2}') files, $(du -h "$OUT" | cut -f1)"
echo "Upload at https://chrome.google.com/webstore/devconsole"
