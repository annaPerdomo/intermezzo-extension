# Illustration Cohesion Restyle

Restyle only the PNGs in `illustrations/` that do **not** have a matching sibling named
`<slug>.old.png`.

Scope examples:

- Process `illustrations/wall-angels.png` when `illustrations/wall-angels.old.png` does not exist.
- Skip `illustrations/cat-cow-seated.png` when `illustrations/cat-cow-seated.old.png` exists.
- Never process files ending in `.old.png`.
- Leave `illustrations/walk-and-hydrate.png` unchanged. Use it only as the hair and figure-design
  reference.
- Use `illustrations/restyled/5-4-3-2-1-grounding.png` as the canonical reference for line weight,
  line opacity, color visibility, and overall legibility.

## Target Style

Apply the following style consistently to every eligible illustration:

- Use deep desaturated ink-navy `#2A3048` for all figure and object line work.
- Match the apparent line weight of `illustrations/restyled/5-4-3-2-1-grounding.png` at the final
  `400x400` size. The grounding illustration is the source of truth; do not rely on a generated-size
  pixel calculation when it conflicts with the visual match.
- Use the same stroke width for the body, hair, clothing, props, and motion accents. Small
  anti-aliased edge differences are acceptable, but no element should look intentionally thicker
  or thinner than another.
- Use clearly visible, medium-light, even strokes with smooth rounded caps and joins.
- Lines must remain easy to see at normal display size. Do not use hairline, faint, delicate,
  ultra-fine, or low-opacity strokes.
- Keep the artwork calm and clean: no bold, sketchy, doubled, or pencil-textured lines.
- Use pure outlines only. Do not add filled hair, solid shapes, shading, gradients, or texture.
- Eye-exercise exception: `20-20-20-eye-break.png`, `near-far-focus-shifts.png`, and
  `slow-eye-circles.png` may use a flat muted blue-slate `#66758A` iris fill and a small flat
  `#F4F4F7` circular highlight. Their sight lines, focus arrows, motion paths, arrowheads, and
  target circles must use `#8490A8`.
- `eye-palming.png` remains outline-only because the eyes are covered. Its side relaxation marks
  must use `#8490A8`.
- Do not draw facial features: no eyes, nose, mouth, eyebrows, or eyelashes.
- Keep bodies gender-neutral, with relaxed, simple proportions and clothing indicated by only a
  few light lines.
- Use soft lavender-slate `#8490A8` only for motion arrows and motion curves. Do not use yellow,
  orange, peach, or spark-like emphasis marks.
- Use a transparent background with no border, shadow, glow, or environmental backdrop.
- Center each illustration with generous and visually consistent padding.
- Preserve the source pose, framing, props, exercise mechanics, and motion direction exactly.

## Hair Standard

Use `illustrations/walk-and-hydrate.png` as the exact hair reference for all human figures:

- Give every visible head the same simple, androgynous short hairstyle.
- Match its rounded, close-to-the-head outer silhouette and single smooth side-swept interior
  curve.
- Draw the hair as thin navy outlines only, with no fill, strands, texture, highlights, or extra
  detail.
- Keep the face completely blank.
- Adapt the same hairstyle naturally to side, rear, tilted, or partially obscured head angles
  without changing its recognizable design.
- When the pose or viewing angle makes hair inappropriate or invisible, do not invent visible
  hair merely to force it into the image.

`walk-and-hydrate.png` is the reference for figure treatment and especially hair.
`illustrations/restyled/5-4-3-2-1-grounding.png` is the reference for stroke thickness, darkness,
and visibility. The existing peach and yellow accents in `walk-and-hydrate.png` are **not**
reference colors; the target colors above take precedence.

## Prompt Construction

Every image-edit prompt must identify all three image roles explicitly:

- The current original PNG is the edit target and controls pose, framing, props, and motion.
- `walk-and-hydrate.png` controls hair shape and simplified figure treatment.
- `illustrations/restyled/5-4-3-2-1-grounding.png` controls exact apparent stroke weight, opacity,
  navy color visibility, rounded line treatment, and padding.

Include this instruction verbatim in every generation and retry prompt:

> Match the visible line weight and darkness of the approved 5-4-3-2-1 Grounding restyle. At
> 400x400, the new illustration must be equally easy to see. Do not make the lines thinner,
> fainter, more delicate, or more transparent than that reference.

Do not use phrases such as `extremely fine`, `hairline`, `ultra-thin`, or generated-size targets
such as `2-3 px at 1024x1024`. Those instructions produced lines that became too faint after
resizing.

## Workflow

At the start of the first session:

1. Compute and print the exact eligible file list using the matching-sibling rule above.
2. Confirm that the expected set contains 25 images after excluding `walk-and-hydrate.png`.
3. Sort the list alphabetically and preserve that order for all later batches.

Create `illustrations/restyled/` and write each result there using the original filename. Do not
overwrite, rename, or modify anything directly in `illustrations/`.

## Batch Limit

Work on exactly one batch of no more than four illustrations per session:

1. Select the next four eligible files in alphabetical order that do not already have an accepted
   output in `illustrations/restyled/`.
2. Open and inspect only those four source images, `walk-and-hydrate.png`, and the approved
   `illustrations/restyled/5-4-3-2-1-grounding.png` line-weight reference. Do not inspect or
   generate any later images during this session.
3. Briefly note the four sources' main style deviations, including their apparent line width.
4. Generate and visually review only those four outputs.
5. Re-run failed images within the same batch until all four pass or a specific blocker is found.
6. Print the batch report and stop. Wait for an explicit request to continue before opening or
   processing the next batch.

