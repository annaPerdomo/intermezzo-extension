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
//   • Prefer stable, well-established physio/PT or yoga channels.
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
  // Each video below was found via search and verified live through YouTube's
  // oEmbed endpoint — the title and creator credit are exactly as YouTube
  // reports them. "Walk & Hydrate" has no entry (it's not a demonstrable move).

  // --- Neck & upper traps ---
  "Neck Rolls": { url: "https://www.youtube.com/watch?v=2M80Mn0VBPw", creator: "Baptist Health" },
  "Chin Tucks": { url: "https://www.youtube.com/watch?v=3ctIwvT823s", creator: "Bob & Brad" },
  "Trapezius Release": { url: "https://www.youtube.com/watch?v=-r0eoFS7_5Q", creator: "AskDoctorJo" },
  "Levator Scapulae Stretch": { url: "https://www.youtube.com/watch?v=GSoXPJRnR6E", creator: "AskDoctorJo" },
  "Chin Tuck with Resistance": { url: "https://www.youtube.com/watch?v=ojeZxd2gwsI", creator: "Rehab Hero" },
  "Suboccipital Release": { url: "https://www.youtube.com/watch?v=W4Wbx5TzJcU", creator: "jjaimedc" },

  // --- Shoulders & upper back ---
  "Shoulder Shrugs & Rolls": { url: "https://www.youtube.com/watch?v=zx_j0GJt9e0", creator: "Eldergym" },
  "Scapular Squeeze": { url: "https://www.youtube.com/watch?v=WklUZWulQao", creator: "Rehab My Patient" },
  "Cross-Body Shoulder Stretch": { url: "https://www.youtube.com/watch?v=MzQYpR_QDss", creator: "Black Bear Physical Therapy" },
  "Eagle Arms": { url: "https://www.youtube.com/watch?v=vYWSiBnkUPg", creator: "Vive Health" },
  "Prone Y Raise": { url: "https://www.youtube.com/watch?v=2lfn680xvjU", creator: "Strength & Sport" },
  "Thread the Needle": { url: "https://www.youtube.com/watch?v=4qLJhgvK71M", creator: "Baseline Chiropractic (Dr. Kody Au)" },
  "Tennis Ball Rhomboid Release": { url: "https://www.youtube.com/watch?v=thr8mk6lkqE", creator: "Michael Braccio" },
  "Overhead Reach": { url: "https://www.youtube.com/watch?v=y4WOWce78TY", creator: "Live Lean TV Daily Exercises" },

  // --- Chest & posture ---
  "Chest Opener": { url: "https://www.youtube.com/watch?v=crnw1IKWNZY", creator: "St. Peter's Health" },
  "Doorway Chest Stretch": { url: "https://www.youtube.com/watch?v=g611uSgWfNc", creator: "IPA Physio" },
  "Wall Angels": { url: "https://www.youtube.com/watch?v=X8aFCLvh5lM", creator: "Dr. Carl Baird" },
  "Bruegger's Relief Position": { url: "https://www.youtube.com/watch?v=MHFlpc2h4q8", creator: "Dr. Kevin Wafer" },
  "Pec Minor Release": { url: "https://www.youtube.com/watch?v=1rHiAMy6Jxg", creator: "Catalyst Physical Therapy & Wellness" },
  "Wall Pec Stretch (Low Angle)": { url: "https://www.youtube.com/watch?v=Kvo7054R3fQ", creator: "James Kohler" },
  "Prone Cobra": { url: "https://www.youtube.com/watch?v=2Z7uGBbsvf8", creator: "GuerrillaZen Fitness" },

  // --- Spine & mobility ---
  "Seated Spinal Twist": { url: "https://www.youtube.com/watch?v=4faLXO2bLFU", creator: "CORE Chiropractic" },
  "Cat-Cow (Seated)": { url: "https://www.youtube.com/watch?v=L1DfQWQd28k", creator: "Dartmouth Health" },
  "Foam Roller Thoracic Extension": { url: "https://www.youtube.com/watch?v=qCrYe698zJU", creator: "Physio REHAB" },
  "Standing Forward Fold": { url: "https://www.youtube.com/watch?v=g7Uhp5tphAs", creator: "Yoga With Adriene" },
  "Nerve Glide — Median": { url: "https://www.youtube.com/watch?v=JFBh2AD9nz4", creator: "Bob & Brad" },
  "Standing Back Extension": { url: "https://www.youtube.com/watch?v=mrZE_3636sI", creator: "Rehab My Patient" },
  "Seated Forward Fold": { url: "https://www.youtube.com/watch?v=QRIKGOUJILs", creator: "Vive Health" },

  // --- Lower back ---
  "Knee-to-Chest Stretch": { url: "https://www.youtube.com/watch?v=LugNxxfIdvo", creator: "Baptist Health" },
  "Pelvic Tilts": { url: "https://www.youtube.com/watch?v=RZi6di5IjW8", creator: "Nottingham University Hospitals NHS Trust" },
  "Child's Pose": { url: "https://www.youtube.com/watch?v=vlbKaGclSfA", creator: "BODi" },
  "Supine Spinal Twist": { url: "https://www.youtube.com/watch?v=lyhWPzuGUHc", creator: "St. Peter's Health" },
  "Gentle Press-Up": { url: "https://www.youtube.com/watch?v=3Guxknrh-D4", creator: "Dr Pablo, the Performance Doc" },
  "Bird-Dog": { url: "https://www.youtube.com/watch?v=JM9MLYqMLjs", creator: "OUT-FIT Proud" },
  "Glute Bridge": { url: "https://www.youtube.com/watch?v=R1OXPHRqehw", creator: "Cleveland Clinic" },

  // --- Hips, glutes & legs ---
  "Hip Flexor Stretch": { url: "https://www.youtube.com/watch?v=KeK1LFY_crc", creator: "Christopher Johnson" },
  "Figure-4 Stretch": { url: "https://www.youtube.com/watch?v=2VE_NLcNMvQ", creator: "AskDoctorJo" },
  "Seated Pigeon Pose": { url: "https://www.youtube.com/watch?v=x170rAbXvZc", creator: "Mobility Doc" },
  "IT Band & Outer Hip Stretch": { url: "https://www.youtube.com/watch?v=wzDoSQ8-GWY", creator: "AskDoctorJo" },
  "Adductor Stretch": { url: "https://www.youtube.com/watch?v=jiy7F8Z8WIA", creator: "White Lion Strong-Gym" },
  "90/90 Hip Stretch": { url: "https://www.youtube.com/watch?v=_rzJ1RXhM90", creator: "Live Lean TV Daily Exercises" },
  "Standing Hamstring Stretch": { url: "https://www.youtube.com/watch?v=9ESpoUPqpFw", creator: "Live Lean TV Daily Exercises" },
  "Standing Quad Stretch": { url: "https://www.youtube.com/watch?v=kzAsm4WQqvQ", creator: "PureGym" },

  // --- Wrists, calves & ankles ---
  "Wrist Flexor Stretch": { url: "https://www.youtube.com/watch?v=i-JV2PsFzWA", creator: "AskDoctorJo" },
  "Wrist Extensor Stretch": { url: "https://www.youtube.com/watch?v=_uINTR_7X-g", creator: "Baptist Health" },
  "Calf Raises": { url: "https://www.youtube.com/watch?v=QgrGg9pGSZ8", creator: "Doctor O'Donovan" },
  "Ankle Pumps & Circles": { url: "https://www.youtube.com/watch?v=7l_r2LBD2t4", creator: "The Doctors of Physical Therapy" },

  // --- Eye rest ---
  "20-20-20 Eye Break": { url: "https://www.youtube.com/watch?v=hfjQUgVeBkc", creator: "Centre For Sight Eye Institute and Hospitals" },
  "Eye Palming": { url: "https://www.youtube.com/watch?v=KaFqjkcY_4A", creator: "Cleveland Clinic" },
  "Near-Far Focus Shifts": { url: "https://www.youtube.com/watch?v=RazY0KvFvqA", creator: "Dr. Sam Berne" },
  "Slow Eye Circles": { url: "https://www.youtube.com/watch?v=0XZxpMoqvBw", creator: "Elemental Yoga and the Mind Arts" },
};

// Get the credited video for a stretch by name, or null if none is curated yet.
function getStretchVideo(name) {
  const v = STRETCH_VIDEOS[name];
  if (!v || !v.url) return null;
  return v;
}
