const ALARM_NAME = "movemore-reminder";

// Body area categories for smart mixing
const AREA = {
  NECK: "neck",
  SHOULDERS_UPPER_BACK: "shoulders_upper_back",
  CHEST_POSTURE: "chest_posture",
  SPINE: "spine",
  HIPS_GLUTES: "hips_glutes",
  LOWER_BODY: "lower_body",
  WRISTS_ARMS: "wrists_arms",
  FULL_BODY: "full_body",
};

const STRETCHES = [
  {
    name: "Neck Rolls",
    duration: "30 seconds",
    description: "Slowly roll your head in a full circle — chin to chest, ear to shoulder, head back, other ear to shoulder. Do 3 circles each direction.",
    focus: "Neck & upper traps",
    area: AREA.NECK,
    priority: 1
  },
  {
    name: "Shoulder Shrugs & Rolls",
    duration: "30 seconds",
    description: "Raise both shoulders up toward your ears, hold for 2 seconds, then roll them back and down. Repeat 8 times.",
    focus: "Shoulders & upper back",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 1
  },
  {
    name: "Seated Spinal Twist",
    duration: "40 seconds",
    description: "Sit tall, place your right hand on your left knee. Gently twist your torso to the left, looking over your left shoulder. Hold 20 seconds, then switch sides.",
    focus: "Spine & lower back",
    area: AREA.SPINE,
    priority: 1
  },
  {
    name: "Chest Opener",
    duration: "30 seconds",
    description: "Clasp your hands behind your back, straighten your arms, and gently lift them while squeezing your shoulder blades together. Hold for 15 seconds. Repeat twice.",
    focus: "Chest & anterior shoulders",
    area: AREA.CHEST_POSTURE,
    priority: 2
  },
  {
    name: "Wrist Flexor Stretch",
    duration: "30 seconds",
    description: "Extend one arm forward, palm up. With the other hand, gently pull your fingers down and back toward you. Hold 15 seconds per hand.",
    focus: "Wrists & forearms",
    area: AREA.WRISTS_ARMS,
    priority: 0
  },
  {
    name: "Standing Forward Fold",
    duration: "30 seconds",
    description: "Stand up, feet hip-width apart. Slowly fold forward from the hips, letting your head and arms hang heavy. Bend your knees slightly if needed. Just breathe.",
    focus: "Hamstrings & lower back",
    area: AREA.LOWER_BODY,
    priority: 0
  },
  {
    name: "Cat-Cow (Seated)",
    duration: "40 seconds",
    description: "Sit on the edge of your chair, hands on knees. Inhale — arch your back and look up (cow). Exhale — round your spine and tuck chin (cat). Repeat 8 times.",
    focus: "Full spine mobility",
    area: AREA.SPINE,
    priority: 2
  },
  {
    name: "Hip Flexor Stretch",
    duration: "40 seconds",
    description: "Stand up and take a big step back with one foot. Bend your front knee and sink your hips forward until you feel a stretch in the front of your back hip. Hold 20 seconds per side.",
    focus: "Hip flexors & quads",
    area: AREA.HIPS_GLUTES,
    priority: 1
  },
  {
    name: "Chin Tucks",
    duration: "20 seconds",
    description: "Sit tall. Without tilting your head, pull your chin straight back as if making a double chin. Hold 3 seconds. Repeat 8 times. Looks silly, feels amazing.",
    focus: "Neck alignment & posture",
    area: AREA.NECK,
    priority: 2
  },
  {
    name: "Wall Angels",
    duration: "45 seconds",
    description: "Stand with your back flat against a wall. Raise your arms to a 'goal post' position against the wall, then slowly slide them up overhead and back down. Repeat 8 times.",
    focus: "Shoulders, thoracic spine & posture",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 2
  },
  {
    name: "Figure-4 Stretch",
    duration: "40 seconds",
    description: "Sit tall, cross your right ankle over your left knee. Gently press down on your right knee while leaning slightly forward. Hold 20 seconds per side.",
    focus: "Glutes & outer hips",
    area: AREA.HIPS_GLUTES,
    priority: 1
  },
  {
    name: "Doorway Chest Stretch",
    duration: "30 seconds",
    description: "Stand in a doorway, place your forearms on either side of the frame at shoulder height. Step one foot forward and lean in until you feel a stretch across your chest. Hold 30 seconds.",
    focus: "Chest & front shoulders",
    area: AREA.CHEST_POSTURE,
    priority: 2
  },
  {
    name: "Walk & Hydrate",
    duration: "2 minutes",
    description: "Get up and walk to the kitchen or water cooler. Fill up your water bottle. Take a slightly longer route back. Your body was made to move, not sit in a chair.",
    focus: "Whole body & hydration",
    area: AREA.FULL_BODY,
    priority: 1
  },
  {
    name: "Overhead Reach",
    duration: "20 seconds",
    description: "Interlace your fingers, flip your palms up, and reach your arms straight overhead. Lean gently to the left for 5 seconds, then to the right. Repeat twice.",
    focus: "Shoulders, lats & side body",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 0
  },
  {
    name: "Calf Raises",
    duration: "30 seconds",
    description: "Stand behind your chair and hold the back for balance. Rise up onto your toes, hold for 2 seconds, then slowly lower. Repeat 15 times. Get that blood flowing!",
    focus: "Calves & circulation",
    area: AREA.LOWER_BODY,
    priority: 0
  },
  // === Shoulder blade knots, forward head, hunched posture, crossed legs ===
  {
    name: "Trapezius Release",
    duration: "40 seconds",
    description: "Drop your right ear toward your right shoulder. Reach your right hand over your head and gently rest it on the left side of your head — don't pull, just let the weight of your hand deepen the stretch. Hold 20 seconds per side. Breathe into the tight side.",
    focus: "Upper traps & neck (knot relief)",
    area: AREA.NECK,
    priority: 3
  },
  {
    name: "Tennis Ball Rhomboid Release",
    duration: "60 seconds",
    description: "Place a tennis ball (or lacrosse ball, or even a rolled-up sock) between your shoulder blade and your spine. Lean against a wall and slowly roll around until you find a tender spot. Hold pressure on it for 15-20 seconds, then move to the next spot. Do both sides.",
    focus: "Rhomboids & mid-back (knot release)",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 3
  },
  {
    name: "Scapular Squeeze",
    duration: "30 seconds",
    description: "Sit or stand tall, arms at your sides. Squeeze your shoulder blades together as hard as you can, like you're trying to hold a pencil between them. Hold 5 seconds, release. Repeat 8 times.",
    focus: "Rhomboids & mid-traps (posture reset)",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 3
  },
  {
    name: "Thread the Needle",
    duration: "40 seconds",
    description: "Get on all fours. Slide your right arm under your left arm, lowering your right shoulder and temple to the floor. You should feel a deep stretch between your shoulder blades. Hold 20 seconds per side.",
    focus: "Thoracic spine & shoulder blades",
    area: AREA.SPINE,
    priority: 3
  },
  {
    name: "Cross-Body Shoulder Stretch",
    duration: "30 seconds",
    description: "Bring your right arm across your chest. Use your left hand to gently press your right arm closer to your body just above the elbow. Hold 15 seconds per arm. Focus on feeling it deep behind the shoulder.",
    focus: "Posterior deltoid & upper back",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 2
  },
  {
    name: "Eagle Arms",
    duration: "30 seconds",
    description: "Extend arms forward, cross right arm under left at the elbows, then wrap forearms so palms face each other (or get as close as you can). Lift elbows to shoulder height and push hands away from your face. Hold 15 seconds, then switch which arm is on top. This one really gets between the shoulder blades.",
    focus: "Rhomboids, traps & shoulder blades",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 3
  },
  {
    name: "Levator Scapulae Stretch",
    duration: "40 seconds",
    description: "Sit tall. Turn your head 45 degrees to the right, then drop your chin toward your right armpit. Place your right hand on the back of your head and gently add a little pressure. You'll feel this along the side/back of your neck where it meets the shoulder blade. Hold 20 seconds per side.",
    focus: "Levator scapulae (the #1 knot muscle)",
    area: AREA.NECK,
    priority: 3
  },
  {
    name: "Prone Y Raise",
    duration: "30 seconds",
    description: "Lie face down on the floor (or lean forward over your desk). Extend your arms out at a Y angle, thumbs pointing up. Slowly lift your arms a few inches, squeezing your lower traps. Hold 3 seconds at the top. Repeat 10 times. Strengthens the muscles that keep you from hunching.",
    focus: "Lower traps & scapular stabilizers",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 2
  },
  {
    name: "Bruegger's Relief Position",
    duration: "20 seconds",
    description: "Sit on the edge of your chair, feet wide. Turn your palms outward so thumbs point behind you, open your chest, tuck your chin slightly, and squeeze your shoulder blades down and together. Hold this 'anti-hunch' position for 10 seconds. Repeat 3 times. This is the exact opposite of your hunched posture.",
    focus: "Full posture reset (anti-hunch)",
    area: AREA.CHEST_POSTURE,
    priority: 3
  },
  {
    name: "Foam Roller Thoracic Extension",
    duration: "60 seconds",
    description: "If you have a foam roller, lie on it lengthwise along your spine, knees bent, feet flat. Let your arms fall out to the sides and just breathe, letting gravity open your chest. Or lie across the roller at mid-back level and gently extend over it. Either way — 60 seconds of undoing the hunch.",
    focus: "Thoracic spine & chest opening",
    area: AREA.SPINE,
    priority: 2
  },
  {
    name: "Pec Minor Release",
    duration: "40 seconds",
    description: "Stand facing a corner. Place a tennis ball on your chest just below your collarbone, near the front of your shoulder. Lean into the corner with the ball pressing into this spot. Small movements to find the tender point, then hold. 20 seconds per side. Tight pec minors pull your shoulders forward — this releases them.",
    focus: "Pec minor (rounded shoulder fix)",
    area: AREA.CHEST_POSTURE,
    priority: 3
  },
  {
    name: "Chin Tuck with Resistance",
    duration: "20 seconds",
    description: "Place your fingers on your chin. Push your chin back into a double chin while resisting gently with your fingers. Hold 5 seconds. Repeat 6 times. This strengthens the deep neck flexors that get weak from forward head posture.",
    focus: "Deep neck flexors (forward head fix)",
    area: AREA.NECK,
    priority: 3
  },
  {
    name: "Suboccipital Release",
    duration: "40 seconds",
    description: "Place two tennis balls in a sock, tie it off, and lie down with the balls at the base of your skull — one on each side of your spine. Just lie there and let gravity do the work. Gently nod 'yes' a few times, then turn 'no' a few times. These tiny muscles lock up from screen staring.",
    focus: "Suboccipitals (base of skull tension)",
    area: AREA.NECK,
    priority: 2
  },
  {
    name: "Seated Pigeon Pose",
    duration: "40 seconds",
    description: "Sitting in your chair, place your right ankle on your left thigh. Sit tall and gently lean forward from the hips until you feel a deep stretch in your right glute and outer hip. Hold 20 seconds per side. Crossed legs tighten these muscles — this undoes the damage.",
    focus: "Piriformis & glutes (crossed-leg fix)",
    area: AREA.HIPS_GLUTES,
    priority: 2
  },
  {
    name: "IT Band & Outer Hip Stretch",
    duration: "40 seconds",
    description: "Stand and cross your right foot behind your left. Lean your hips to the right while reaching your left arm overhead to the right. You should feel a stretch along the entire outer left side. Hold 20 seconds per side.",
    focus: "IT band & outer hip (crossed-leg fix)",
    area: AREA.HIPS_GLUTES,
    priority: 2
  },
  {
    name: "Adductor Stretch",
    duration: "40 seconds",
    description: "Stand with feet wide apart, toes slightly out. Shift your weight to the right, bending your right knee while keeping your left leg straight. Sink into it until you feel a stretch along your inner left thigh. Hold 20 seconds per side. Crossing your legs constantly tightens your adductors.",
    focus: "Inner thighs (crossed-leg fix)",
    area: AREA.HIPS_GLUTES,
    priority: 2
  },
  {
    name: "90/90 Hip Stretch",
    duration: "60 seconds",
    description: "Sit on the floor. Place your right leg in front with knee bent 90 degrees, shin parallel to your body. Place your left leg to the side, also bent 90 degrees. Sit tall and lean gently forward over the front shin. Hold 30 seconds, then switch sides. This hits both internal and external hip rotation — exactly what gets locked up from sitting cross-legged.",
    focus: "Deep hip rotators (crossed-leg fix)",
    area: AREA.HIPS_GLUTES,
    priority: 2
  },
  {
    name: "Wall Pec Stretch (Low Angle)",
    duration: "30 seconds",
    description: "Stand next to a wall. Place your right forearm on the wall with elbow BELOW shoulder height (about 45 degrees). Step forward and turn your body away from the wall until you feel a stretch in the lower chest. Hold 15 seconds per side. This angle targets the sternal fibres that round your mid-back forward.",
    focus: "Lower chest & posture",
    area: AREA.CHEST_POSTURE,
    priority: 2
  },
  {
    name: "Prone Cobra",
    duration: "30 seconds",
    description: "Lie face down, arms at your sides with palms down. Squeeze your shoulder blades together, lift your chest slightly off the floor, and rotate your thumbs toward the ceiling. Hold for 10 seconds. Repeat 3 times. This fires every muscle that your hunched posture has switched off.",
    focus: "Entire posterior chain activation",
    area: AREA.SHOULDERS_UPPER_BACK,
    priority: 2
  },
  {
    name: "Nerve Glide — Median",
    duration: "30 seconds",
    description: "Extend your right arm out to the side, palm up. Slowly tilt your head away from your right arm while extending your wrist (fingers pointing to the floor). You should feel a gentle stretch or tingle from neck to fingertips — that's the nerve gliding. Repeat slowly 5 times per side. Hunching compresses these nerves.",
    focus: "Nerve mobility (arm tingling relief)",
    area: AREA.WRISTS_ARMS,
    priority: 1
  }
];

