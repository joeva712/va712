document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Antigravity Grid Particles
  setupAntigravityParticles();

  // 2. Setup Clipboard Sharing & Action Button
  setupSharingAndActions();

  // 3. Setup Contact Card PNG Download
  setupCardDownload();

  // 4. Setup Security Restrictions (Disable right-click, devtools, image dragging)
  setupSecurityRestrictions();

  // 5. Setup Typewriter Quotes Animation
  setupTypewriterQuotes();
});

/**
 * Generates gravity-defying floating stardust particles matching the new theme
 */
function setupAntigravityParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container, true);
  }

  setInterval(() => {
    if (container.children.length < particleCount + 5) {
      createParticle(container, false);
    }
  }, 3000);
}

function createParticle(container, isInitial = false) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  const size = Math.random() * 40 + 8;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;

  const drift = (Math.random() * 60 - 30);
  particle.style.setProperty('--drift-x', `${drift}px`);

  const duration = Math.random() * 12 + 10;
  particle.style.animationDuration = `${duration}s`;

  // Gold or light grey particles fitting the new theme
  if (Math.random() > 0.6) {
    particle.style.background = 'radial-gradient(circle, rgba(243, 185, 23, 0.2) 0%, rgba(243, 185, 23, 0) 70%)';
  } else {
    particle.style.background = 'radial-gradient(circle, rgba(46, 46, 46, 0.05) 0%, rgba(46, 46, 46, 0) 70%)';
  }

  const delay = isInitial ? -(Math.random() * duration) : Math.random() * 3;
  particle.style.animationDelay = `${delay}s`;

  container.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, (duration + (isInitial ? 0 : delay)) * 1000);
}

/**
 * Share Link & Toast Alerts Setup
 */
