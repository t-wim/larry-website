/* ==========================================================================
   $LARRY – script.js  (Evil Prophecy Void • Production build)
   - Overlay system
   - Clipboard (contract copy)
   - Ritual (sacrifice wallet)
   - Wisdom tabs
   - Albums gallery (Akkordeon) with Classic (Top/Bottom) set
   - Ticker & Identity glitch
   ========================================================================== */

/* ----------------------------------------
   OVERLAY
---------------------------------------- */
function showOverlay(title, message, imageSrc = '/images/larry-evil-lookin.jpg') {
  const overlay = document.getElementById('custom-overlay');
  if (!overlay) return null;

  const overlayTitle = overlay.querySelector('.overlay-title');
  const overlayMessage = overlay.querySelector('.overlay-message');
  const overlayImage = overlay.querySelector('.overlay-image');

  overlayTitle && (overlayTitle.textContent = title || '');
  overlayMessage && (overlayMessage.textContent = message || '');
  if (overlayImage && imageSrc) overlayImage.style.backgroundImage = `url('${imageSrc}')`;

  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');

  const closeBtn = overlay.querySelector('.overlay-close');
  closeBtn && closeBtn.focus();

  return overlay;
}

function hideOverlay() {
  const overlay = document.getElementById('custom-overlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
}

function initializeOverlayHandlers() {
  const overlay = document.getElementById('custom-overlay');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.overlay-close');
  closeBtn && closeBtn.addEventListener('click', hideOverlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideOverlay();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) hideOverlay();
  });
}

/* ----------------------------------------
   CONTRACT COPY
---------------------------------------- */
function copyContract() {
  const contractDisplay = document.querySelector('.ca-display');
  const statusElement = contractDisplay?.querySelector('.ca-status');
  if (!contractDisplay) return;

  // Extract only the address text (exclude status span)
  const tmp = contractDisplay.cloneNode(true);
  tmp.querySelector('.ca-status')?.remove();
  const contractAddress = (tmp.textContent || '').trim();

  const onSuccess = () => {
    if (statusElement) {
      statusElement.classList.add('show');
      setTimeout(() => statusElement.classList.remove('show'), 1500);
    }
    showOverlay(
      'Contract Copied! 📋',
      "Larry's contract address is now in your clipboard. Use it wisely... or Larry will judge your trades.",
      '/images/larry-sit-eyecontact.jpg'
    );
    setTimeout(hideOverlay, 3000);
  };

  const onFailure = () => {
    showOverlay(
      'Copy Failed! 😾',
      "Larry's claws prevented the copy. Please select and copy the contract address manually.",
      '/images/larry-fud-bottom.jpg'
    );
    setTimeout(hideOverlay, 4000);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(contractAddress).then(onSuccess).catch(() => {
      fallbackCopyTextToClipboard(contractAddress, onSuccess, onFailure);
    });
  } else {
    fallbackCopyTextToClipboard(contractAddress, onSuccess, onFailure);
  }
}

function fallbackCopyTextToClipboard(text, onSuccess, onFailure) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textArea);
    ok ? onSuccess() : onFailure();
  } catch {
    onFailure();
  }
}

/* ----------------------------------------
   RITUAL
---------------------------------------- */
function sacrificeWallet() {
  const messages = [
    {
      title: 'Burning Seed Phrase... 🔥',
      message:
        "Larry watches as your precious words turn to ash. Your wallet's soul now belongs to the void. Hope you have backups...",
      image: '/images/larry-evil-red-bg.jpg',
    },
    {
      title: 'Sacrificing to Larry... 🐈‍⬛',
      message:
        'The ritual is complete. Larry has accepted your offering. Your portfolio is now cursed with eternal volatility.',
      image: '/images/larry-dracula.jpg',
    },
    {
      title: 'Rewriting LP in Blood... 💀',
      message:
        'Liquidity pools now flow with crimson. Every trade will remind you of this moment. Larry’s signature is permanent.',
      image: '/images/larry-dracula-red-bg.jpg',
    },
    {
      title: 'Portal to Cat-pocalypse... 🌌',
      message:
        'The gateway opens. Ancient feline forces pour into the markets. Your charts will never look the same again.',
      image: '/images/larry-shadow.jpg',
    },
  ];
  const pick = messages[Math.floor(Math.random() * messages.length)];
  showOverlay(pick.title, pick.message, pick.image);
  setTimeout(hideOverlay, 5000);
}

