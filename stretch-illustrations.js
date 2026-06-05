// SVG stick-figure illustrations for each stretch.
// Each is a 200x200 viewBox, white strokes on transparent background.

const STRETCH_SVGS = {

"20-20-20 Eye Break": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- eye outline -->
  <path d="M 40 100 Q 100 55 160 100 Q 100 145 40 100 Z" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="100" cy="100" r="20" fill="none" stroke="white" stroke-width="3"/>
  <circle cx="100" cy="100" r="8" fill="white"/>
  <!-- gaze lines pointing far into the distance -->
  <line x1="150" y1="70" x2="180" y2="52" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="156" y1="100" x2="188" y2="100" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="150" y1="130" x2="180" y2="148" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,

"Eye Palming": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- head -->
  <circle cx="100" cy="95" r="55" fill="none" stroke="white" stroke-width="3"/>
  <!-- two cupped palms over the eyes -->
  <path d="M 55 90 Q 80 70 95 92 Q 80 108 60 105 Z" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 145 90 Q 120 70 105 92 Q 120 108 140 105 Z" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  <!-- gentle closed smile -->
  <path d="M 85 125 Q 100 134 115 125" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Near-Far Focus Shifts": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- eye -->
  <path d="M 30 80 Q 70 48 110 80 Q 70 112 30 80 Z" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="70" cy="80" r="13" fill="none" stroke="white" stroke-width="3"/>
  <circle cx="70" cy="80" r="5" fill="white"/>
  <!-- near thumb -->
  <line x1="120" y1="70" x2="120" y2="110" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <text x="120" y="135" fill="#ffd700" font-size="12" text-anchor="middle" font-family="sans-serif">near</text>
  <!-- far point -->
  <circle cx="172" cy="80" r="6" fill="none" stroke="white" stroke-width="2.5"/>
  <text x="172" y="135" fill="#ffd700" font-size="12" text-anchor="middle" font-family="sans-serif">far</text>
  <!-- shifting arrow -->
  <path d="M 132 80 L 158 80" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="156,75 166,80 156,85" fill="#ffd700"/>
</svg>`,

"Slow Eye Circles": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- eye outline -->
  <path d="M 40 100 Q 100 60 160 100 Q 100 140 40 100 Z" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  <!-- circular path the pupil travels -->
  <circle cx="100" cy="100" r="26" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="4 5"/>
  <!-- pupil at top of the circle -->
  <circle cx="100" cy="76" r="9" fill="white"/>
  <!-- direction arrow -->
  <path d="M 122 88 Q 128 100 122 112" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="118,108 124,116 126,106" fill="#ffd700"/>
</svg>`,

"Neck Rolls": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="95" x2="100" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="70" y1="105" x2="130" y2="105" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="72" r="18" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="100" y1="90" x2="100" y2="95" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- circular arrow around head -->
  <path d="M 78 58 A 28 28 0 1 1 115 52" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 3"/>
  <polygon points="115,47 115,58 108,50" fill="#ffd700"/>
</svg>`,

"Shoulder Shrugs & Rolls": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="90" x2="100" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="65" r="18" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="100" y1="83" x2="100" y2="90" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- raised shoulders -->
  <line x1="70" y1="92" x2="100" y2="98" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="130" y1="92" x2="100" y2="98" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms hanging -->
  <line x1="70" y1="92" x2="62" y2="135" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="130" y1="92" x2="138" y2="135" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- up arrows on shoulders -->
  <line x1="68" y1="100" x2="68" y2="82" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="62,86 68,76 74,86" fill="#ffd700"/>
  <line x1="132" y1="100" x2="132" y2="82" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="126,86 132,76 138,86" fill="#ffd700"/>
  <!-- legs -->
  <line x1="100" y1="155" x2="80" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="155" x2="120" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Seated Spinal Twist": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- chair seat -->
  <rect x="55" y="140" width="70" height="5" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <!-- chair back -->
  <line x1="55" y1="140" x2="55" y2="95" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/>
  <!-- torso twisted -->
  <path d="M 90 140 Q 85 120 95 100" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head turned -->
  <circle cx="88" cy="78" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="92" y1="93" x2="90" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right arm crossing to left knee -->
  <path d="M 100 110 Q 85 125 75 138" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- left arm behind -->
  <path d="M 80 110 Q 65 115 58 120" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- legs -->
  <line x1="78" y1="145" x2="70" y2="175" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="70" y1="175" x2="55" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="102" y1="145" x2="110" y2="175" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="110" y1="175" x2="120" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- twist arrow -->
  <path d="M 108 85 A 20 20 0 0 0 78 80" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="78,75 75,84 83,82" fill="#ffd700"/>
</svg>`,

"Chest Opener": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="88" x2="100" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="65" r="18" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="100" y1="83" x2="100" y2="88" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="72" y1="98" x2="128" y2="98" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms behind back, clasped -->
  <path d="M 72 98 Q 65 115 70 135 Q 80 148 100 145" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <path d="M 128 98 Q 135 115 130 135 Q 120 148 100 145" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- chest push forward arrow -->
  <line x1="100" y1="120" x2="115" y2="112" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="118,108 118,118 110,110" fill="#ffd700"/>
  <!-- legs -->
  <line x1="100" y1="150" x2="82" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="150" x2="118" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Wrist Flexor Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="90" x2="100" y2="160" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="68" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="100" y1="85" x2="100" y2="90" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="73" y1="100" x2="127" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right arm extended forward -->
  <line x1="127" y1="100" x2="165" y2="105" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right hand (palm up, fingers up) -->
  <line x1="165" y1="105" x2="168" y2="90" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- left arm pulling fingers -->
  <line x1="73" y1="100" x2="90" y2="115" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <path d="M 90 115 Q 120 115 160 95" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- pull arrow -->
  <line x1="168" y1="88" x2="165" y2="78" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="160,80 170,73 170,83" fill="#ffd700"/>
</svg>`,

"Standing Forward Fold": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- legs straight -->
  <line x1="85" y1="120" x2="85" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="115" y1="120" x2="115" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- hips -->
  <line x1="85" y1="120" x2="115" y2="120" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- torso bent forward -->
  <path d="M 100 120 Q 95 100 75 85" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head hanging -->
  <circle cx="65" cy="78" r="14" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms hanging down -->
  <line x1="82" y1="95" x2="78" y2="130" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="78" y1="95" x2="72" y2="130" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- feet -->
  <line x1="85" y1="185" x2="75" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="115" y1="185" x2="125" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- gravity arrow -->
  <line x1="65" y1="95" x2="65" y2="115" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="60,112 65,120 70,112" fill="#ffd700"/>
</svg>`,

"Cat-Cow (Seated)": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- LABEL: COW -->
  <text x="50" y="20" fill="rgba(255,255,255,0.5)" font-size="11" font-family="sans-serif">COW</text>
  <!-- chair -->
  <rect x="15" y="105" width="60" height="4" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <!-- torso arched (cow) -->
  <path d="M 45 105 Q 42 78 50 60" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head looking up -->
  <circle cx="55" cy="45" r="13" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms on knees -->
  <line x1="38" y1="80" x2="28" y2="100" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="50" y1="80" x2="58" y2="100" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- legs -->
  <line x1="35" y1="109" x2="30" y2="140" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="55" y1="109" x2="60" y2="140" stroke="white" stroke-width="2.5" stroke-linecap="round"/>

  <!-- divider -->
  <line x1="100" y1="25" x2="100" y2="155" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>

  <!-- LABEL: CAT -->
  <text x="140" y="20" fill="rgba(255,255,255,0.5)" font-size="11" font-family="sans-serif">CAT</text>
  <!-- chair -->
  <rect x="120" y="105" width="60" height="4" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <!-- torso rounded (cat) -->
  <path d="M 150 105 Q 158 78 148 60" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head tucked -->
  <circle cx="140" cy="52" r="13" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms on knees -->
  <line x1="155" y1="80" x2="145" y2="100" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="148" y1="80" x2="160" y2="100" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- legs -->
  <line x1="140" y1="109" x2="135" y2="140" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="160" y1="109" x2="165" y2="140" stroke="white" stroke-width="2.5" stroke-linecap="round"/>

  <!-- double arrow between them -->
  <line x1="80" y1="165" x2="120" y2="165" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="82,160 75,165 82,170" fill="#ffd700"/>
  <polygon points="118,160 125,165 118,170" fill="#ffd700"/>
</svg>`,

"Hip Flexor Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- front leg bent -->
  <line x1="90" y1="120" x2="65" y2="160" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="65" y1="160" x2="55" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- back leg extended -->
  <line x1="110" y1="120" x2="145" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="145" y1="155" x2="160" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- hips -->
  <line x1="90" y1="120" x2="110" y2="120" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- torso upright -->
  <line x1="100" y1="120" x2="100" y2="72" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="52" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms relaxed -->
  <line x1="90" y1="82" x2="78" y2="110" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="110" y1="82" x2="122" y2="110" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- hip push arrow -->
  <line x1="115" y1="130" x2="130" y2="130" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="127,125 135,130 127,135" fill="#ffd700"/>
  <!-- foot -->
  <line x1="55" y1="190" x2="45" y2="192" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Chin Tucks": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso side view -->
  <line x1="90" y1="100" x2="90" y2="170" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="75" y1="108" x2="105" y2="108" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- neck -->
  <line x1="90" y1="100" x2="92" y2="82" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head (profile view) -->
  <ellipse cx="95" cy="62" rx="16" ry="18" fill="none" stroke="white" stroke-width="3"/>
  <!-- chin line -->
  <line x1="108" y1="72" x2="105" y2="78" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- ghost head showing forward position -->
  <ellipse cx="110" cy="60" rx="16" ry="18" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 3"/>
  <!-- arrow pushing chin back -->
  <line x1="125" y1="68" x2="108" y2="68" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="112,63 105,68 112,73" fill="#ffd700"/>
  <!-- double chin lines for humor -->
  <path d="M 100 78 Q 95 82 90 80" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
</svg>`,

"Wall Angels": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- wall -->
  <line x1="55" y1="15" x2="55" y2="195" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
  <!-- figure standing against wall -->
  <line x1="60" y1="92" x2="60" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head against wall -->
  <circle cx="65" cy="68" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="62" y1="85" x2="60" y2="92" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- legs -->
  <line x1="60" y1="155" x2="50" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="60" y1="155" x2="75" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms in goalpost against wall (down position) -->
  <line x1="60" y1="100" x2="58" y2="78" stroke="rgba(255,255,255,0.35)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 3"/>
  <line x1="58" y1="78" x2="58" y2="45" stroke="rgba(255,255,255,0.35)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 3"/>
  <!-- arms in goalpost against wall (up position) -->
  <line x1="60" y1="100" x2="58" y2="75" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="58" y1="75" x2="58" y2="35" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arrow showing movement up -->
  <line x1="70" y1="75" x2="70" y2="42" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="65,46 70,36 75,46" fill="#ffd700"/>
</svg>`,

"Figure-4 Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- chair -->
  <rect x="55" y="115" width="70" height="4" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <!-- torso -->
  <line x1="90" y1="115" x2="90" y2="65" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="90" cy="45" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- left leg down -->
  <line x1="80" y1="119" x2="75" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="75" y1="155" x2="70" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right ankle on left knee (figure 4) -->
  <line x1="105" y1="119" x2="115" y2="140" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="115" y1="140" x2="78" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- foot on knee -->
  <line x1="78" y1="145" x2="72" y2="140" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- hand pressing knee -->
  <line x1="100" y1="80" x2="115" y2="135" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- press arrow -->
  <line x1="125" y1="132" x2="125" y2="148" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="120,145 125,153 130,145" fill="#ffd700"/>
</svg>`,

"Doorway Chest Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- doorframe -->
  <line x1="65" y1="10" x2="65" y2="195" stroke="rgba(255,255,255,0.35)" stroke-width="4"/>
  <line x1="135" y1="10" x2="135" y2="195" stroke="rgba(255,255,255,0.35)" stroke-width="4"/>
  <line x1="65" y1="10" x2="135" y2="10" stroke="rgba(255,255,255,0.35)" stroke-width="4"/>
  <!-- figure stepping through -->
  <line x1="100" y1="85" x2="100" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="62" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- forearms on frame -->
  <line x1="80" y1="95" x2="65" y2="75" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="65" y1="75" x2="65" y2="95" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="120" y1="95" x2="135" y2="75" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="135" y1="75" x2="135" y2="95" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- legs stepping forward -->
  <line x1="100" y1="145" x2="85" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="145" x2="115" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- forward arrow -->
  <line x1="100" y1="125" x2="115" y2="118" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="118,113 118,123 111,116" fill="#ffd700"/>
</svg>`,

"Walk & Hydrate": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- walking figure -->
  <line x1="90" y1="85" x2="90" y2="140" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="90" cy="62" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- arm swinging forward -->
  <line x1="82" y1="95" x2="68" y2="120" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arm holding water bottle -->
  <line x1="98" y1="95" x2="112" y2="110" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- water bottle -->
  <rect x="110" y="105" width="8" height="18" rx="3" fill="none" stroke="#87CEFA" stroke-width="2"/>
  <line x1="112" y1="112" x2="116" y2="112" stroke="#87CEFA" stroke-width="1.5"/>
  <!-- legs walking -->
  <line x1="90" y1="140" x2="72" y2="180" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="90" y1="140" x2="108" y2="180" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- feet -->
  <line x1="72" y1="180" x2="62" y2="183" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="108" y1="180" x2="118" y2="183" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- motion lines -->
  <line x1="55" y1="90" x2="45" y2="90" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
  <line x1="55" y1="105" x2="42" y2="105" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
  <line x1="55" y1="120" x2="48" y2="120" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
</svg>`,

"Overhead Reach": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso leaning slightly -->
  <path d="M 95 150 Q 92 120 88 90" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="88" cy="68" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms overhead, leaning right... no wait, leaning left as described -->
  <path d="M 82 90 Q 75 60 70 35" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <path d="M 95 90 Q 88 60 78 38" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- interlaced hands -->
  <circle cx="73" cy="35" r="4" fill="none" stroke="white" stroke-width="2"/>
  <!-- lean arrow -->
  <path d="M 65 50 Q 55 55 50 65" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="47,60 48,70 55,64" fill="#ffd700"/>
  <!-- legs -->
  <line x1="95" y1="150" x2="80" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="95" y1="150" x2="115" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Calf Raises": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- chair back for balance -->
  <line x1="55" y1="85" x2="55" y2="140" stroke="rgba(255,255,255,0.35)" stroke-width="3" stroke-linecap="round"/>
  <line x1="45" y1="140" x2="65" y2="140" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
  <!-- hands on chair -->
  <line x1="80" y1="95" x2="58" y2="90" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- torso -->
  <line x1="100" y1="85" x2="100" y2="140" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="62" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- legs -->
  <line x1="92" y1="140" x2="88" y2="170" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="108" y1="140" x2="112" y2="170" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- feet on tiptoe -->
  <line x1="88" y1="170" x2="82" y2="175" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="112" y1="170" x2="118" y2="175" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- ghost feet flat -->
  <line x1="88" y1="178" x2="78" y2="182" stroke="rgba(255,255,255,0.2)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 3"/>
  <line x1="112" y1="178" x2="122" y2="182" stroke="rgba(255,255,255,0.2)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 3"/>
  <!-- up arrows -->
  <line x1="130" y1="175" x2="130" y2="155" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="125,159 130,149 135,159" fill="#ffd700"/>
</svg>`,

"Trapezius Release": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="95" x2="100" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="70" y1="105" x2="130" y2="105" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head tilted right -->
  <circle cx="118" cy="68" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck tilted -->
  <line x1="100" y1="95" x2="110" y2="80" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right hand on head -->
  <path d="M 130 105 Q 140 90 135 72" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="135" y1="72" x2="128" y2="58" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- left arm hanging -->
  <line x1="70" y1="105" x2="62" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- highlight stretch area on left trap -->
  <path d="M 78 90 Q 85 82 95 80" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.8"/>
  <!-- legs -->
  <line x1="100" y1="165" x2="82" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="165" x2="118" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Tennis Ball Rhomboid Release": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- wall -->
  <line x1="140" y1="10" x2="140" y2="195" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
  <!-- figure leaning against wall, seen from side -->
  <line x1="115" y1="88" x2="125" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="108" cy="65" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="112" y1="82" x2="115" y2="88" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- tennis ball between back and wall -->
  <circle cx="135" cy="100" r="7" fill="#9acd32" stroke="#7ab32a" stroke-width="1.5"/>
  <!-- ball highlight glow -->
  <circle cx="135" cy="100" r="10" fill="none" stroke="#ffd700" stroke-width="1.5" opacity="0.5"/>
  <!-- arms crossed in front -->
  <path d="M 110 98 Q 95 105 85 100" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <path d="M 115 100 Q 100 110 88 108" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- legs -->
  <line x1="125" y1="150" x2="105" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="125" y1="150" x2="135" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- roll arrows -->
  <path d="M 148 88 Q 152 100 148 112" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="145,110 150,118 153,108" fill="#ffd700"/>
</svg>`,

"Scapular Squeeze": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso (back view) -->
  <line x1="100" y1="85" x2="100" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="62" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- shoulders wide -->
  <line x1="65" y1="95" x2="135" y2="95" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms at sides -->
  <line x1="65" y1="95" x2="58" y2="140" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="135" y1="95" x2="142" y2="140" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulder blades shown -->
  <path d="M 85 95 L 80 115 L 92 110 Z" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
  <path d="M 115 95 L 120 115 L 108 110 Z" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
  <!-- squeeze arrows pointing inward -->
  <line x1="72" y1="105" x2="84" y2="105" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="80,100 88,105 80,110" fill="#ffd700"/>
  <line x1="128" y1="105" x2="116" y2="105" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="120,100 112,105 120,110" fill="#ffd700"/>
  <!-- legs -->
  <line x1="100" y1="155" x2="82" y2="192" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="155" x2="118" y2="192" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Thread the Needle": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- on all fours base -->
  <!-- back leg/knee -->
  <line x1="150" y1="110" x2="150" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="145" x2="165" y2="145" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- front knee -->
  <line x1="80" y1="110" x2="80" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="80" y1="145" x2="65" y2="145" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- torso twisted/collapsed to one side -->
  <path d="M 115 110 Q 100 100 80 105" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right arm threading under -->
  <path d="M 115 105 Q 100 115 65 120" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head/shoulder on ground -->
  <circle cx="58" cy="112" r="13" fill="none" stroke="white" stroke-width="3"/>
  <!-- left arm reaching up -->
  <line x1="85" y1="100" x2="75" y2="72" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- ground line -->
  <line x1="30" y1="148" x2="180" y2="148" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- stretch highlight between shoulder blades -->
  <path d="M 95 95 Q 100 88 108 92" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.8"/>
</svg>`,

"Cross-Body Shoulder Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="90" x2="100" y2="160" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="65" r="18" fill="none" stroke="white" stroke-width="3"/>
  <!-- shoulders -->
  <line x1="68" y1="100" x2="132" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right arm across body -->
  <line x1="132" y1="100" x2="60" y2="108" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- left hand pressing right arm -->
  <line x1="68" y1="100" x2="78" y2="115" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="78" y1="115" x2="95" y2="105" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- press arrow -->
  <line x1="88" y1="118" x2="88" y2="108" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="83,111 88,103 93,111" fill="#ffd700"/>
  <!-- stretch highlight behind shoulder -->
  <path d="M 135 95 Q 142 100 138 110" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.7"/>
  <!-- legs -->
  <line x1="100" y1="160" x2="82" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="160" x2="118" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Eagle Arms": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="100" x2="100" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="62" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="100" y1="79" x2="100" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- crossed arms - right under left at elbow -->
  <!-- upper right arm -->
  <line x1="110" y1="105" x2="105" y2="88" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- upper left arm -->
  <line x1="90" y1="105" x2="95" y2="88" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- forearms wrapping -->
  <path d="M 105 88 Q 98 82 95 85 Q 92 90 98 92" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <path d="M 95 88 Q 102 82 105 85 Q 108 90 102 92" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- palms together -->
  <ellipse cx="100" cy="82" rx="5" ry="3" fill="none" stroke="white" stroke-width="2"/>
  <!-- lift arrow -->
  <line x1="120" y1="95" x2="120" y2="78" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="115,82 120,72 125,82" fill="#ffd700"/>
  <!-- stretch highlight between shoulder blades -->
  <path d="M 88 98 Q 82 105 85 112" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.7"/>
  <path d="M 112 98 Q 118 105 115 112" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.7"/>
  <!-- legs -->
  <line x1="100" y1="165" x2="82" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="165" x2="118" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Levator Scapulae Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="95" x2="100" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="68" y1="105" x2="132" y2="105" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head turned 45 and dropped -->
  <circle cx="120" cy="72" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck angled -->
  <line x1="100" y1="95" x2="112" y2="82" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right hand on back of head -->
  <path d="M 132 105 Q 140 88 130 68" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- left arm relaxed -->
  <line x1="68" y1="105" x2="58" y2="142" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- stretch highlight on left side of neck/shoulder blade -->
  <path d="M 82 88 Q 78 95 75 108" fill="none" stroke="#ffd700" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.8"/>
  <!-- nose direction indicator -->
  <line x1="132" y1="68" x2="138" y2="78" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round"/>
  <!-- legs -->
  <line x1="100" y1="165" x2="82" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="165" x2="118" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Prone Y Raise": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground line -->
  <line x1="10" y1="130" x2="190" y2="130" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- figure face down -->
  <!-- torso -->
  <line x1="70" y1="125" x2="140" y2="125" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head face down -->
  <circle cx="60" cy="122" r="14" fill="none" stroke="white" stroke-width="3"/>
  <!-- legs -->
  <line x1="140" y1="125" x2="170" y2="128" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="170" y1="128" x2="185" y2="128" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- arms in Y shape, lifted -->
  <line x1="80" y1="120" x2="45" y2="90" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="80" y1="120" x2="30" y2="105" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- thumbs up indicators -->
  <line x1="45" y1="90" x2="47" y2="83" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <line x1="30" y1="105" x2="28" y2="98" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- lift arrows -->
  <line x1="50" y1="100" x2="50" y2="85" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="45,89 50,80 55,89" fill="#ffd700"/>
  <line x1="35" y1="112" x2="35" y2="100" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="30,103 35,95 40,103" fill="#ffd700"/>
</svg>`,

"Bruegger's Relief Position": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- chair edge -->
  <rect x="60" y="120" width="80" height="4" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <!-- torso very upright -->
  <line x1="100" y1="120" x2="100" y2="68" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head with slight chin tuck -->
  <circle cx="100" cy="48" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- shoulders back -->
  <line x1="68" y1="80" x2="132" y2="80" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms at sides, palms turned out (thumbs back) -->
  <line x1="68" y1="80" x2="58" y2="115" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="132" y1="80" x2="142" y2="115" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- palms facing out indicator -->
  <line x1="55" y1="115" x2="50" y2="120" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <line x1="145" y1="115" x2="150" y2="120" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- rotation arrows on palms -->
  <path d="M 50 108 A 8 8 0 0 0 48 122" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <path d="M 150 108 A 8 8 0 0 1 152 122" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <!-- legs wide -->
  <line x1="85" y1="124" x2="58" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="58" y1="165" x2="48" y2="175" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="115" y1="124" x2="142" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="142" y1="165" x2="152" y2="175" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- chest open highlight -->
  <path d="M 85 75 Q 100 68 115 75" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.7"/>
</svg>`,

"Foam Roller Thoracic Extension": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="155" x2="190" y2="155" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- foam roller (cylinder cross-section) -->
  <ellipse cx="105" cy="140" rx="14" ry="10" fill="rgba(155,89,182,0.5)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
  <!-- figure lying over roller -->
  <!-- lower body on ground -->
  <line x1="105" y1="140" x2="155" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- knees bent -->
  <line x1="155" y1="145" x2="165" y2="125" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="165" y1="125" x2="172" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- upper back draped over roller -->
  <path d="M 105 135 Q 90 120 70 125" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head hanging back -->
  <circle cx="58" cy="128" r="14" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms falling out to sides -->
  <line x1="85" y1="125" x2="75" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="95" y1="128" x2="105" y2="105" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- extension arrow -->
  <path d="M 65 112 Q 60 105 55 110" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="52,105 53,115 59,108" fill="#ffd700"/>
</svg>`,

"Pec Minor Release": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- corner walls -->
  <line x1="40" y1="15" x2="40" y2="195" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
  <line x1="40" y1="15" x2="120" y2="15" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
  <!-- figure facing corner -->
  <line x1="70" y1="90" x2="72" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="65" cy="68" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- leaning into corner -->
  <!-- tennis ball on chest -->
  <circle cx="50" cy="88" r="6" fill="#9acd32" stroke="#7ab32a" stroke-width="1.5"/>
  <!-- glow around ball -->
  <circle cx="50" cy="88" r="9" fill="none" stroke="#ffd700" stroke-width="1.5" opacity="0.5"/>
  <!-- arm up on wall -->
  <line x1="60" y1="90" x2="42" y2="70" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- other arm relaxed -->
  <line x1="80" y1="92" x2="90" y2="130" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- legs -->
  <line x1="72" y1="155" x2="58" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="72" y1="155" x2="88" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- lean arrow -->
  <line x1="80" y1="95" x2="55" y2="92" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <polygon points="58,87 50,92 58,97" fill="#ffd700"/>
</svg>`,

"Chin Tuck with Resistance": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso (side view) -->
  <line x1="95" y1="105" x2="95" y2="175" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="80" y1="112" x2="110" y2="112" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- neck -->
  <line x1="95" y1="105" x2="95" y2="85" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head (profile) -->
  <ellipse cx="100" cy="62" rx="17" ry="19" fill="none" stroke="white" stroke-width="3"/>
  <!-- fingers on chin -->
  <line x1="110" y1="112" x2="125" y2="100" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="125" y1="100" x2="118" y2="78" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- finger tips touching chin -->
  <circle cx="117" cy="76" r="2.5" fill="white"/>
  <!-- opposing arrows (chin pushes back, fingers resist) -->
  <line x1="115" y1="72" x2="105" y2="72" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="109,67 102,72 109,77" fill="#ffd700"/>
  <line x1="92" y1="72" x2="100" y2="72" stroke="#ff6b6b" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="97,67 103,72 97,77" fill="#ff6b6b"/>
  <!-- double chin line -->
  <path d="M 108 80 Q 102 85 96 82" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
</svg>`,

"Suboccipital Release": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="15" y1="145" x2="185" y2="145" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- figure lying face up -->
  <!-- torso -->
  <line x1="60" y1="135" x2="145" y2="138" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="50" cy="128" r="15" fill="none" stroke="white" stroke-width="3"/>
  <!-- two tennis balls in sock at base of skull -->
  <circle cx="42" cy="138" r="5" fill="#9acd32" stroke="#7ab32a" stroke-width="1.5"/>
  <circle cx="56" cy="138" r="5" fill="#9acd32" stroke="#7ab32a" stroke-width="1.5"/>
  <!-- sock outline -->
  <path d="M 35 138 Q 49 132 62 138" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
  <!-- knees bent -->
  <line x1="145" y1="138" x2="155" y2="110" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="155" y1="110" x2="165" y2="142" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms at sides -->
  <line x1="72" y1="132" x2="70" y2="142" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="90" y1="135" x2="88" y2="142" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- nod arrows -->
  <path d="M 38 115 Q 42 110 48 112" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <text x="30" y="108" fill="#ffd700" font-size="10" font-family="sans-serif">yes</text>
  <path d="M 30 125 Q 25 128 30 132" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
  <text x="12" y="126" fill="#ffd700" font-size="10" font-family="sans-serif">no</text>
</svg>`,

"Seated Pigeon Pose": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- chair -->
  <rect x="50" y="118" width="75" height="4" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <!-- torso leaning forward slightly -->
  <path d="M 88 118 Q 85 95 80 78" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="78" cy="56" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- left leg (base) straight down -->
  <line x1="78" y1="122" x2="72" y2="158" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="72" y1="158" x2="65" y2="180" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right ankle on left thigh -->
  <line x1="105" y1="122" x2="112" y2="135" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="112" y1="135" x2="78" y2="148" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- foot -->
  <line x1="78" y1="148" x2="72" y2="145" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- forward lean arrow -->
  <line x1="95" y1="82" x2="85" y2="76" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="88,71 82,74 86,80" fill="#ffd700"/>
  <!-- stretch highlight on glute -->
  <path d="M 115 128 Q 120 135 118 142" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.7"/>
</svg>`,

"IT Band & Outer Hip Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- figure standing, legs crossed -->
  <!-- right foot behind left -->
  <line x1="100" y1="130" x2="85" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="130" x2="110" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- torso leaning to left -->
  <path d="M 100 130 Q 88 100 78 75" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="73" cy="55" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- left arm reaching overhead to the right -->
  <path d="M 72 78 Q 58 50 55 30" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right arm hanging -->
  <line x1="90" y1="85" x2="100" y2="115" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- lean arrow -->
  <path d="M 65 40 Q 55 42 50 50" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="47,45 48,55 55,48" fill="#ffd700"/>
  <!-- stretch highlight on outer hip -->
  <path d="M 110 140 Q 118 150 115 162" fill="none" stroke="#ffd700" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.7"/>
</svg>`,

"Adductor Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- wide stance, lunging right -->
  <!-- right leg bent -->
  <line x1="110" y1="120" x2="140" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="140" y1="145" x2="145" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- left leg straight -->
  <line x1="90" y1="120" x2="50" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="145" x2="35" y2="185" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- hips -->
  <line x1="90" y1="120" x2="110" y2="120" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- torso shifted right -->
  <line x1="110" y1="120" x2="115" y2="72" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="117" cy="52" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms -->
  <line x1="112" y1="82" x2="140" y2="140" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="118" y1="82" x2="102" y2="112" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- stretch highlight on inner thigh -->
  <path d="M 55 148 Q 62 158 58 170" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.8"/>
  <!-- feet -->
  <line x1="145" y1="185" x2="155" y2="188" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="35" y1="185" x2="25" y2="188" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,

"90/90 Hip Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="165" x2="190" y2="165" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- seated on floor -->
  <!-- torso upright -->
  <line x1="100" y1="100" x2="100" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="78" r="17" fill="none" stroke="white" stroke-width="3"/>
  <!-- front leg: thigh forward, shin parallel to body -->
  <line x1="90" y1="155" x2="55" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="55" y1="155" x2="55" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="55" y1="165" x2="35" y2="165" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- back leg: thigh to side, shin back -->
  <line x1="110" y1="155" x2="145" y2="158" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="145" y1="158" x2="148" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="148" y1="165" x2="170" y2="162" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- 90 degree angle indicators -->
  <rect x="55" y="152" width="6" height="6" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
  <rect x="142" y="155" width="6" height="6" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
  <!-- lean forward arrow -->
  <line x1="108" y1="115" x2="115" y2="108" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="118,103 118,113 111,106" fill="#ffd700"/>
  <!-- hands on floor -->
  <line x1="90" y1="105" x2="75" y2="120" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="110" y1="105" x2="125" y2="120" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,

"Wall Pec Stretch (Low Angle)": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- wall -->
  <line x1="50" y1="10" x2="50" y2="195" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
  <!-- figure facing away from wall, turning -->
  <line x1="85" y1="88" x2="88" y2="155" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head turned away -->
  <circle cx="92" cy="65" r="16" fill="none" stroke="white" stroke-width="3"/>
  <!-- neck -->
  <line x1="87" y1="80" x2="85" y2="88" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right forearm on wall (low angle ~45 deg) -->
  <line x1="78" y1="95" x2="52" y2="85" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="52" y1="85" x2="52" y2="110" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- left arm free -->
  <line x1="95" y1="95" x2="108" y2="130" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- body turning away arrow -->
  <path d="M 108 75 Q 118 80 115 92" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="118,88 113,97 110,88" fill="#ffd700"/>
  <!-- stretch highlight on chest -->
  <path d="M 70 88 Q 72 80 80 78" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.8"/>
  <!-- legs -->
  <line x1="88" y1="155" x2="75" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="88" y1="155" x2="105" y2="190" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Prone Cobra": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="150" x2="190" y2="150" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- legs on ground -->
  <line x1="120" y1="142" x2="175" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- lower body -->
  <line x1="80" y1="140" x2="120" y2="142" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- upper body lifted -->
  <path d="M 80 140 Q 65 130 55 115" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head looking forward -->
  <circle cx="48" cy="102" r="14" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms at sides, rotated thumbs up -->
  <line x1="70" y1="132" x2="85" y2="142" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="62" y1="125" x2="78" y2="135" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- thumbs up -->
  <line x1="85" y1="142" x2="88" y2="136" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <line x1="78" y1="135" x2="82" y2="130" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <!-- lift arrow -->
  <line x1="60" y1="130" x2="52" y2="118" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="47,122 50,112 57,120" fill="#ffd700"/>
  <!-- shoulder blade squeeze indicators -->
  <path d="M 72 128 Q 78 124 82 128" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>
</svg>`,

"Nerve Glide — Median": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- torso -->
  <line x1="100" y1="90" x2="100" y2="165" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head tilting left (away from right arm) -->
  <circle cx="82" cy="62" r="17" fill="none" stroke="white" stroke-width="3"/>
  <line x1="100" y1="90" x2="88" y2="75" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- shoulders -->
  <line x1="68" y1="100" x2="132" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- right arm extended to side, palm up -->
  <line x1="132" y1="100" x2="175" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- wrist extended, fingers pointing down -->
  <line x1="175" y1="100" x2="178" y2="115" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- left arm relaxed -->
  <line x1="68" y1="100" x2="60" y2="138" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- nerve pathway (dotted line from neck to fingers) -->
  <path d="M 92 80 Q 110 90 132 100 Q 155 100 178 112" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" opacity="0.6"/>
  <!-- tilt arrow on head -->
  <path d="M 72 48 Q 65 50 62 56" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="59,51 60,60 66,54" fill="#ffd700"/>
  <!-- legs -->
  <line x1="100" y1="165" x2="82" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="165" x2="118" y2="195" stroke="white" stroke-width="3" stroke-linecap="round"/>
</svg>`,

"Knee-to-Chest Stretch": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="150" x2="190" y2="150" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- head lying down (left) -->
  <circle cx="38" cy="138" r="14" fill="none" stroke="white" stroke-width="3"/>
  <!-- torso along the floor -->
  <line x1="52" y1="142" x2="115" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- extended leg resting, knee bent, foot flat -->
  <line x1="115" y1="145" x2="150" y2="138" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="138" x2="155" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- drawn-up knee toward chest -->
  <line x1="115" y1="145" x2="118" y2="108" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="118" y1="108" x2="95" y2="128" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms hugging the knee -->
  <line x1="70" y1="143" x2="112" y2="112" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- pull arrow drawing knee in -->
  <path d="M 130 100 Q 120 96 108 102" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="111,96 104,103 113,108" fill="#ffd700"/>
</svg>`,

"Pelvic Tilts": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="160" x2="190" y2="160" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- head lying down (left) -->
  <circle cx="40" cy="148" r="14" fill="none" stroke="white" stroke-width="3"/>
  <!-- back flattening into floor -->
  <line x1="54" y1="151" x2="120" y2="152" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- thigh up, knee bent, feet flat -->
  <line x1="120" y1="152" x2="138" y2="120" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="138" y1="120" x2="150" y2="153" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- pelvis tilt rotation arrow -->
  <path d="M 104 132 A 16 16 0 0 1 128 132" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="124,124 130,134 118,134" fill="#ffd700"/>
  <!-- press-down indicator at lower back -->
  <line x1="110" y1="142" x2="110" y2="152" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>
</svg>`,

"Child's Pose": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="155" x2="190" y2="155" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- folded legs / hips back over heels (right) -->
  <line x1="148" y1="150" x2="120" y2="138" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- hips -->
  <circle cx="128" cy="140" r="4" fill="white"/>
  <!-- rounded back curving down to forehead -->
  <path d="M 128 140 Q 100 120 70 148" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head resting forward -->
  <circle cx="62" cy="148" r="12" fill="none" stroke="white" stroke-width="3"/>
  <!-- arms reaching forward along floor -->
  <line x1="92" y1="132" x2="48" y2="150" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- lengthen arrow -->
  <line x1="44" y1="142" x2="28" y2="142" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="32,137 24,142 32,147" fill="#ffd700"/>
</svg>`,

"Supine Spinal Twist": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="158" x2="190" y2="158" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- head turned one way (left) -->
  <circle cx="40" cy="118" r="13" fill="none" stroke="white" stroke-width="3"/>
  <!-- torso along floor -->
  <line x1="53" y1="122" x2="118" y2="126" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- arms out in a T (shoulders on floor) -->
  <line x1="70" y1="124" x2="70" y2="150" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="70" y1="124" x2="70" y2="100" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- knees dropped to the opposite side (down) -->
  <line x1="118" y1="126" x2="132" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <line x1="132" y1="150" x2="158" y2="150" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- twist rotation arrow -->
  <path d="M 124 110 A 18 18 0 0 1 140 138" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="135,142 144,140 138,131" fill="#ffd700"/>
</svg>`,

"Gentle Press-Up": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ground -->
  <line x1="10" y1="155" x2="190" y2="155" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <!-- legs and hips resting on floor (right) -->
  <line x1="175" y1="150" x2="115" y2="148" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- lower body flat -->
  <line x1="115" y1="148" x2="90" y2="146" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- chest lifted on forearms -->
  <path d="M 90 146 Q 72 132 66 112" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <!-- head looking forward -->
  <circle cx="58" cy="100" r="13" fill="none" stroke="white" stroke-width="3"/>
  <!-- forearm propping up (elbow to floor) -->
  <line x1="70" y1="124" x2="70" y2="150" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="70" y1="150" x2="92" y2="150" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  <!-- gentle extension arrow -->
  <path d="M 78 96 Q 70 88 60 86" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="64,81 56,86 64,91" fill="#ffd700"/>
</svg>`

};

// Get SVG for a stretch by name, or return a generic placeholder
function getStretchSVG(name) {
  return STRETCH_SVGS[name] || `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="85" r="25" fill="none" stroke="white" stroke-width="3"/>
    <line x1="100" y1="110" x2="100" y2="160" stroke="white" stroke-width="3" stroke-linecap="round"/>
    <line x1="100" y1="125" x2="70" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
    <line x1="100" y1="125" x2="130" y2="145" stroke="white" stroke-width="3" stroke-linecap="round"/>
    <line x1="100" y1="160" x2="78" y2="192" stroke="white" stroke-width="3" stroke-linecap="round"/>
    <line x1="100" y1="160" x2="122" y2="192" stroke="white" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}
