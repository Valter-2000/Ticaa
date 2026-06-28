const playMusicBtn = document.getElementById("playMusicBtn1");
const bgMusic = document.getElementById("bgMusic");
const musicProgressFill = document.getElementById("musicProgressFill");

let isPlaying = false;

playMusicBtn.addEventListener("click", async () => {
  try {
    if (!isPlaying) {
      await bgMusic.play();
      playMusicBtn.textContent = "Паузирај песму";
      isPlaying = true;
    } else {
      bgMusic.pause();
      playMusicBtn.textContent = "Пусти нашу песму";
      isPlaying = false;
    }
  } catch (error) {
    console.error("Грешка:", error);
  }
});

bgMusic.addEventListener("timeupdate", () => {
  if (bgMusic.duration) {
    const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
    musicProgressFill.style.width = `${progress}%`;
  }
});

bgMusic.addEventListener("ended", () => {
  isPlaying = false;
  playMusicBtn.textContent = "Пусти нашу песму";
  musicProgressFill.style.width = "0%";
});

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModalBtn = document.getElementById("closeModalBtn");
const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    modalImage.alt = img.alt;
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

const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalVideoSource = document.getElementById("modalVideoSource");
const closeVideoModalBtn = document.getElementById("closeVideoModalBtn");
const galleryVideos = document.querySelectorAll(".gallery .gallery-video");

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

const playMusicBtn2 = document.getElementById("playMusicBtn2");
const bgMusic2 = document.getElementById("bgMusic2");
const musicProgressFill2 = document.getElementById("musicProgressFill2");

let isPlaying2 = false;

playMusicBtn2.addEventListener("click", async () => {
  try {
    if (!isPlaying2) {
      bgMusic.pause();
      isPlaying = false;
      playMusicBtn.textContent = "Пусти нашу песму";

      await bgMusic2.play();
      playMusicBtn2.textContent = "Паузирај другу песму";
      isPlaying2 = true;
    } else {
      bgMusic2.pause();
      playMusicBtn2.textContent = "Пусти другу песму";
      isPlaying2 = false;
    }
  } catch (error) {
    console.error("Грешка:", error);
  }
});

bgMusic2.addEventListener("timeupdate", () => {
  if (bgMusic2.duration) {
    const progress = (bgMusic2.currentTime / bgMusic2.duration) * 100;
    musicProgressFill2.style.width = `${progress}%`;
  }
});

bgMusic2.addEventListener("ended", () => {
  isPlaying2 = false;
  playMusicBtn2.textContent = "Пусти другу песму";
  musicProgressFill2.style.width = "0%";
});

bgMusic2.pause();
isPlaying2 = false;
playMusicBtn2.textContent = "Пусти другу песму";
musicProgressFill2.style.width = "0%";

const musicProgressBar1 = document.getElementById("musicProgressBar");
const musicProgressBar2 = document.getElementById("musicProgressBar2");

musicProgressBar1.addEventListener("click", (e) => {
  if (!bgMusic.duration) return;

  const rect = musicProgressBar1.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;

  bgMusic.currentTime = percentage * bgMusic.duration;
});

musicProgressBar2.addEventListener("click", (e) => {
  if (!bgMusic2.duration) return;

  const rect = musicProgressBar2.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;

  bgMusic2.currentTime = percentage * bgMusic2.duration;
});




const memorySliderImage = document.getElementById("memorySliderImage");
const prevSliderBtn = document.querySelector(".single-slider .prev");
const nextSliderBtn = document.querySelector(".single-slider .next");

const memorySliderImages = [
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.45.38.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.45.55.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.46.14.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.46.32.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.46.49.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.47.10.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.47.57.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.48.26.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.49.16.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.52.09.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.52.56.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.53.42.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.58.35.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 16.59.33.png",
  "./assets/screenshots/Bildschirmfoto 2026-06-28 um 17.01.14.png",
  "./assets/screenshots/PHOTO-2026-03-03-12-25-42.jpg",
  "./assets/screenshots/PHOTO-2026-03-12-22-03-18 2.jpg",
  "./assets/screenshots/PHOTO-2026-03-16-17-33-20.jpg",
  "./assets/screenshots/PHOTO-2026-05-06-22-22-38.jpg",
  "./assets/screenshots/PHOTO-2026-05-08-16-28-49.jpg",
  "./assets/screenshots/zivot.png",
];

let currentMemorySlide = 0;

function showMemorySlide(index) {
  memorySliderImage.src = memorySliderImages[index];
}

nextSliderBtn.addEventListener("click", () => {
  currentMemorySlide = (currentMemorySlide + 1) % memorySliderImages.length;
  showMemorySlide(currentMemorySlide);
});

prevSliderBtn.addEventListener("click", () => {
  currentMemorySlide =
    (currentMemorySlide - 1 + memorySliderImages.length) % memorySliderImages.length;
  showMemorySlide(currentMemorySlide);
});