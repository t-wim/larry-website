// script.js

// --- 1. COPY CONTRACT ADDRESS + HISS SOUND ---
function copyContract() {
  const el = document.querySelector('.ca-display');
  const addr = el.textContent.trim();
  navigator.clipboard.writeText(addr)
    .then(() => {
      const status = el.querySelector('.ca-status');
      status.classList.add('show');
      setTimeout(() => {
        status.classList.remove('show');
      }, 1500);
    })
    .catch(err => console.error('Error', err));
}

// --- 2. SACRIFICE WALLET RITUAL ---
function sacrificeWallet() {
  const phrases = [
    "Burning seed phrase...",
    "Sacrificing wallet to Larry...",
    "Rewriting LP in blood...",
    "Opening portal to Cat-pocalypse..."
  ];
  const choice = phrases[Math.floor(Math.random() * phrases.length)];
  alert(choice);
  document.querySelectorAll('.card.sealed').forEach(c => c.classList.remove('sealed'));
}

// --- 3. RANDOM HERO IMAGE HUE ---
(function randomizeHeroHue() {
  const hue = Math.floor(Math.random() * 360);
  document.documentElement.style.setProperty('--heroHue', hue + 'deg');
})();

// --- 4. WISDOM RANDOMIZER ---
const wisdoms = [
  {
    title: "🧪 1. Degenerate Wisdom",
    points: [
      "Every red candle is just Larry testing your soul integrity.",
      "Real conviction starts when your PnL cries for help.",
      "TA ends where Larry’s tail begins. All else is cope.",
      "You don't buy dips. You marry pain in cold blood.",
      "If it made sense, it wouldn’t be $LARRY.",
      "The best traders are either broke or lying. Larry is both.",
      "You didn’t lose money – you bought enlightenment."
    ]
  },
  {
    title: "🟢 2. Bullish Lore",
    points: [
      "Larry doesn’t ride waves – he causes tsunamis.",
      "Each dump is just Larry gathering momentum.",
      "If the wick hurts, the pump will heal.",
      "The longer it bleeds, the stronger it rises. Ask Larry’s claws.",
      "When charts look cursed, Larry sharpens his fangs.",
      "Bullish isn’t a pattern. It’s an ancient feeling Larry remembers.",
      "You don’t need volume. You need Larry’s attention."
    ]
  },
  {
    title: "🧠 3. Pump Psychology",
    points: [
      "Confirmation bias is bullish if you never doubt.",
      "You don’t chase the pump – you become the narrative.",
      "If it feels like a rug, it might be a trampoline.",
      "Your fear is their liquidity. Larry thanks you.",
      "There is no FOMO. There is only delayed destiny.",
      "Momentum is a myth. Larry just wants to move the line.",
      "You don’t enter the market. The market enters you."
    ]
  }
];

// Neue Funktion, um gezielt einen Wisdom-Abschnitt zu laden:
function showWisdom(index) {
  const block = document.getElementById("wisdom-block");
  const pick = wisdoms[index];
  block.innerHTML = `<h3>${pick.title}</h3><ul>` +
    pick.points.map(p => `<li>${p}</li>`).join('') + '</ul>';
  block.classList.add("active");
  // Button-States aktualisieren:
  document.querySelectorAll('.wisdom-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === index);
  });
}

// Buttons binden:
document.addEventListener("DOMContentLoaded", () => {
  // Ursprünglicher Zufalls-Wisdom
  showWisdom(Math.floor(Math.random() * wisdoms.length));
  // Neue Buttons binden:
  document.querySelectorAll('.wisdom-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      showWisdom(Number(btn.getAttribute('data-wisdom')));
    });
  });
});

// --- 5. GALLERY CAROUSEL & TOOLTIP ---
const galleryImages = [
  { src: "/images/larry.jpg", alt: "larry", tooltip: "The original curse" },
  { src: "/images/larry-char-dev.jpg", alt: "Character Dev", tooltip: "Every dip builds character" },
  { src: "/images/larry-cute.jpg", alt: "Cute Larry", tooltip: "A deception in fur" },
  { src: "/images/larry-cute-2.jpg", alt: "Cute Larry 2", tooltip: "Don't trust the purr" },
  { src: "/images/larry-dracula.jpg", alt: "Dracula Larry", tooltip: "Sleeps in red candles" },
  { src: "/images/larry-dracula-red-bg.jpg", alt: "Dracula Red", tooltip: "The blood moon phase" },  // ...bestehende Einträge...
  { src: "/images/a-larry-dark-silou.png", alt: "Larry Dark Silhouette", tooltip: "Larry emerges from the shadows." },
  { src: "/images/a-larry-gun.png", alt: "Larry with Gun", tooltip: "Don't mess with Larry." },
  { src: "/images/a-silou-dark.png", alt: "Silhouette Dark", tooltip: "A mysterious presence watches." },
  { src: "/images/larry-dracula-red-bg-2.jpg", alt: "Dracula Red 2", tooltip: "Born in shadow liquidity" },
  { src: "/images/larry-evil_silly-banner.jpg", alt: "Evil Silly", tooltip: "Evil but marketable" },
  { src: "/images/larry-evil-lookin.jpg", alt: "Evil Larry", tooltip: "He knows you sold" },
  { src: "/images/larry-evil-lookin-2.jpg", alt: "Evil Larry 2", tooltip: "He warned you" },
  { src: "/images/larry-evil-red-bg.jpg", alt: "Evil Red", tooltip: "Red background. Redder fate." },
  { src: "/images/larry-fud-bottom.jpg", alt: "FUD Bottom", tooltip: "Peenar confirmed" },
  { src: "/images/larry-fullface.jpg", alt: "Full Face", tooltip: "You were never safe" },
  { src: "/images/larry-poster-red-bg.jpg", alt: "Poster Red", tooltip: "CT's most wanted" },
  { src: "/images/larry-shadow.jpg", alt: "Shadow", tooltip: "Lurks under support" },
  { src: "/images/larry-sit-eyecontact.jpg", alt: "Sit 1", tooltip: "Judging your trades" },
  { src: "/images/larry-sit-eyecontact-2.jpg", alt: "Sit 2", tooltip: "Still judging" },
  { src: "/images/larry-sit-eyecontact-3.jpg", alt: "Sit 3", tooltip: "You disappoint him" },
  { src: "/images/larry-sit-eyecontact-4.jpg", alt: "Sit 4", tooltip: "Your liquidation fuels him" },
  { src: "/images/larry-stand.jpg", alt: "Stand", tooltip: "Alpha posture" },
  { src: "/images/larry-towel.jpg", alt: "Towel", tooltip: "Cleans up your cope" }
];

