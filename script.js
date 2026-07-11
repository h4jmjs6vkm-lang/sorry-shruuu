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
    envelope.classList.remove('open');
    envelopeHint.textContent = 'Tap the envelope to open your letter';
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

    setTimeout(() => {
      showScreen('letterScreen');
      startTyping();
      envelopeOpened = false;
      envelope.classList.remove('open');
    }, 850);
  }

  envelopeWrapper.addEventListener('click', function(e) {
    if (!envelopeOpened) {
      openEnvelope();
    }
  });

  // ----- typing animation (REAL APOLOGY - Simple & Honest) -----
  const fullLetter = `Hey Shruti,

I'm sorry.

I know I hurt you and I feel terrible about it. I wasn't thinking and I said things I didn't mean.

You mean a lot to me and I hate that I made you feel bad. You don't deserve that.

I'm not going to make excuses. I was wrong and I should've handled things better.

Please forgive me.

I promise I'll never do something like this again.

';

  let typingInterval = null;
  let currentIndex = 0;

  function startTyping() {
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
    }, 35);
  }

  // ----- letter -> final -----
  continueLetterBtn.addEventListener('click', function() {
    showScreen('finalScreen');
    generateHearts();
  });

  // ----- floating hearts (final) -----
  function generateHearts() {
    heartContainer.innerHTML = '';
    const emojis = ['❤️', '✨', '🌸', '💖', '💕', '❤️‍🔥', '🌹', '💗'];
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

  showScreen('intro');
})();