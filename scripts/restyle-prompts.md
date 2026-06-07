# Illustration Restyle

Goal: make all 52 exercise illustrations look like **one cohesive set** in the calm
"Interlude" line style — deep ink-navy fine lines, no fills, no faces, soft lavender-slate
motion accents, transparent background. The peach glow seen in the app is a CSS layer behind
the figure, **not** baked into the PNG.

## Target style (every illustration must match)

- **One line color:** deep desaturated ink-navy `#2A3048` for all line work.
- **Thin, light, even** stroke weight, smooth rounded caps. Fine-lined and calm — not bold,
  not sketchy, no double-lines, no pencil texture.
- **Pure outline.** No color fills anywhere — no filled hair, no solid shapes, no shading.
- **No facial features at all:** blank head, no eyes/nose/mouth/eyelashes. Simple androgynous
  short hair or plain head shape. Gender-neutral body — relaxed, simple proportions, neither
  curvy nor muscular; clothing suggested with a few light lines.
- **Motion accents** in soft lavender-slate `#8490A8` only — thin arrows/curves at the same
  light weight as the body lines. No yellow, no orange, no peach, no "spark" emphasis marks.
- **Transparent background**, centered, generous padding. No canvas border, no baked-in glow.
- **Keep each pose exactly** — body position, framing, motion direction. Only the style changes.

`walk-and-hydrate.png` is the closest existing image to this look — use it as the north star.

---

## Restyle all illustrations at once

This script restyles **every** `illustrations/*.png` (skipping `*.old.png`) in one run via the
OpenAI images/edits endpoint (`gpt-image-1`). Each source PNG is fed in so the pose is preserved.
Outputs land in `illustrations/restyled/` — review them, then move the good ones over the originals.

Requires: `bash`, `curl`, `python3`, and `sips` (macOS, for resize). `OPENAI_API_KEY` must be set.

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IN_DIR="$ROOT/illustrations"
OUT_DIR="$ROOT/illustrations/restyled"
MODEL="gpt-image-1"
GEN_SIZE="1024x1024"     # gpt-image-1: 1024x1024 | 1024x1536 | 1536x1024 | auto
FINAL_SIZE="400"         # originals are 400x400
QUALITY="high"           # low | medium | high
PARALLEL="${PARALLEL:-3}" # concurrent requests; lower if you hit rate limits

read -r -d '' PROMPT <<'EOF' || true
Restyle this exercise illustration into a single cohesive calm line-art style.
Keep the EXACT same pose, body position, framing, and motion direction — change only the style.

- ONE line color: deep desaturated ink-navy #2A3048 for ALL line work.
- Thin, light, even stroke weight with smooth rounded caps. Fine-lined and calm — not bold,
  not sketchy, no double-lines, no pencil texture.
- Pure outline. NO color fills anywhere — no filled hair, no solid shapes, no shading.
- NO facial features at all: blank head, no eyes/nose/mouth/eyelashes. Simple androgynous short
  hair or plain head shape. Gender-neutral body — relaxed simple proportions, neither curvy nor
  muscular; clothing suggested with a few light lines.
- Motion accents in soft lavender-slate #8490A8 only — thin arrows/curves at the same light
  weight as the body lines. No yellow, no orange, no peach, no "spark" emphasis marks.
- Transparent background, centered, generous padding. No canvas border, no shading, no
  background glow.
EOF

[[ -n "${OPENAI_API_KEY:-}" ]] || { echo "ERROR: OPENAI_API_KEY is not set." >&2; exit 1; }
mkdir -p "$OUT_DIR"