/* ----------------------------------------
   WISDOM
---------------------------------------- */
const wisdoms = [
  {
    title: '🧪 1. Degenerate Wisdom',
    points: [
      'Every red candle is just Larry testing your soul integrity.',
      'Real conviction starts when your PnL cries for help.',
      "TA ends where Larry’s tail begins. All else is cope.",
      "You don't buy dips. You marry pain in cold blood.",
      "If it made sense, it wouldn't be $LARRY.",
      'The best traders are either broke or lying. Larry is both.',
      "You didn't lose money — you bought enlightenment.",
    ],
  },
  {
    title: '🚀 2. Bullish Lore',
    points: [
      "Larry doesn't ride waves — he causes tsunamis.",
      'Each dump is just Larry gathering momentum.',
      'If the wick hurts, the pump will heal.',
      "The longer it bleeds, the stronger it rises. Ask Larry's claws.",
      'When charts look cursed, Larry sharpens his fangs.',
      "Bullish isn't a pattern. It's an ancient feeling Larry remembers.",
      "You don't need volume. You need Larry's attention.",
    ],
  },
  {
    title: '🧠 3. Pump Psychology',
    points: [
      'Confirmation bias is bullish if you never doubt.',
      'You don’t chase the pump — you become the narrative.',
      'If it feels like a rug, it might be a trampoline.',
      'Your fear is their liquidity. Larry thanks you.',
      'There is no FOMO. There is only delayed destiny.',
      'Momentum is a myth. Larry just wants to move the line.',
      'You don’t enter the market. The market enters you.',
    ],
  },
];

function showWisdom(index) {
  try {
    const block = document.getElementById('wisdom-block');
    const w = wisdoms[index];
    if (!block || !w) return;

    block.innerHTML = `<h3>${w.title}</h3><ul>${w.points.map((p) => `<li>${p}</li>`).join('')}</ul>`;
    block.classList.add('active');

    document.querySelectorAll('.wisdom-btn').forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
      active ? (btn.id = 'active-wisdom-tab') : btn.removeAttribute('id');
    });
  } catch (err) {
    console.error('Error showing wisdom:', err);
  }
}

/* ----------------------------------------
   HELPER: assets & meta
---------------------------------------- */
const EXT_ORDER = ['.jpg', '.png', '.jpeg', '.webp'];
function buildSrc(base, tryIndex = 0) {
  return `/images/${base}${EXT_ORDER[Math.max(0, Math.min(tryIndex, EXT_ORDER.length - 1))]}`;
}

