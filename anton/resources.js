const resources = {
  "purpose": {
    "watch": [
      [
        "Anton and the Ink of Intention",
        "https://www.youtube.com/watch?v=xoOsn7Y9zZE"
      ],
      [
        "Creating a Personal Defined Success Plan",
        "https://www.youtube.com/watch?v=SOeKdIpeVXg"
      ],
      [
        "Anton Meets a Contemplative Caterpillar",
        "https://www.youtube.com/watch?v=FcnDKfZ0o7M"
      ]
    ],
    "listen": [
      "HINDU · Trap and Bass",
      "https://drive.google.com/file/d/10ACwU9L8KyeDoNC7iqm1g9F4zkDBHp5k/view?usp=drivesdk"
    ],
    "read": [
      "Anton’s Lesson",
      "https://docs.google.com/document/d/1UpRLNseMoK-JFMGwyBTeOTZoboPbU97h/edit?usp=drivesdk&ouid=100049109908282051495&rtpof=true&sd=true"
    ],
    "prompt": "Picture Anton taking his first step toward the creek. What would you choose to spend your energy on?"
  },
  "beliefs": {
    "watch": [
      [
        "Anton Learns the Lore of Language",
        "https://www.youtube.com/watch?v=oDdWZ33Vb1c"
      ],
      [
        "Anton and the Parrot of Pure Echo",
        "https://www.youtube.com/watch?v=sopvbmcmCk0"
      ],
      [
        "Anton and the Rose of True Reflection",
        "https://www.youtube.com/watch?v=P01rX3jic8o"
      ]
    ],
    "listen": [
      "7.83 Hz · Earth’s Magnetic Healing",
      "https://drive.google.com/file/d/1rqS97wHzncCBP1RbvDs9YGHH5_JW4j5x/view?usp=drivesdk"
    ],
    "read": [
      "Anton’s Bloom",
      "https://drive.google.com/file/d/11Q-5TOASo7iTGQiTE718mayX9v3b1bnI/view?usp=drivesdk"
    ],
    "prompt": "Listen for a moment before describing what you hear. Which details did you expect, and which surprised you?"
  },
  "values": {
    "watch": [
      [
        "Anton and the Fifth Gate: Empathy, Part I",
        "https://www.youtube.com/watch?v=e1iDljgX5UM"
      ],
      [
        "Anton Appreciates Fellowship in Diversity",
        "https://www.youtube.com/watch?v=PD50MpGgIeU"
      ],
      [
        "Anton Learns Love from a Black Lace-Weaver",
        "https://www.youtube.com/watch?v=beaCd5BDQl0"
      ]
    ],
    "listen": [
      "ABORIGIMAN · Ambient Downtempo",
      "https://drive.google.com/file/d/1gtlNNTQwh8XOA_i1jF0EjLfkKCHkZTyA/view?usp=drivesdk"
    ],
    "read": [
      "Anton and the Echo of Ancestorial Empathy",
      "https://docs.google.com/document/d/1YAObiJ81xy201j8IEfolby1WEaDlYQ-t/edit?usp=drivesdk&ouid=100049109908282051495&rtpof=true&sd=true"
    ],
    "prompt": "Think back to the traveler under the leaf. As you listen, imagine the rain from the traveler’s side."
  },
  "morals": {
    "watch": [
      [
        "Anton and the Acorn: A Story About Roots and Responsibility",
        "https://www.youtube.com/watch?v=uM1gh9g5FgA"
      ],
      [
        "Anton Learns Fidelity from Susan the Steadfast Swan",
        "https://www.youtube.com/watch?v=bB32B21bWZI"
      ],
      [
        "Anton and the Ashen Wolf: A Glyph of Three Pardons",
        "https://www.youtube.com/watch?v=sMKGOcg8sXQ"
      ]
    ],
    "listen": [
      "Reverential Affirmational Prayer",
      "https://drive.google.com/file/d/1t8oBeWIW8IFInUM3esRh_dhMLgD7ZuBX/view?usp=drivesdk"
    ],
    "read": [
      "Anton’s Nectar",
      "https://docs.google.com/document/d/1zCByuQxibY5n9ZBRSFs6UfZmUyXHBijjvkm2iFJon9A/edit?usp=drivesdk"
    ],
    "prompt": "Bring to mind one small thing someone entrusted to your care. What would it mean to honor that trust today?"
  }
};
const jokes = ["I counted my pockets and discovered six opportunities for lint.", "I tried to measure wisdom with a ruler. The ruler resigned.", "My greatest treasure is curiosity. It fits in no pocket."];
let remaining = [];
let lastJoke = -1;
try {
  const saved = JSON.parse(sessionStorage.getItem('anton-jokes-v1'));
  if (saved && Array.isArray(saved.deck) && saved.deck.every(i=>Number.isInteger(i) && i>=0 && i<jokes.length)) {
    remaining = saved.deck;
    lastJoke = saved.last;
  }
} catch {}
function nextJoke() {
  if (!remaining.length) {
    remaining = jokes.map((_,i)=>i);
    for (let i=remaining.length-1;i>0;i--) {
      const j=Math.floor(Math.random()*(i+1));
      [remaining[i],remaining[j]]=[remaining[j],remaining[i]];
    }
    const end=remaining.length-1;
    if (remaining[end]===lastJoke) [remaining[0],remaining[end]]=[remaining[end],remaining[0]];
  }
  lastJoke=remaining.pop();
  try {sessionStorage.setItem('anton-jokes-v1',JSON.stringify({deck:remaining,last:lastJoke}));} catch {}
  return jokes[lastJoke];
}
function antonReflection() { return '<section class="anton-appeal"><h2>Anton reflects</h2><p class="appeal-line" aria-live="polite">'+nextJoke()+'</p><button class="another-joke" type="button">Another reflection</button></section>'; }
document.addEventListener('click', event=>{
  const control=event.target.closest('.another-joke');
  if (control) control.closest('.anton-appeal').querySelector('.appeal-line').textContent=nextJoke();
});
function trailEnding(slug, mode, answer) {
  const trail = resources[slug];
  const [title, url] = mode === 'watch' ? trail.watch[['yes','no','pause'].indexOf(answer)] : trail[mode];
  const media = new URL(url);
  const id = mode === 'watch' ? media.searchParams.get('v') : media.pathname.split('/d/')[1].split('/')[0];
  const embed = mode === 'watch'
    ? 'https://www.youtube.com/embed/' + id + '?playsinline=1'
    : 'https://drive.google.com/file/d/' + id + '/preview';
  const fallback = {watch:'Open on YouTube', listen:'Open recording in Drive', read:'Open full-size book'}[mode];
  return '<section class="ending"><small>End of the trail</small><h2>'+title+'</h2>'+
    (mode==='listen'?'<p>'+trail.prompt+'</p>':'')+
    '<iframe class="media-frame '+mode+'" src="'+embed+'" title="'+title+'" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>'+
    '<a class="destination" href="'+url+'">'+fallback+' ↗</a></section>'+antonReflection();
}