// ---------------------------------------------------------------------------
// Smart stretch selection
// ---------------------------------------------------------------------------

// Get today's date key for tracking daily history
function todayKey() {
  return new Date().toISOString().slice(0, 10); // "2026-05-12"
}

// Reset history if it's a new day
async function getDailyHistory() {
  const { stretchHistory = {} } = await chrome.storage.local.get("stretchHistory");
  const today = todayKey();
  if (stretchHistory._date !== today) {
    // New day — reset
    return { _date: today };
  }
  return stretchHistory;
}

async function saveDailyHistory(history) {
  await chrome.storage.local.set({ stretchHistory: history });
}

// Get the current break number today (for time-of-day awareness)
function getBreakPhase() {
  const hour = new Date().getHours();
  if (hour < 10) return "morning";    // Wake up the body
  if (hour < 14) return "midday";     // Peak work hours — full stretches
  if (hour < 17) return "afternoon";  // Tension has built up — release & relief
  return "evening";                   // Wind down
}

// Priority weights: higher priority stretches appear more often.
// Priority 3 (posture-critical) = 4x weight, 2 = 3x, 1 = 2x, 0 = 1x.
// Stretches already done today get a heavy penalty but aren't fully excluded
// (they can repeat once the pool gets thin).
function scoreStretch(stretch, history, areasInSession) {
  const doneCount = history[stretch.name] || 0;
  const phase = getBreakPhase();

  // Base weight from priority
  let score = 1 + stretch.priority * 1.5;

  // Penalty for already-done-today: each completion halves the score
  score /= Math.pow(2, doneCount);

  // Bonus for body area diversity within this session
  if (areasInSession.has(stretch.area)) {
    score *= 0.15; // Heavy penalty for same area twice in one break
  }

  // Time-of-day adjustments
  if (phase === "morning") {
    // Favour gentle wake-up stretches, mobility
    if (stretch.area === AREA.NECK || stretch.area === AREA.SPINE) score *= 1.4;
    if (stretch.area === AREA.FULL_BODY) score *= 1.3;
  } else if (phase === "midday") {
    // Posture resets — you've been hunching for hours
    if (stretch.area === AREA.CHEST_POSTURE || stretch.area === AREA.SHOULDERS_UPPER_BACK) score *= 1.5;
  } else if (phase === "afternoon") {
    // Tension relief — knots and hips are screaming
    if (stretch.priority >= 3) score *= 1.6;
    if (stretch.area === AREA.HIPS_GLUTES) score *= 1.4;
  } else {
    // Evening — wind down, gentle full-body
    if (stretch.area === AREA.FULL_BODY || stretch.area === AREA.LOWER_BODY) score *= 1.3;
  }

  // Every 3rd break, include a "Walk & Hydrate" type stretch
  // (handled separately below)

  // Small random jitter so it doesn't feel robotic
  score *= 0.85 + Math.random() * 0.3;

  return score;
}

