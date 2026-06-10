// Optional "see it in motion" links for each exercise.
//
// The diagram is always the primary guide — these are a bonus for anyone who
// wants to watch the movement. Each entry links OUT to YouTube (opened in a new
// tab); nothing is embedded, so the break stays calm and self-contained and a
// dead link is just a missing nicety rather than a broken screen.
//
// Curation rules (so this stays fair and durable):
//   • One hand-vetted video per exercise — never a search-results link.
//   • Always credit the creator by name; the link sends them real traffic.
//   • Prefer accredited hospitals / health systems (e.g. Cleveland Clinic, HSS,
//     NHS trusts); fall back to established physio/PT or yoga channels.
//   • Keep each clip short — close to the exercise's own length (aim ≤ ~90s),
//     so the demo matches the break rather than running long.
//   • Missing entries are fine — they simply render no link.
//
// Format, keyed by the exact `name` used in background.js / stretch-illustrations.js:
//   "Exercise Name": { url: "https://www.youtube.com/watch?v=...", creator: "Channel Name" },
//
// Example (replace with a real, watched-and-verified video before shipping):
//   "Standing Hamstring Stretch": {
//     url: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
//     creator: "Jane Physio",
//   },

const STRETCH_VIDEOS = {
  // Each video below was found via search and verified live: YouTube's oEmbed
  // endpoint confirms it's public and gives the creator credit (lightly
  // normalized to the recognizable org name where the channel handle is opaque),
  // and the watch page's lengthSeconds confirms the clip is short and roughly
  // matches the exercise length. "Walk & Hydrate" has no entry (not a
  // demonstrable move).

  // --- Neck & upper traps ---
  "Neck Rolls": { url: "https://www.youtube.com/watch?v=2M80Mn0VBPw", creator: "Baptist Health" },
  "Chin Tucks": { url: "https://www.youtube.com/watch?v=ofJZP02m97U", creator: "Cleveland Clinic" },
  "Trapezius Release": { url: "https://www.youtube.com/watch?v=A9S943jMPkg", creator: "Intermountain Health" },
  "Levator Scapulae Stretch": { url: "https://www.youtube.com/watch?v=GSoXPJRnR6E", creator: "AskDoctorJo" },
  "Chin Tuck with Resistance": { url: "https://www.youtube.com/watch?v=ojeZxd2gwsI", creator: "Rehab Hero" },
  "Suboccipital Release": { url: "https://www.youtube.com/watch?v=W4Wbx5TzJcU", creator: "jjaimedc" },

  // --- Shoulders & upper back ---
  "Shoulder Shrugs & Rolls": { url: "https://www.youtube.com/watch?v=wVXK4DUoSj8", creator: "Cleveland Clinic" },
  "Scapular Squeeze": { url: "https://www.youtube.com/watch?v=u_7VgcoVbpQ", creator: "Arthritis Foundation" },
  "Cross-Body Shoulder Stretch": { url: "https://www.youtube.com/watch?v=OkYq7A3LEvw", creator: "Husky Orthopaedics (UW Medicine)" },
  "Eagle Arms": { url: "https://www.youtube.com/watch?v=pWNWarqhIsE", creator: "Travis Eliot" },
  "Prone Y Raise": { url: "https://www.youtube.com/watch?v=juoKsTqy77E", creator: "PhysioExercise" },
  "Thread the Needle": { url: "https://www.youtube.com/watch?v=ds3umIYJDrE", creator: "Freedom Physical Therapy Services" },
  "Tennis Ball Rhomboid Release": { url: "https://www.youtube.com/watch?v=thr8mk6lkqE", creator: "Michael Braccio" },
  "Overhead Reach": { url: "https://www.youtube.com/watch?v=y4WOWce78TY", creator: "Live Lean TV Daily Exercises" },

  // --- Chest & posture ---
  "Chest Opener": { url: "https://www.youtube.com/watch?v=crnw1IKWNZY", creator: "St. Peter's Health" },
  "Doorway Chest Stretch": { url: "https://www.youtube.com/watch?v=LETL7QyfjWU", creator: "Rady Children's Health - Orange County" },
  "Wall Angels": { url: "https://www.youtube.com/watch?v=X8aFCLvh5lM", creator: "Dr. Carl Baird" },
  "Bruegger's Relief Position": { url: "https://www.youtube.com/watch?v=MHFlpc2h4q8", creator: "Dr. Kevin Wafer" },
  "Pec Minor Release": { url: "https://www.youtube.com/watch?v=1rHiAMy6Jxg", creator: "Catalyst Physical Therapy & Wellness" },
  "Wall Pec Stretch (Low Angle)": { url: "https://www.youtube.com/watch?v=Kvo7054R3fQ", creator: "James Kohler" },
  "Prone Cobra": { url: "https://www.youtube.com/watch?v=tl5SVd0Tcd8", creator: "ReflexClinic" },

  // --- Spine & mobility ---
  "Seated Spinal Twist": { url: "https://www.youtube.com/watch?v=sI44ZU33DjA", creator: "Cleveland Clinic" },
  "Cat-Cow (Seated)": { url: "https://www.youtube.com/watch?v=L1DfQWQd28k", creator: "Dartmouth Health" },
  "Foam Roller Thoracic Extension": { url: "https://www.youtube.com/watch?v=_KVE3qEytJ4", creator: "3DPT" },
  "Standing Forward Fold": { url: "https://www.youtube.com/watch?v=bLbvNBUlORY", creator: "Atlantic Physical Therapy Center" },
  "Nerve Glide — Median": { url: "https://www.youtube.com/watch?v=-5gQeBvg_0A", creator: "Kingston and Richmond NHS Foundation Trust" },
  "Standing Back Extension": { url: "https://www.youtube.com/watch?v=B2JbQVc7yOA", creator: "Hospital for Special Surgery" },
  "Seated Forward Fold": { url: "https://www.youtube.com/watch?v=PUVTGBARpoo", creator: "Hospital for Special Surgery" },

  // --- Lower back ---
  "Knee-to-Chest Stretch": { url: "https://www.youtube.com/watch?v=LugNxxfIdvo", creator: "Baptist Health" },
  "Pelvic Tilts": { url: "https://www.youtube.com/watch?v=RZi6di5IjW8", creator: "Nottingham University Hospitals NHS Trust" },
  "Child's Pose": { url: "https://www.youtube.com/watch?v=PaO3kYxTiqE", creator: "Oxford University Hospitals NHS" },
  "Supine Spinal Twist": { url: "https://www.youtube.com/watch?v=lyhWPzuGUHc", creator: "St. Peter's Health" },
  "Gentle Press-Up": { url: "https://www.youtube.com/watch?v=P38STT4wM28", creator: "Hospital for Special Surgery" },
  "Bird-Dog": { url: "https://www.youtube.com/watch?v=JM9MLYqMLjs", creator: "OUT-FIT Proud" },
  "Glute Bridge": { url: "https://www.youtube.com/watch?v=R1OXPHRqehw", creator: "Cleveland Clinic" },

  // --- Hips, glutes & legs ---
  "Hip Flexor Stretch": { url: "https://www.youtube.com/watch?v=mzPvzMivukw", creator: "Hospital for Special Surgery" },
  "Figure-4 Stretch": { url: "https://www.youtube.com/watch?v=2VE_NLcNMvQ", creator: "AskDoctorJo" },
  "Seated Pigeon Pose": { url: "https://www.youtube.com/watch?v=x170rAbXvZc", creator: "Mobility Doc" },
  "IT Band & Outer Hip Stretch": { url: "https://www.youtube.com/watch?v=fJ6TUTIz8dM", creator: "Nuffield Health" },
  "Adductor Stretch": { url: "https://www.youtube.com/watch?v=jiy7F8Z8WIA", creator: "White Lion Strong-Gym" },
  "90/90 Hip Stretch": { url: "https://www.youtube.com/watch?v=_rzJ1RXhM90", creator: "Live Lean TV Daily Exercises" },
  "Standing Hamstring Stretch": { url: "https://www.youtube.com/watch?v=dmwQg2djOOM", creator: "Nuffield Health" },
  "Standing Quad Stretch": { url: "https://www.youtube.com/watch?v=kzAsm4WQqvQ", creator: "PureGym" },

  // --- Wrists, calves & ankles ---
  "Wrist Flexor Stretch": { url: "https://www.youtube.com/watch?v=i-JV2PsFzWA", creator: "AskDoctorJo" },
  "Wrist Extensor Stretch": { url: "https://www.youtube.com/watch?v=_uINTR_7X-g", creator: "Baptist Health" },
  "Calf Raises": { url: "https://www.youtube.com/watch?v=QgrGg9pGSZ8", creator: "Doctor O'Donovan" },
  "Ankle Pumps & Circles": { url: "https://www.youtube.com/watch?v=KxfFzSOAT7g", creator: "Michigan Medicine" },

  // --- Eye rest ---
  "20-20-20 Eye Break": { url: "https://www.youtube.com/watch?v=hfjQUgVeBkc", creator: "Centre For Sight Eye Institute and Hospitals" },
  "Eye Palming": { url: "https://www.youtube.com/watch?v=KaFqjkcY_4A", creator: "Cleveland Clinic" },
  "Near-Far Focus Shifts": { url: "https://www.youtube.com/watch?v=Tz1eBn4mpTk", creator: "Bellaire Family Eye Care" },
  "Slow Eye Circles": { url: "https://www.youtube.com/watch?v=0XZxpMoqvBw", creator: "Elemental Yoga and the Mind Arts" },
};

// Get the credited video for a stretch by name, or null if none is curated yet.
function getStretchVideo(name) {
  const v = STRETCH_VIDEOS[name];
  if (!v || !v.url) return null;
  return v;
}