restyle_one() {
  local src="$1" slug out
  slug="$(basename "$src" .png)"
  out="$OUT_DIR/$slug.png"
  echo "==> $slug"
  if ! curl -sS https://api.openai.com/v1/images/edits \
      -H "Authorization: Bearer $OPENAI_API_KEY" \
      -F "model=$MODEL" \
      -F "image[]=@$src" \
      -F "size=$GEN_SIZE" \
      -F "quality=$QUALITY" \
      -F "background=transparent" \
      -F "prompt=$PROMPT" \
    | python3 - "$out" <<'PY'
import sys, json, base64
out = sys.argv[1]
data = json.load(sys.stdin)
if "error" in data:
    sys.stderr.write("   API error: %s\n" % data["error"].get("message", data["error"])); sys.exit(2)
try:
    b64 = data["data"][0]["b64_json"]
except (KeyError, IndexError):
    sys.stderr.write("   Unexpected response: %s\n" % json.dumps(data)[:400]); sys.exit(2)
open(out, "wb").write(base64.b64decode(b64))
print("   wrote", out)
PY
  then
    echo "   FAILED $slug" >&2; return 1
  fi
  command -v sips >/dev/null && sips -Z "$FINAL_SIZE" "$out" >/dev/null && echo "   resized ${FINAL_SIZE}px"
}
export -f restyle_one
export OUT_DIR MODEL GEN_SIZE FINAL_SIZE QUALITY PROMPT OPENAI_API_KEY

# Every illustration except the *.old.png backups, restyled $PARALLEL at a time.
find "$IN_DIR" -maxdepth 1 -name '*.png' ! -name '*.old.png' -print0 \
  | xargs -0 -P "$PARALLEL" -I {} bash -c 'restyle_one "$@"' _ {}