async function pickStretches() {
  const history = await getDailyHistory();
  const totalDone = Object.keys(history).filter(k => k !== "_date").length;

  // How many exercises to show this break.
  // exerciseCount: 1/2/3 = fixed count, 0 = "Mix" (random 2–3). Default 1 —
  // a single exercise is the lowest barrier to actually doing it.
  const { exerciseCount = 1 } = await chrome.storage.local.get("exerciseCount");
  const count = exerciseCount === 0 ? (Math.random() < 0.4 ? 2 : 3) : exerciseCount;

  // Every 3rd break, always include Walk & Hydrate if not done recently —
  // but only when there's room for more than one exercise this break.
  const includeWalk = count > 1 && totalDone > 0 && totalDone % 3 === 0 && (history["Walk & Hydrate"] || 0) < 3;

  const picked = [];
  const areasInSession = new Set();

  // If it's a walk break, lead with that
  if (includeWalk) {
    const walk = STRETCHES.find(s => s.name === "Walk & Hydrate");
    if (walk) {
      picked.push(walk);
      areasInSession.add(walk.area);
    }
  }

  // Score and sort remaining stretches
  const remaining = STRETCHES.filter(s => !picked.some(p => p.name === s.name));

  while (picked.length < count && remaining.length > 0) {
    // Re-score each time to account for area diversity updates
    const scored = remaining.map(s => ({
      stretch: s,
      score: scoreStretch(s, history, areasInSession)
    }));

    // Weighted random selection (roulette wheel)
    const totalScore = scored.reduce((sum, s) => sum + s.score, 0);
    let rand = Math.random() * totalScore;
    let chosen = scored[0];
    for (const entry of scored) {
      rand -= entry.score;
      if (rand <= 0) {
        chosen = entry;
        break;
      }
    }

    picked.push(chosen.stretch);
    areasInSession.add(chosen.stretch.area);

    // Remove from candidates
    const idx = remaining.indexOf(chosen.stretch);
    remaining.splice(idx, 1);
  }

  // Record this selection in today's history
  for (const s of picked) {
    history[s.name] = (history[s.name] || 0) + 1;
  }
  await saveDailyHistory(history);

  return picked;
}