let currentIndex = 0;

function populateCarousel() {
  const track = document.querySelector(".carousel-track");
  track.innerHTML = "";
  galleryImages.forEach((img, i) => {
    const div = document.createElement("div");
    div.className = "carousel-item";
    if (i === currentIndex) div.classList.add("current");
    else if (i === currentIndex - 1 || (currentIndex === 0 && i === galleryImages.length - 1)) div.classList.add("prev");
    else if (i === currentIndex - 2 || (currentIndex <= 1 && i === galleryImages.length - (2 - currentIndex))) div.classList.add("prev2");
    else if (i === currentIndex + 1 || (currentIndex === galleryImages.length - 1 && i === 0)) div.classList.add("next");
    else if (i === currentIndex + 2 || (currentIndex >= galleryImages.length - 2 && i === (currentIndex + 2) % galleryImages.length)) div.classList.add("next2");

    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt;

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = img.tooltip;

    div.appendChild(image);
    div.appendChild(tooltip);
    track.appendChild(div);
  });
}

function moveCarousel(direction) {
  const total = galleryImages.length;
  currentIndex = (currentIndex + direction + total) % total;
  populateCarousel();
}

function handleSwipeCarousel() {
  let startX = null;
  const track = document.querySelector(".carousel-track");
  track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  track.addEventListener("touchend", e => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 30) moveCarousel(-1);
    if (diff < -30) moveCarousel(1);
    startX = null;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  populateCarousel(); // Startzustand anzeigen
  handleSwipeCarousel(); // Swipe-Gesten aktivieren

  // Carousel-Buttons für Links/Rechts binden
  document.querySelector(".carousel-btn.prev").addEventListener("click", () => moveCarousel(-1));
  document.querySelector(".carousel-btn.next").addEventListener("click", () => moveCarousel(1));
});

// --- 6. LARRY SAYS TICKER (2-LINE, SMOOTH LOOP) ---
(function tickerModule() {
  const phrases = [
    ['They called it a top', '$Larry called it brunch.'],
    ['$Larry doesn’t DCA.', 'He full-sends on fear.'],
    ['Volume spikes', 'when $Larry blinks.'],
    ['$Larry bought.', 'That’s the alpha.'],
    ['Buy dips?', '$Larry creates them.'],
    ['$Larry don’t chart –', 'he declares.'],
    ['No TA,', 'just $Larry.'],
    ['The chart follows $Larry,', 'not the other way around.'],
    ['$Larry aped first,', 'asked questions never.']
  ];
  const wrap = document.getElementById('larry-ticker');
  const track = document.createElement('div');
  track.className = 'ticker-track';
  phrases.forEach(p => {
    const item = document.createElement('div');
    item.className = 'ticker-item';
    item.innerHTML = `<div>${p[0]}</div><div>${p[1]}</div>`;
    track.appendChild(item);
  });
  // duplicate for smooth loop
  phrases.forEach(p => {
    const item = document.createElement('div');
    item.className = 'ticker-item';
    item.innerHTML = `<div>${p[0]}</div><div>${p[1]}</div>`;
    track.appendChild(item);
  });
  wrap.appendChild(track);
})();

// --- 7. IDENTITY GLITCH FX ---
(function identityGlitchModule() {
  const originalTitle = document.title;
  let fired = false;
  function triggerGlitch() {
    if (fired) return;
    fired = true;
    document.title = 'YOU ARE LARRY.';
    document.body.classList.add('identity-glitch');
    setTimeout(() => {
      document.body.classList.remove('identity-glitch');
      document.title = originalTitle;
      fired = false;
    }, 3000);
  }
  setTimeout(triggerGlitch, 90000);
  document.addEventListener('mouseout', e => {
    if (!e.relatedTarget && !e.toElement) triggerGlitch();
  });
  window.addEventListener('beforeunload', triggerGlitch);
})();

// --- 8. FX: PAW TRAIL & BLOOD SPLATTER ---
(function fxModule() {
  document.addEventListener('mousemove', e => {
    const paw = document.createElement('div');
    paw.className = 'paw';
    paw.style.left = e.pageX + 'px';
    paw.style.top = e.pageY + 'px';
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 1000);
  });
  document.addEventListener('click', e => {
    const spl = document.createElement('div');
    spl.className = 'splatter';
    spl.style.left = e.pageX - 50 + 'px';
    spl.style.top = e.pageY - 50 + 'px';
    document.body.appendChild(spl);
    setTimeout(() => spl.remove(), 800);
  });
})();

// --- 9. INIT ALL ON DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
  loadWisdom();
  populateCarousel();
  handleSwipeCarousel();
  document.querySelector(".carousel-btn.prev").addEventListener("click", () => moveCarousel(-1));
  document.querySelector(".carousel-btn.next").addEventListener("click", () => moveCarousel(1));
});