function setupSharingAndActions() {
  const copyBtn = document.getElementById('btn-copy-link');
  const toast = document.getElementById('toast-popup');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      const siteUrl = window.location.href;
      
      navigator.clipboard.writeText(siteUrl).then(() => {
        toast.innerText = "Link copied to clipboard!";
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
}

/**
 * High-definition HTML2Canvas Export for Contact Card
 */
function setupCardDownload() {
  const downloadBtn = document.getElementById('download-btn');
  const contactCard = document.getElementById('contact-card');
  const popupOverlay = document.getElementById('card-popup-overlay');
  const popupClose = document.getElementById('card-popup-close');
  const popupImg = document.getElementById('card-popup-img');

  if (!downloadBtn || !contactCard) return;

  // Setup popup close handlers
  if (popupClose && popupOverlay) {
    popupClose.addEventListener('click', () => {
      popupOverlay.classList.remove('show');
    });
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.remove('show');
      }
    });
  }

  function showCardPopup() {
    if (!popupOverlay || !popupImg) return;

    // Use html2canvas to capture card with scale 3 for ultra-sharp prints
    html2canvas(contactCard, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.getElementById('contact-card');
        if (clonedCard) {
          clonedCard.style.transform = 'none';
          clonedCard.style.boxShadow = 'none';
        }
      }
    }).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png');
      popupImg.src = dataUrl;
      popupOverlay.classList.add('show');
      
      // Restore state
      downloadBtn.style.pointerEvents = 'auto';
      downloadBtn.style.opacity = '1';
    }).catch(error => {
      console.error('Error generating fallback contact card image:', error);
      downloadBtn.style.pointerEvents = 'auto';
      downloadBtn.style.opacity = '1';
    });
  }

  // Detect embedded or in-app browser where standard downloads fail
  function isInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (
      (ua.indexOf("FBAN") > -1) || 
      (ua.indexOf("FBAV") > -1) || 
      (ua.indexOf("Instagram") > -1) || 
      (ua.indexOf("Line/") > -1) || 
      (ua.indexOf("MicroMessenger") > -1) || 
      (ua.indexOf("WeChat") > -1) || 
      (ua.indexOf("Twitter") > -1) || 
      (ua.indexOf("Pinterest") > -1) || 
      (ua.indexOf("Snapchat") > -1) || 
      (ua.indexOf("LinkedInApp") > -1) ||
      (ua.indexOf("Telegram") > -1) ||
      (ua.indexOf("GSA") > -1) || // Google Search App
      // Android WebView
      (ua.indexOf("Version/") > -1 && ua.indexOf("Chrome/") > -1 && (ua.indexOf("wv") > -1 || ua.indexOf("Mobile Safari") > -1 && ua.indexOf("Browser") > -1)) ||
      // iOS WebView
      ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) && (ua.indexOf("Safari") === -1 && ua.indexOf("CriOS") === -1 && ua.indexOf("FxiOS") === -1))
    );
  }

  downloadBtn.addEventListener('click', () => {
    // Trigger loader state
    downloadBtn.style.pointerEvents = 'none';
    downloadBtn.style.opacity = '0.5';

    // If in-app browser, direct download will fail, show the popup modal instead
    if (isInAppBrowser()) {
      showCardPopup();
      return;
    }

    // Try standard download via html2canvas
    html2canvas(contactCard, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.getElementById('contact-card');
        if (clonedCard) {
          clonedCard.style.transform = 'none';
          clonedCard.style.boxShadow = 'none';
        }
      }
    }).then(canvas => {
      canvas.toBlob((blob) => {
        if (!blob) {
          showCardPopup();
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contact_card_joe_va.png';
        document.body.appendChild(a);
        
        try {
          a.click();
          // Restore state
          downloadBtn.style.pointerEvents = 'auto';
          downloadBtn.style.opacity = '1';
        } catch (clickError) {
          console.warn('Standard link click failed, falling back to popup:', clickError);
          showCardPopup();
        } finally {
          // Cleanup
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    }).catch(error => {
      console.error('Error generating contact card PNG, falling back to popup:', error);
      showCardPopup();
    });
  });
}

/**
 * Security: Disables right-click, devtools shortcuts, and image dragging
 */
function setupSecurityRestrictions() {
  // 1. Disable Right Click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, false);

  // 2. Disable DevTools and View Source Shortcuts
  document.addEventListener('keydown', (e) => {
    if (
      // F12
      e.key === 'F12' ||
      // Ctrl+Shift+I (Inspect)
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
      // Ctrl+Shift+J (Console)
      (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
      // Ctrl+Shift+C (Element selector)
      (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
      // Ctrl+U (View Source)
      (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
    ) {
      e.preventDefault();
      return false;
    }
  }, false);

  // 3. Disable Dragging of Images
  document.addEventListener('dragstart', (e) => {
    if (e.target.nodeName === 'IMG') {
      e.preventDefault();
    }
  }, false);
}

/**
 * Animated typewriter effect for quotes with monospace font
 */
function setupTypewriterQuotes() {
  const quoteEl = document.querySelector('.typewriter-quote');
  const authorEl = document.querySelector('.typewriter-author');
  const quoteContainer = document.querySelector('.bio-quote-container');
  
  if (!quoteEl || !quoteContainer) return;
  
  // Create hidden relative clone to hold the layout height and prevent shifting
  const cloneContainer = document.createElement('div');
  cloneContainer.style.visibility = 'hidden';
  cloneContainer.style.pointerEvents = 'none';
  cloneContainer.style.userSelect = 'none';
  
  const quoteClone = quoteEl.cloneNode(true);
  quoteClone.classList.remove('typewriter-quote');
  cloneContainer.appendChild(quoteClone);
  
  if (authorEl) {
    const authorClone = authorEl.cloneNode(true);
    authorClone.classList.remove('typewriter-author');
    cloneContainer.appendChild(authorClone);
  }
  
  // Create active absolute container for the animating typewriter elements
  const activeContainer = document.createElement('div');
  activeContainer.style.position = 'absolute';
  activeContainer.style.top = '0';
  activeContainer.style.left = '0';
  activeContainer.style.width = '100%';
  
  // Re-structure the container
  quoteContainer.innerHTML = '';
  quoteContainer.style.position = 'relative';
  quoteContainer.appendChild(cloneContainer);
  quoteContainer.appendChild(activeContainer);
  
  activeContainer.appendChild(quoteEl);
  if (authorEl) activeContainer.appendChild(authorEl);
  
  const quoteText = quoteEl.getAttribute('data-quote') || quoteEl.innerText;
  quoteEl.setAttribute('data-quote', quoteText);
  quoteEl.innerHTML = '';
  
  // Create spans for main quote
  const quoteTextSpan = document.createElement('span');
  const quoteCursorSpan = document.createElement('span');
  quoteCursorSpan.className = 'typewriter-cursor';
  quoteCursorSpan.innerText = '|';
  quoteEl.appendChild(quoteTextSpan);
  quoteEl.appendChild(quoteCursorSpan);
  
  let authorText = '';
  let authorTextSpan = null;
  let authorCursorSpan = null;
  
  if (authorEl) {
    authorText = authorEl.getAttribute('data-quote') || authorEl.innerText;
    authorEl.setAttribute('data-quote', authorText);
    authorEl.innerHTML = '';
    
    authorTextSpan = document.createElement('span');
    authorCursorSpan = document.createElement('span');
    authorCursorSpan.className = 'typewriter-cursor';
    authorCursorSpan.innerText = '|';
    authorCursorSpan.style.display = 'none'; // hidden initially
    
    authorEl.appendChild(authorTextSpan);
    authorEl.appendChild(authorCursorSpan);
  }
  
  let quoteIndex = 0;
  let authorIndex = 0;
  
  // A bit faster typing speed: ~80-140ms per key
  const typingSpeed = () => Math.random() * 60 + 80;
  
  function typeQuote() {
    quoteCursorSpan.style.display = 'inline-block';
    if (authorCursorSpan) authorCursorSpan.style.display = 'none';
    
    if (quoteIndex < quoteText.length) {
      quoteTextSpan.innerText = quoteText.slice(0, quoteIndex + 1);
      quoteIndex++;
      
      // Pause for 2 seconds at the word "honest."
      const currentTyped = quoteText.slice(0, quoteIndex);
      if (currentTyped.endsWith("honest.")) {
        setTimeout(typeQuote, 2000);
      } else {
        setTimeout(typeQuote, typingSpeed());
      }
    } else {
      // Done typing quote. Wait 2 seconds before starting the author animation
      setTimeout(() => {
        quoteCursorSpan.style.display = 'none';
        if (authorEl) {
          authorIndex = 0;
          authorTextSpan.innerText = '';
          authorCursorSpan.style.display = 'inline-block';
          typeAuthor();
        } else {
          restartAll();
        }
      }, 2000);
    }
  }
  
  function typeAuthor() {
    if (authorIndex < authorText.length) {
      authorTextSpan.innerText = authorText.slice(0, authorIndex + 1);
      authorIndex++;
      setTimeout(typeAuthor, typingSpeed());
    } else {
      // Done typing author. Wait 8 seconds, then restart both.
      setTimeout(restartAll, 8000);
    }
  }
  
  function restartAll() {
    quoteIndex = 0;
    quoteTextSpan.innerText = '';
    if (authorTextSpan) {
      authorIndex = 0;
      authorTextSpan.innerText = '';
      authorCursorSpan.style.display = 'none';
    }
    typeQuote();
  }
  
  // Start sequence
  typeQuote();
}