// Set up the alarm (always resets — use for install, settings changes, and after reminders)
async function setupAlarm() {
  const { enabled = true, intervalMinutes = 30 } = await chrome.storage.local.get(["enabled", "intervalMinutes"]);

  await chrome.alarms.clear(ALARM_NAME);
  await chrome.storage.local.remove("alarmRemainingMs");

  if (enabled) {
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: intervalMinutes,
      periodInMinutes: intervalMinutes
    });
  }
}

// Pause the alarm (when user goes idle) — saves remaining time
async function pauseAlarm() {
  const alarm = await chrome.alarms.get(ALARM_NAME);
  if (alarm) {
    const remaining = Math.max(0, alarm.scheduledTime - Date.now());
    await chrome.storage.local.set({ alarmRemainingMs: remaining });
    await chrome.alarms.clear(ALARM_NAME);
  }
}

// Resume the alarm (when user becomes active) — restores saved remaining time
async function resumeAlarm() {
  const { enabled = true, alarmRemainingMs, intervalMinutes = 30 } =
    await chrome.storage.local.get(["enabled", "alarmRemainingMs", "intervalMinutes"]);

  if (!enabled) return;

  const delayMs = alarmRemainingMs != null ? alarmRemainingMs : intervalMinutes * 60000;
  const delayMinutes = Math.max(delayMs / 60000, 0.1); // minimum ~6 seconds

  await chrome.alarms.clear(ALARM_NAME);
  chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: delayMinutes,
    periodInMinutes: intervalMinutes
  });

  await chrome.storage.local.remove("alarmRemainingMs");
}

