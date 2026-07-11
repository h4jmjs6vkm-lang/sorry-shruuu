(function() {
  // ----- DOM refs -----
  const introScreen = document.getElementById('intro');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const letterScreen = document.getElementById('letterScreen');
  const finalScreen = document.getElementById('finalScreen');

  const continueIntroBtn = document.getElementById('continueIntro');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');
  const letterTextEl = document.getElementById('letterText');
  const typingCursor = document.getElementById('typingCursor');
  const continueLetterBtn = document.getElementById('continueLetter');
  const heartContainer = document.getElementById('heartContainer');

  // ----- switch screen helper -----
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
  }

  // ----- intro -> envelope -----
  continueIntroBtn.addEventListener('click', function() {
    showScreen('envelopeScreen');
    // reset envelope state (closed)
    envelope.classList.remove('open');
    envelopeHint.textContent = 'Tap the envelope to open your letter';
    // hide possible letter screen elements
    continueLetterBtn.style.display = 'none';
    letterTextEl.textContent = '';
  });

  // ----- envelope logic -----
  let envelopeOpened = false;

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    envelope.classList.add('open');
    envelopeHint.textContent = '✨ You opened it ✨';

    // after animation, go to letter screen
    setTimeout(() => {
      showScreen('letterScreen');
      // start typing letter
      startTyping();
      // reset envelope state for next time
      envelopeOpened = false;
      envelope.classList.remove('open');
    }, 850); // matches flap transition
  }

  envelopeWrapper.addEventListener('click', function(e) {
    if (!envelopeOpened) {
      openEnvelope();
    }
  });

  // ----- typing animation (IMPROVED APOLOGY LETTER) -----
  const fullLetter = `I've been sitting with my thoughts for days now, \nand I realized something important... \n\nI was wrong. \nAnd I'm not just saying that — I truly mean it. \n\nThe way I acted, the things I said... \nnone of it was fair to you. \nYou didn't deserve any of that. \n\nYou deserve someone who listens. \nSomeone who chooses you even when it's hard. \nAnd I want to be that person. \n\nI'm so sorry, Shruti. \nFor everything. \n\nI hope you can give me one more chance \nto show you the love you've always deserved. \n\nWith all my heart, \nYours, always. 🌸`;

  let typingInterval = null;
  let currentIndex = 0;

  function startTyping() {
    // clear any previous
    if (typingInterval) clearInterval(typingInterval);
    currentIndex = 0;
    letterTextEl.textContent = '';
    continueLetterBtn.style.display = 'none';
    typingCursor.style.display = 'inline-block';

    typingInterval = setInterval(() => {
      if (currentIndex < fullLetter.length) {
        letterTextEl.textContent += fullLetter.charAt(currentIndex);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        typingInterval = null;
        typingCursor.style.display = 'none';
        continueLetterBtn.style.display = 'inline-block';
      }
    }, 32); // slightly faster for better flow
  }

  // ----- letter -> final -----
  continueLetterBtn.addEventListener('click', function() {
    showScreen('finalScreen');
    generateHearts();
  });

  // ----- floating hearts (final) -----
  function generateHearts() {
    heartContainer.innerHTML = '';
    const emojis = ['❤️', '✨', '🌸', '💖', '🌺', '💕', '✨', '❤️‍🔥', '🌹', '💗'];
    for (let i = 0; i < 25; i++) {
      const span = document.createElement('span');
      span.className = 'heart-particle';
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.left = Math.random() * 90 + '%';
      span.style.top = Math.random() * 80 + 10 + '%';
      span.style.animationDelay = (Math.random() * 8) + 's';
      span.style.animationDuration = (7 + Math.random() * 7) + 's';
      span.style.fontSize = (1.2 + Math.random() * 2.0) + 'rem';
      heartContainer.appendChild(span);
    }
  }

  // ----- ensure intro active at start -----
  showScreen('intro');
})();