function humanizeBase(base) {
  // e.g., "larry-evil-red-bg" -> "Larry Evil Red Bg"
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function defaultAlt(base) {
  return humanizeBase(base);
}

/* Classic top/bottom phrases (can be extended on demand) */
const classicPhrases = {
  'larry-evil-red-bg': { top: 'Market bleeding?', bottom: 'Ritual feeding.' },
  'larry-dracula-red-bg': { top: 'Bulls pray', bottom: 'Predators dine.' },
  'larry-dracula-red-bg-2': { top: 'Stake your claim', bottom: 'He’ll stake your soul.' },
  'larry-cute': { top: 'He looks harmless', bottom: 'So did the top.' },
  'larry-cute-2': { top: 'Comfort entry?', bottom: 'Discomfort exit.' },
  'larry-stand': { top: 'We break out?', bottom: 'We fake out.' },
  'larry-sit-eyecontact': { top: 'Consider averaging?', bottom: 'Consider suffering.' },
  'larry-evil-lookin': { top: 'I saw your stop-loss', bottom: 'It amused me.' },
  'larry-fullface': { top: 'Trust your TA?', bottom: 'Larry trusts your tears.' },
  'larry-mc': { top: 'You ordered profits', bottom: 'We served lessons.' },
  'larry-fud-bottom': { top: 'They fear bottoms', bottom: 'We farm them.' },
  'larry': { top: 'Green candle?', bottom: 'Green trap.' },
};

/* ----------------------------------------
   ALBUMS – manifest (no cross-listing across non-classic albums)
   Classic album may cross-list with others by design.
---------------------------------------- */
const albumManifest = [
  {
    id: 'classic',
    title: 'Classic Meme (Top/Bottom)',
    phrase: 'Burn the chart. Bless the caption.',
    images: [
      'larry-evil-red-bg',
      'larry-dracula-red-bg',
      'larry-dracula-red-bg-2',
      'larry-cute',
      'larry-cute-2',
      'larry-stand',
      'larry-sit-eyecontact',
      'larry-evil-lookin',
      'larry-fullface',
      'larry-mc',
      'larry-fud-bottom',
      'larry',
    ],
  },
  {
    id: 'bloodmoon',
    title: 'Blood Moon / Dracula Arc',
    phrase: 'Nocturnal pumps, eternal fangs.',
    images: ['larry-dracula', 'larry-dracula-red-bg', 'larry-dracula-red-bg-2', 'larry-proph1', 'ritual-bf-bo'],
  },
  {
    id: 'stare',
    title: 'Judgment Stare',
    phrase: 'He judges; you justify.',
    images: ['larry-sit-eyecontact-2', 'larry-sit-eyecontact-3', 'larry-sit-eyecontact-4', 'larry-fullface', 'larry-evil-lookin'],
  },
  {
    id: 'shadow',
    title: 'Shadow Realm',
    phrase: 'Follow the wick; meet the abyss.',
    images: [
      'a-larry-dark-silou',
      'a-silou-dark',
      'larry-shadow',
      'mystic',
      'evil-larry-burning',
      'larry-evil-weed',
      'larry-evil_silly-banner',
      'larry-evil-red-bg',
      'larry-bg-nuke',
    ],
  },
  {
    id: 'ct-life',
    title: 'CT Life & Parody',
    phrase: 'The market calls; Larry answers.',
    images: [
      'larry-decaprio',
      'larry-calling',
      'larry-char-dev',
      'larry-cooking',
      'larry-towel',
      'larry-well-dressed',
      'larry-whisper',
      'larry-whuut',
      'larry-door-bell',
      'larry-poster-red-bg',
      'larry-rizz-god',
      'larry-keep-buyin',
      'larry-mc',
      'larry-fud-bottom',
    ],
  },
  {
    id: 'power',
    title: 'Weapons, Suits & Flex',
    phrase: 'Dominance is a utility.',
    images: ['a-larry-gun', 'larry-well-dressed', 'larry-poster-red-bg'],
  },
];

/* Ensure no cross-listing across non-classic albums (dedupe) */
function dedupeNonClassicAlbums(manifest) {
  const seen = new Set();
  return manifest.map((album) => {
    if (album.id === 'classic') return album; // classic can overlap
    const imgs = [];
    for (const base of album.images) {
      if (!seen.has(base)) {
        imgs.push(base);
        seen.add(base);
      }
    }
    return { ...album, images: imgs };
  });
}

/* ----------------------------------------
   GALLERY – build albums (details/summary accordion)
---------------------------------------- */
function buildAlbums() {
  const host = document.getElementById('void-albums');
  if (!host) return;

  host.innerHTML = '';

  const manifest = dedupeNonClassicAlbums(albumManifest)
    .map((a) => ({ ...a, images: [...new Set(a.images)] })) // local dedupe per album
    .filter((a) => a.images.length > 0);

  const toSrc = (base) => buildSrc(base, 0);

  manifest.forEach((album, idx) => {
    const $details = document.createElement('details');
    $details.className = 'album';
    if (idx === 0) $details.setAttribute('open', '');

    const $summary = document.createElement('summary');
    $summary.className = 'album-header';
    $summary.innerHTML = `
      <div class="album-head">
        <div class="album-title">${album.title}</div>
        <div class="album-phrase">${album.phrase || ''}</div>
      </div>
      <div class="album-meta">
        <div class="album-count" aria-label="Anzahl">${album.images.length}</div>
        <div class="album-toggle" aria-hidden="true">▾</div>
      </div>
    `;

    const $panel = document.createElement('div');
    $panel.className = 'album-panel';
    const $grid = document.createElement('div');
    $grid.className = 'album-grid';
    $panel.appendChild($grid);

    $details.appendChild($summary);
    $details.appendChild($panel);
    host.appendChild($details);

    const mount = () => {
      if ($grid.childElementCount) return;
      album.images.forEach((base) => {
        const fig = document.createElement('figure');
        fig.className = 'void-item';
        fig.setAttribute('role', 'listitem');

        const img = document.createElement('img');
        img.src = toSrc(base);
        img.alt = defaultAlt(base);
        img.loading = 'lazy';
        img.decoding = 'async';

        // Chain-onerror to try next extensions, then placeholder
        img.dataset.tryIndex = '0';
        img.onerror = function () {
          let i = parseInt(this.dataset.tryIndex || '0', 10) + 1;
          if (i < EXT_ORDER.length) {
            this.dataset.tryIndex = String(i);
            this.src = buildSrc(base, i);
          } else {
            this.onerror = null;
            this.src = '/images/placeholder.jpg';
            this.alt = 'Bild nicht verfügbar';
          }
        };

        fig.appendChild(img);

        // Zoom via Overlay, show classic phrases if available
        fig.addEventListener('click', () => {
          const phrase = classicPhrases[base];
          const title = phrase ? `${phrase.top} / ${phrase.bottom}` : humanizeBase(base);
          showOverlay(title, phrase ? 'Classic Meme Template' : album.phrase || 'Meme Artifact', img.src);
          setTimeout(hideOverlay, 4000);
        });

        // subtle fade-in
        fig.style.opacity = '.001';
        fig.style.transform = 'translateY(8px)';
        requestAnimationFrame(() => {
          fig.style.transition = 'opacity .35s ease, transform .35s ease';
          fig.style.opacity = '1';
          fig.style.transform = 'translateY(0)';
        });

        $grid.appendChild(fig);
      });
    };

    if (idx === 0) mount();

    // only one album open at once
    $details.addEventListener('toggle', () => {
      if ($details.open) {
        document.querySelectorAll('details.album[open]').forEach((d) => {
          if (d !== $details) d.open = false;
        });
        mount();
      }
    });
  });
}

/* ----------------------------------------
   TICKER
---------------------------------------- */
function initializeTicker() {
  try {
    const tickerData = [
      ['They called it a top', '$Larry called it brunch.'],
      ['$Larry doesn’t DCA.', 'He full-sends on fear.'],
      ['Volume spikes', 'when $Larry blinks.'],
      ['$Larry bought.', "That's the alpha."],
      ['Buy dips?', '$Larry creates them.'],
      ['$Larry doesn’t chart –', 'he declares.'],
      ['No TA,', 'just $Larry.'],
      ['The chart follows $Larry,', 'not the other way around.'],
      ['$Larry aped first,', 'asked questions never.'],
    ];

    const ticker = document.getElementById('larry-ticker');
    if (!ticker) return;

    const track = document.createElement('div');
    track.className = 'ticker-track';

    for (let r = 0; r < 2; r++) {
      tickerData.forEach((item) => {
        const el = document.createElement('div');
        el.className = 'ticker-item';
        el.innerHTML = `<div>${item[0]}</div><div>${item[1]}</div>`;
        track.appendChild(el);
      });
    }
    ticker.appendChild(track);
  } catch (e) {
    console.error('Error initializing ticker:', e);
  }
}

/* ----------------------------------------
   IDENTITY GLITCH
---------------------------------------- */
function initializeIdentityGlitch() {
  const originalTitle = document.title;
  let running = false;
  const trigger = () => {
    if (running) return;
    running = true;
    document.title = 'YOU ARE LARRY.';
    document.body.classList.add('identity-glitch');
    setTimeout(() => {
      document.body.classList.remove('identity-glitch');
      document.title = originalTitle;
      running = false;
    }, 3000);
  };
  setTimeout(trigger, 90000);
  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) trigger();
  });
  window.addEventListener('beforeunload', trigger);
}

/* ----------------------------------------
   RANDOM HERO HUE
---------------------------------------- */
function initializeRandomHeroHue() {
  const hue = Math.floor(Math.random() * 360);
  document.documentElement.style.setProperty('--heroHue', `${hue}deg`);
}

/* ----------------------------------------
   MAIN
---------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeRandomHeroHue();
    initializeOverlayHandlers();

    // Wisdom init
    const randomWisdom = Math.floor(Math.random() * wisdoms.length);
    showWisdom(randomWisdom);
    document.querySelectorAll('.wisdom-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => showWisdom(index));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showWisdom(index);
        }
      });
    });

    // Albums gallery
    if (document.getElementById('void-albums')) {
      buildAlbums();
    }

    // Ticker & glitch
    initializeTicker();
    initializeIdentityGlitch();

    console.log('🐈‍⬛ $LARRY website initialized successfully');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});

/* ----------------------------------------
   GLOBAL ERROR LOGGING
---------------------------------------- */
window.addEventListener('error', (e) => {
  console.error('Global error caught:', e.error || e.message || e);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  e.preventDefault();
});