For the final batch, process whichever eligible files remain, even if fewer than four.

Feed each original PNG into the image-edit operation so its pose and composition remain intact.

After every batch, visually compare each output against:

- Its source, to confirm that the pose, framing, props, and motion direction were preserved.
- `walk-and-hydrate.png`, to compare figure treatment, spacing, and hair.
- `illustrations/restyled/5-4-3-2-1-grounding.png`, to compare line thickness, darkness,
  visibility, rounded line treatment, and padding.
- All previously accepted outputs, to maintain consistency across the complete set.

Re-run any output that contains:

- Facial features or visibly different hair.
- Filled regions, shading, texture, heavy lines, uneven strokes, or visibly inconsistent line
  widths.
- Lines that are thinner, fainter, or harder to see than the approved grounding reference.
- Incorrect line or motion-accent colors.
- Lost or altered pose details, props, framing, or motion direction.
- An opaque background, baked-in glow, border, or inconsistent padding.

For line-width QA, inspect each output at `100%` size after resizing to `400x400`, directly beside
the approved grounding reference. Figure outlines, hair, clothing, props, and arrows must have the
same apparent weight and visibility as the grounding illustration. Reject obvious `1 px` or
hairline details, low-opacity lines, tapered brush strokes, mixed bold and fine sections, or any
result that disappears sooner than the grounding reference when viewed at normal size. A solid
`2-3 px` appearance is acceptable when it visually matches the reference.

Do not use post-processing to compensate for a failed line weight by thinning, expanding, eroding,
or dilating the generated artwork. Regenerate from the original source with the approved grounding
image as the visual line-weight reference. Post-processing may only remove the chroma-key
background, normalize the two exact colors, and resize once to `400x400`.

## Output Requirements

Verify that every final output:

- Is a `400x400` PNG.
- Has a genuinely transparent background.
- Is centered with generous, consistent padding.
- Uses `#2A3048` for figure and object outlines.
- Uses `#8490A8` only for motion accents.
- Uses the same clearly visible apparent stroke width and opacity as
  `illustrations/restyled/5-4-3-2-1-grounding.png`, approximately `2-3 px` at the final `400x400`
  size, across the figure, hair, clothing, props, and motion accents.
- Uses the `walk-and-hydrate.png` hairstyle wherever hair is visible.
- Is faceless and gender-neutral.
- Contains no fills, shading, gradients, texture, borders, or glow.
- Eye-exercise exceptions may contain the approved flat iris fills, highlights, and lavender-slate
  action elements described above.
- Preserves the original exercise pose and meaning.

Do not process all 25 illustrations in one session. Complete one batch, report its results, and
stop. Once all batches are eventually complete, print a final report listing every eligible file,
whether it passed initially or required regeneration, and any remaining concerns.

## Current Acceptance State

- Expanded scope override: restyle every base PNG in `illustrations/` that does not yet have an
  accepted output in `illustrations/restyled/`, even when a matching `<slug>.old.png` backup
  exists. Continue to use the base PNG as the edit target and never process the `.old.png` file.
- Accepted canonical reference: `5-4-3-2-1-grounding.png`.
- Accepted after regeneration against the canonical line-weight reference:
  `20-20-20-eye-break.png`, `90-90-hip-stretch.png`, and `a-gentle-check-in.png`.
- Accepted eye-exercise family: `eye-palming.png`, `near-far-focus-shifts.png`, and
  `slow-eye-circles.png`.
- Accepted batch: `a-kind-word-to-yourself.png`, `bruegger-s-relief-position.png`,
  `cross-body-shoulder-stretch.png`, and `eagle-arms.png`.
- Accepted batch: `figure-4-stretch.png`, `knee-to-chest-stretch.png`,
  `name-the-feeling.png`, and `nerve-glide-median.png`.
- Accepted batch: `one-small-reach.png`, `overhead-reach.png`, `prone-cobra.png`,
  and `prone-y-raise.png`. The first `prone-cobra.png` generation was rejected because it changed
  the source into a hands-under-shoulders press-up; the accepted regeneration preserves arms
  extended back alongside the torso.
- Accepted batch: `scapular-squeeze.png`, `standing-forward-fold.png`,
  `tennis-ball-rhomboid-release.png`, and `thread-the-needle.png`.
- Accepted final batch: `three-slow-breaths.png` and `wall-angels.png`.
- Accepted expanded-scope batch: `adductor-stretch.png`, `ankle-pumps-and-circles.png`,
  `bird-dog.png`, and `calf-raises.png`. `ankle-pumps-and-circles.png` and `calf-raises.png`
  required regeneration to remove facial-profile details.
- Accepted expanded-scope batch: `cat-cow-seated.png`, `chest-opener.png`,
  `child-s-pose.png`, `chin-tuck-with-resistance.png`, and `chin-tucks.png`.
  `cat-cow-seated.png` required regeneration to remove facial-profile details;
  `chest-opener.png` required regeneration for rear-view hair treatment; and
  `chin-tuck-with-resistance.png` required regeneration to preserve the source hand placement.
- Accepted expanded-scope batch: `doorway-chest-stretch.png`,
  `foam-roller-thoracic-extension.png`, `gentle-press-up.png`, `glute-bridge.png`,
  and `hip-flexor-stretch.png`.
- Accepted expanded-scope batch: `it-band-and-outer-hip-stretch.png`,
  `levator-scapulae-stretch.png`, `neck-rolls.png`, `pec-minor-release.png`,
  and `pelvic-tilts.png`.
