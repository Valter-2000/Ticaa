document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;


  const giftCards = document.querySelectorAll(".gift-card");


  const passwordOverlay = document.getElementById("passwordOverlay");
  const passwordModal = document.getElementById("passwordModal");
  const passwordForm = document.getElementById("passwordForm");
  const passwordInput = document.getElementById("passwordInput");
  const passwordError = document.getElementById("passwordError");

  const introGate = document.getElementById("introGate");
  const introGateLine = document.getElementById("introGateLine");
  const introGateBtn = document.getElementById("introGateBtn");

  const playMusicBtn1 = document.getElementById("playMusicBtn1");
  const bgMusic = document.getElementById("bgMusic");
  const musicProgressBar1 = document.getElementById("musicProgressBar");
  const musicProgressFill1 = document.getElementById("musicProgressFill");

  const playMusicBtn2 = document.getElementById("playMusicBtn2");
  const bgMusic2 = document.getElementById("bgMusic2");
  const musicProgressBar2 = document.getElementById("musicProgressBar2");
  const musicProgressFill2 = document.getElementById("musicProgressFill2");

  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const galleryImages = document.querySelectorAll(".gallery img");

  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalVideoSource = document.getElementById("modalVideoSource");
  const closeVideoModalBtn = document.getElementById("closeVideoModalBtn");
  const galleryVideos = document.querySelectorAll(".gallery .gallery-video");

  const memorySliderImage = document.getElementById("memorySliderImage");
  const prevSliderBtn = document.querySelector(".single-slider .prev");
  const nextSliderBtn = document.querySelector(".single-slider .next");

  const openLetterBtn = document.getElementById("openLetterBtn");
  const letterModal = document.getElementById("letterModal");
  const closeLetterBtn = document.getElementById("closeLetterBtn");
  const letterModalContent = document.querySelector(".letter-modal-content");

  const chatCards = Array.from(document.querySelectorAll(".chat-stack-stage .chat-card"));
  const chatPrevBtn = document.getElementById("chatPrevBtn");
  const chatNextBtn = document.getElementById("chatNextBtn");
  const chatStackStage = document.getElementById("chatStackStage");

  if (giftCards.length) {
    giftCards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.toggle("is-open");
      });
    });
  }

  const validPasswords = ["Marlena", "Марлена"];
  const sessionKey = "siteUnlocked";
  const introMessage = "Pre nego što zatvoriš ovu stranicu... daj mi 2 minuta.";

  const memorySliderImages = [
    "./assets/photos/IMG_8082.JPG",
    "./assets/photos/IMG_8083.JPG",
    "./assets/photos/IMG_8084.JPG",
    "./assets/photos/IMG_8085.JPG",
    "./assets/photos/IMG_8086.JPG"
  ];

  let currentMemorySlide = 0;
  let chatIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function pauseOtherAudio(currentAudio) {
    [bgMusic, bgMusic2].forEach((audio) => {
      if (audio && audio !== currentAudio) {
        audio.pause();
      }
    });

    if (playMusicBtn1 && bgMusic !== currentAudio) {
      playMusicBtn1.textContent = "Пусти нашу песму";
    }

    if (playMusicBtn2 && bgMusic2 !== currentAudio) {
      playMusicBtn2.textContent = "Пусти другу песму";
    }
  }

  async function toggleAudio(audio, button, playLabel) {
    if (!audio || !button) return;

    try {
      if (audio.paused) {
        pauseOtherAudio(audio);
        await audio.play();
        button.textContent = "Паузирај песму";
      } else {
        audio.pause();
        button.textContent = playLabel;
      }
    } catch (error) {
      console.error("Greška pri puštanju zvuka:", error);
    }
  }

  function bindProgress(audio, bar, fill, button, playLabel) {
    if (!audio || !bar || !fill) return;

    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      const progress = (audio.currentTime / audio.duration) * 100;
      fill.style.width = `${progress}%`;
    });

    audio.addEventListener("ended", () => {
      fill.style.width = "0%";
      if (button) button.textContent = playLabel;
    });

    bar.addEventListener("click", (e) => {
      if (!audio.duration) return;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      audio.currentTime = percentage * audio.duration;
    });
  }

  function showMemorySlide(index) {
    if (!memorySliderImage || !memorySliderImages.length) return;
    memorySliderImage.src = memorySliderImages[index];
  }

  function renderChatStack() {
    if (!chatCards.length) return;

    chatCards.forEach((card, i) => {
      card.classList.remove("is-active", "is-next", "is-back", "is-hidden");

      const offset = (i - chatIndex + chatCards.length) % chatCards.length;

      if (offset === 0) {
        card.classList.add("is-active");
      } else if (offset === 1) {
        card.classList.add("is-next");
      } else if (offset === 2) {
        card.classList.add("is-back");
      } else {
        card.classList.add("is-hidden");
      }
    });
  }

  function nextChat() {
    if (!chatCards.length) return;
    chatIndex = (chatIndex + 1) % chatCards.length;
    renderChatStack();
  }

  function prevChat() {
    if (!chatCards.length) return;
    chatIndex = (chatIndex - 1 + chatCards.length) % chatCards.length;
    renderChatStack();
  }

  function typeIntroText(text, element, speed = 55, callback) {
    if (!element) return;
    let i = 0;
    element.textContent = "";
    element.classList.add("typing");

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.remove("typing");
        if (callback) callback();
      }
    }

    type();
  }

  function showIntroGate() {
    if (!introGate || !introGateLine || !introGateBtn) {
      body.classList.remove("locked");
      return;
    }

    introGate.classList.add("show");
    introGateLine.textContent = "";
    introGateBtn.classList.remove("show");
    body.classList.add("locked");

    typeIntroText(introMessage, introGateLine, 55, () => {
      setTimeout(() => {
        introGateBtn.classList.add("show");
      }, 500);
    });
  }

  function unlockSite() {
    if (passwordOverlay) {
      passwordOverlay.style.display = "none";
    }
    sessionStorage.setItem(sessionKey, "true");
    showIntroGate();
  }

  function showPasswordGate() {
    if (!passwordOverlay) return;
    passwordOverlay.style.display = "flex";
    body.classList.add("locked");

    if (passwordInput) {
      setTimeout(() => {
        passwordInput.focus();
      }, 50);
    }
  }

  function triggerShake() {
    if (!passwordModal) return;
    passwordModal.classList.remove("shake");
    void passwordModal.offsetWidth;
    passwordModal.classList.add("shake");
  }

  if (sessionStorage.getItem(sessionKey) === "true") {
    if (passwordOverlay) passwordOverlay.style.display = "none";
    if (introGate) {
      introGate.classList.remove("show");
    }
    body.classList.remove("locked");
  } else {
    showPasswordGate();
  }

  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const enteredPassword = passwordInput ? passwordInput.value.trim() : "";

      if (validPasswords.includes(enteredPassword)) {
        trackEvent('password_correct', {
          event_category: 'engagement',
          event_label: 'site_unlocked'
        });
        unlockSite();
      } else {
        if (passwordError) passwordError.classList.add("show");
        if (passwordInput) passwordInput.value = "";
        triggerShake();
        if (passwordInput) passwordInput.focus();
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      if (passwordError) passwordError.classList.remove("show");
    });
  }

  if (introGateBtn && introGate) {
    introGateBtn.addEventListener("click", () => {
      introGate.classList.remove("show");
      body.classList.remove("locked");
    });
  }

  if (playMusicBtn1 && bgMusic) {
    playMusicBtn1.addEventListener("click", () => {
      toggleAudio(bgMusic, playMusicBtn1, "Пусти нашу песму");
    });
  }

  if (playMusicBtn2 && bgMusic2) {
    playMusicBtn2.addEventListener("click", () => {
      toggleAudio(bgMusic2, playMusicBtn2, "Пусти другу песму");
    });
  }

  bindProgress(bgMusic, musicProgressBar1, musicProgressFill1, playMusicBtn1, "Пусти нашу песму");
  bindProgress(bgMusic2, musicProgressBar2, musicProgressFill2, playMusicBtn2, "Пусти другу песму");

  if (bgMusic2) {
    bgMusic2.pause();
    bgMusic2.currentTime = 0;
  }

  if (musicProgressFill2) {
    musicProgressFill2.style.width = "0%";
  }

  if (playMusicBtn2) {
    playMusicBtn2.textContent = "Пусти другу песму";
  }

  if (imageModal && modalImage && closeModalBtn && galleryImages.length) {
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        modalImage.src = img.src;
        modalImage.alt = img.alt || "Увећана фотографија";
        imageModal.showModal();
      });
    });

    closeModalBtn.addEventListener("click", () => {
      imageModal.close();
    });

    imageModal.addEventListener("click", (e) => {
      if (e.target === imageModal) {
        imageModal.close();
      }
    });
  }

  if (videoModal && modalVideo && modalVideoSource && closeVideoModalBtn && galleryVideos.length) {
    galleryVideos.forEach((video) => {
      video.addEventListener("click", (e) => {
        e.preventDefault();

        const source = video.querySelector("source");
        if (!source) return;

        modalVideo.pause();
        modalVideoSource.src = source.src;
        modalVideo.load();
        videoModal.showModal();
      });
    });

    closeVideoModalBtn.addEventListener("click", () => {
      modalVideo.pause();
      modalVideo.currentTime = 0;
      videoModal.close();
    });

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        videoModal.close();
      }
    });

    videoModal.addEventListener("close", () => {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    });
  }

  if (memorySliderImage && memorySliderImages.length) {
    showMemorySlide(currentMemorySlide);
  }

  if (nextSliderBtn) {
    nextSliderBtn.addEventListener("click", () => {
      currentMemorySlide = (currentMemorySlide + 1) % memorySliderImages.length;
      showMemorySlide(currentMemorySlide);
    });
  }

  if (prevSliderBtn) {
    prevSliderBtn.addEventListener("click", () => {
      currentMemorySlide = (currentMemorySlide - 1 + memorySliderImages.length) % memorySliderImages.length;
      showMemorySlide(currentMemorySlide);
    });
  }

  if (openLetterBtn && letterModal && closeLetterBtn) {
    openLetterBtn.addEventListener("click", () => {
      letterModal.showModal();
    });

    closeLetterBtn.addEventListener("click", () => {
      letterModal.close();
    });

    letterModal.addEventListener("click", (e) => {
      if (letterModalContent) {
        if (!letterModalContent.contains(e.target)) {
          letterModal.close();
        }
      } else if (e.target === letterModal) {
        letterModal.close();
      }
    });
  }

  if (chatCards.length) {
    renderChatStack();

    if (chatNextBtn) {
      chatNextBtn.addEventListener("click", nextChat);
    }

    if (chatPrevBtn) {
      chatPrevBtn.addEventListener("click", prevChat);
    }

    if (chatStackStage) {
      chatStackStage.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].clientX;
        },
        { passive: true }
      );

      chatStackStage.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].clientX;
          const deltaX = touchStartX - touchEndX;

          if (deltaX > 50) nextChat();
          if (deltaX < -50) prevChat();
        },
        { passive: true }
      );
    }
  }
});