echo
echo "Done. Review $OUT_DIR, then move the keepers over the originals in $IN_DIR."
```

### Run it

```bash
export OPENAI_API_KEY=sk-...
PARALLEL=3 bash scripts/restyle-all.sh      # if you save the block above as a file
# or paste the block straight into a terminal
```

Tips:
- Review `illustrations/restyled/` side by side before promoting — line color, weight, the
  faceless head, lavender accents, and no fills should look identical across the set.
- Re-run individual slugs by pointing `find` at a single file, or just delete the bad outputs
  and rerun (existing good ones get overwritten harmlessly).
- Lower `PARALLEL` if you hit rate limits; raise it to go faster.

---

## Per-file motion cues (reference)

The edits endpoint preserves the pose from the source image, so these are just a sanity check
for what each illustration should show.

### Neck & upper
- **neck-rolls** — Seated figure from behind; circular arrow (halo) around the head.
- **chin-tucks** — Side profile; arrow showing the chin pulling straight back.
- **trapezius-release** — Hand over the top of the head pulling it toward the shoulder; arrow at the top of the head.
- **levator-scapulae-stretch** — Head turned ~45°, chin dropped toward the armpit, hand on the back of the head; downward arrow.
- **chin-tuck-with-resistance** — Fingers on the chin pushing it back while resisting; arrow at the chin.
- **suboccipital-release** — Lying on the back, two dots at the base of the skull (tennis balls).

### Shoulders / chest / arms
- **shoulder-shrugs-and-rolls** — Seated, shoulders lifted toward the ears; upward arrows + a small roll-back circular arrow.
- **chest-opener** — Standing, hands clasped behind the back, arms lifted; arrow lifting the arms up and back.
- **doorway-chest-stretch** — Forearms on a doorframe at shoulder height, one foot forward, leaning in; arrow opening across the chest.
- **pec-minor-release** — Facing a corner, a ball pressed below the collarbone, leaning in; dot at the release point.
- **wall-pec-stretch-low-angle** — Beside a wall, forearm on it elbow below shoulder (~45°), body turned away; arrow at the lower chest.
- **overhead-reach** — Standing, fingers interlaced palms up reaching overhead, gentle side lean; arrow showing the lean.

### Wrists
- **wrist-flexor-stretch** — One arm forward palm up, other hand pulling the fingers down and back; arrow at the fingers.
- **wrist-extensor-stretch** — One arm forward palm down, fingers pointing to the floor, other hand drawing the back of the hand in; arrow at the back of the hand.

### Lower back (lying / seated)
- **knee-to-chest-stretch** — Lying on the back, one knee hugged toward the chest; arrow pulling the knee in.
- **pelvic-tilts** — Lying on the back, knees bent, pelvis tilted to flatten the lower back; curved arrow at the pelvis.
- **child-s-pose** — From hands and knees, hips sat back toward the heels, arms reaching forward, forehead down; arrow settling back and down.
- **supine-spinal-twist** — Lying on the back, arms in a T, bent knees dropped to one side, head turned the other way; curved arrow showing the twist.
- **gentle-press-up** — Lying face down on the forearms (sphinx), hips relaxed, lower back gently extended; arrow lifting the chest.
- **standing-back-extension** — Standing, hands on the lower back, leaning gently back; arrow showing the backward lean.
- **seated-forward-fold** — Seated at the front of a chair, folded forward between the knees, arms and head heavy; downward fold arrow.
- **seated-spinal-twist** — Seated tall, hand on the opposite knee, torso twisting, looking over the shoulder; curved rotation arrow.
- **cat-cow-seated** — Seated on the edge of a chair, hands on knees, spine arching then rounding; curved spinal-flex arrow.
- **prone-cobra** — Lying face down, arms at the sides palms down, chest lifted, shoulder blades squeezed; arrow lifting the chest.
- **foam-roller-thoracic-extension** — Lying back over a foam roller across the spine, knees bent, arms falling open; arrow showing the chest opening.

### Hips / glutes / legs
- **hip-flexor-stretch** — Standing lunge, one foot back, front knee bent, hips sinking forward; arrow at the front of the back hip.
- **figure-4-stretch** — Seated, ankle crossed over the opposite knee, leaning forward with a gentle press; arrow pressing the knee down.
- **seated-pigeon-pose** — Seated in a chair, ankle on the opposite thigh, leaning forward from the hips; forward-lean arrow.
- **it-band-and-outer-hip-stretch** — Standing, one foot crossed behind, hips leaning to the side, opposite arm overhead; arrow along the outer side.
- **adductor-stretch** — Wide stance, toes out, weight on one bent knee, other leg straight; arrow at the inner straight-leg thigh.
- **90-90-hip-stretch** — Seated on the floor, front leg bent 90° in front, other leg 90° to the side, leaning over the front shin; forward-lean arrow.
- **glute-bridge** — Lying on the back, knees bent, hips lifted into a straight line; upward arrow at the hips.
- **standing-hamstring-stretch** — Standing, one heel on a low surface leg straight, hinging forward, back long; arrow up the back of the straight thigh.
- **standing-quad-stretch** — Standing holding a chair, one ankle caught behind, heel drawn toward the glute, knees together; arrow at the heel.

### Movement / circulation
- **bird-dog** — On all fours, one arm forward and the opposite leg back, level with the spine; arrows extending the arm and leg.
- **calf-raises** — Standing behind a chair, rising onto the toes; upward arrow at the heels.
- **ankle-pumps-and-circles** — Seated, one foot lifted, toes pointing then flexing; circular arrow tracing ankle circles.
- **walk-and-hydrate** — Cheerful figure walking with a water bottle; light motion lines suggesting the walk.

### Eyes
- **20-20-20-eye-break**, **eye-palming**, **near-far-focus-shifts**, **slow-eye-circles** — eye-care
  pictograms; restyle the line color/weight to match but keep their simple icon framing.

### Newer additions
- **bruegger-s-relief-position**, **cross-body-shoulder-stretch**, **eagle-arms**,
  **nerve-glide-median**, **prone-y-raise**, **scapular-squeeze**, **standing-forward-fold**,
  **tennis-ball-rhomboid-release**, **thread-the-needle**, **wall-angels** — restyle to the same
  target; keep whatever pose the source PNG already shows.
