// script.js -- Degenerate Evil Larry Effects (with 50 Tooltips)

// ----- Contract Copy Logic -----
function copyContract() {
  const contract = document.getElementById("contract");
  const status = document.getElementById("caStatus");
  navigator.clipboard.writeText(contract.textContent.trim()).then(() => {
    status.classList.add("show");
    setTimeout(() => status.classList.remove("show"), 2000);
  });
}

// ----- Wallet Sacrifice Trigger -----
function sacrificeWallet() {
  alert("Your wallet has been sacrificed to Larry. May you pump in peace.");
}

// ----- Ticker Feed -----
const tickerStatements = [
  "$LARRY is watching.",
  "You don’t hold $LARRY. It holds you.",
  "FUD is Larry’s foreplay.",
  "Every dip is character development.",
  "0xDEAD...C0DE is written in blood.",
  "Summoned by memes, sustained by liquidity.",
];

function populateTicker() {
  const ticker = document.getElementById("larry-ticker");
  const track = document.createElement("div");
  track.className = "ticker-track";
  tickerStatements.forEach(text => {
    const item = document.createElement("div");
    item.className = "ticker-item";
    item.textContent = text;
    track.appendChild(item);
  });
  // Duplicate to enable infinite scroll
  tickerStatements.forEach(text => {
    const item = document.createElement("div");
    item.className = "ticker-item";
    item.textContent = text;
    track.appendChild(item);
  });
  ticker.appendChild(track);
}

// ----- Wisdom Randomizer -----
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
      "You didn’t lose money – you bought enlightenment.",
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
      "You don’t need volume. You need Larry’s attention.",
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
      "You don’t enter the market. The market enters you.",
    ]
  }
];

function loadWisdom() {
  const block = document.getElementById("wisdom-block");
  const pick = wisdoms[Math.floor(Math.random() * wisdoms.length)];
  block.innerHTML = `<h3>${pick.title}</h3><ul>` + pick.points.map(p => `<li>${p}</li>`).join('') + '</ul>';
  block.classList.add("active");
}

// ----- Gallery Carousel -----
const galleryImages = [
  { src: "/images/meme1.jpg", alt: "Dump", tooltip: "Larry watching a red candle" },
  { src: "/images/meme2.jpg", alt: "Pump", tooltip: "Character development" },
  { src: "/images/meme3.jpg", alt: "Cope", tooltip: "FOMO is a choice" },
  { src: "/images/meme4.jpg", alt: "Rug", tooltip: "Was it a trampoline?" },
  { src: "/images/meme5.jpg", alt: "Larry", tooltip: "Evil never sleeps" },
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

// ----- Init -----
document.addEventListener("DOMContentLoaded", () => {
  populateTicker();
  loadWisdom();
  populateCarousel();
  handleSwipeCarousel();

  document.querySelector(".carousel-btn.prev").addEventListener("click", () => moveCarousel(-1));
  document.querySelector(".carousel-btn.next").addEventListener("click", () => moveCarousel(1));
});