// Show the reminder
async function showReminder() {
  const stretches = await pickStretches();

  // Store chosen stretches so the reminder page can read them
  await chrome.storage.local.set({ currentStretches: stretches });

  // Update the streak and reset inactivity timer
  const { streak = 0 } = await chrome.storage.local.get("streak");
  await chrome.storage.local.set({
    streak: streak + 1,
    activeStartTime: Date.now(),
    accumulatedInactiveMs: 0
  });

  // Clear any paused alarm state and let the repeating alarm handle the next fire
  await chrome.storage.local.remove("alarmRemainingMs");

  // Open the reminder as a new tab
  chrome.tabs.create({
    url: chrome.runtime.getURL("reminder.html"),
    active: true
  });
}

// Listen for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    showReminder();
  }
});

// ---------------------------------------------------------------------------
// Inactivity timer — pauses when idle, locked, or asleep
// ---------------------------------------------------------------------------
// accumulatedInactiveMs: sitting time banked from previous active periods
// activeStartTime: timestamp when current active period began (null if idle)

async function initSessionTimer() {
  const data = await chrome.storage.local.get(["activeStartTime", "accumulatedInactiveMs", "inactiveTimerDate"]);
  const today = todayKey();

  if (data.inactiveTimerDate !== today) {
    // New day — reset
    await chrome.storage.local.set({
      activeStartTime: Date.now(),
      accumulatedInactiveMs: 0,
      inactiveTimerDate: today
    });
  } else if (!data.activeStartTime) {
    // Was idle when service worker last ran — resume as active now
    await chrome.storage.local.set({ activeStartTime: Date.now() });
  }
}