const startDate = new Date("2026-03-06T21:30:00");

function pad(value, size = 2) {
  return String(value).padStart(size, "0");
}

function updateLoveCounter() {
  const now = new Date();
  const diff = now - startDate;

  if (diff < 0) return;

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = pad(days, 3);
  if (hoursEl) hoursEl.textContent = pad(hours);
  if (minutesEl) minutesEl.textContent = pad(minutes);
  if (secondsEl) secondsEl.textContent = pad(seconds);
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);


function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const passwordForm = document.getElementById('passwordForm');
  const passwordInput = document.getElementById('passwordInput');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const playMusicBtn1 = document.getElementById('playMusicBtn1');
  const playMusicBtn2 = document.getElementById('playMusicBtn2');
  const whatsappBtn = document.querySelector('.whatsapp-fab');

  if (passwordForm) {
    passwordForm.addEventListener('submit', () => {
      trackEvent('password_submitted', {
        event_category: 'engagement',
        event_label: 'password_overlay',
        password_length: passwordInput ? passwordInput.value.length : 0
      });
    });
  }

  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', () => {
      trackEvent('letter_opened', {
        event_category: 'engagement',
        event_label: 'love_letter'
      });
    });
  }

  if (playMusicBtn1) {
    playMusicBtn1.addEventListener('click', () => {
      trackEvent('music_started', {
        event_category: 'media',
        event_label: 'song_1'
      });
    });
  }

  if (playMusicBtn2) {
    playMusicBtn2.addEventListener('click', () => {
      trackEvent('music_started', {
        event_category: 'media',
        event_label: 'song_2'
      });
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      trackEvent('whatsapp_clicked', {
        event_category: 'contact',
        event_label: 'footer_whatsapp'
      });
    });
  }
});