// Detect idle/locked/active transitions
chrome.idle.setDetectionInterval(60); // 60 seconds of no input = idle

chrome.idle.onStateChanged.addListener(async (newState) => {
  const data = await chrome.storage.local.get(["activeStartTime", "accumulatedInactiveMs"]);
  const accumulated = data.accumulatedInactiveMs || 0;

  if (newState === "active") {
    // Woke up — start a new active period and resume the stretch alarm
    await chrome.storage.local.set({ activeStartTime: Date.now() });
    await resumeAlarm();
  } else {
    // idle or locked — bank the time and pause the stretch alarm
    if (data.activeStartTime) {
      const elapsed = Date.now() - data.activeStartTime;
      await chrome.storage.local.set({
        accumulatedInactiveMs: accumulated + elapsed,
        activeStartTime: null
      });
    }
    await pauseAlarm();
  }
});

// Set up alarm on install or update
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true, intervalMinutes: 30, exerciseCount: 1, streak: 0,
    activeStartTime: Date.now(), accumulatedInactiveMs: 0, inactiveTimerDate: todayKey()
  });
  setupAlarm();
});

// Re-establish alarm on service worker startup — only if missing and not paused
(async () => {
  const { enabled = true, alarmRemainingMs } =
    await chrome.storage.local.get(["enabled", "alarmRemainingMs"]);
  const existing = await chrome.alarms.get(ALARM_NAME);

  if (enabled && !existing && alarmRemainingMs == null) {
    // Alarm was lost (e.g. browser restart) — create a fresh one
    setupAlarm();
  }
})();
initSessionTimer();

// Listen for setting changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled || changes.intervalMinutes) {
    setupAlarm();
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "triggerNow") {
    showReminder().then(() => sendResponse({ ok: true }));
    return true; // keep message channel open for async response
  }
});
