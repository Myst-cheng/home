function randNumber(min, max) {
  min = Math.ceil(min); // 向上取整
  max = Math.floor(max); // 向下取整
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function step() {
  const stickySection = document.querySelector(".steps-step");
  const stickyHeight = window.innerHeight * 7;
  const cards = document.querySelectorAll(".card-step");
  const countContainer = document.querySelector(".count-container-step");
  const totalCards = cards.length;
  const arcAngle = Math.PI * 0.4;
  const startAngle = Math.PI / 2 - arcAngle / 2;
  function getRadius() {
    return window.innerWidth < 900
      ? window.innerWidth * 7.5
      : window.innerWidth * 2.5;
  }

  function positionCards(progress = 0) {
    const radius = getRadius();
    const totalTravel = 1 + totalCards / 7.5;
    const adjustedProgress = (progress * totalTravel - 1) * 0.75;

    cards.forEach((card, i) => {
      const normalizedProgress = (totalCards - 1 - i) / totalCards;
      const cardProgress = normalizedProgress + adjustedProgress;
      const angle = startAngle + arcAngle * cardProgress;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

      gsap.set(card, {
        x: x,
        y: -y + radius,
        rotation: -rotation,
        transformOrigin: "center center",
      });
    });
  }

  positionCards(0);

  let currentCardIndex = 0;

  const options = {
    root: null,
    rootMargin: "0% 0%",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entities) => {
    entities.forEach((entity) => {
      if (entity.isIntersecting) {
        let cardIndex = Array.from(cards).indexOf(entity.target);
        currentCardIndex = cardIndex;
        const targetY = 150 - currentCardIndex * 150;

        console.log(targetY);

        gsap.to(countContainer, {
          y: targetY,
          duration: 0.3,
          ease: "power1.out",
          overwrite: true,
        });
      }
    });
  }, options);

  cards.forEach((card) => {
    observer.observe(card);
  });

  window.addEventListener("resize", () => positionCards(0));

  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: `+=${stickyHeight}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      positionCards(self.progress);
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const heroImgContainer = document.querySelector(".hero-img-container");
  const heroImgLogo = document.querySelector(".hero-img-logo");
  const heroImgCopy = document.querySelector(".hero-img-copy");
  const fadeOverlay = document.querySelector(".fade-overlay");
  const svgOverlay = document.querySelector(".overlay");
  //   const overlayCopy = document.querySelector("h1");

  const initalOverlayScale = 350;
  const logoContainer = document.querySelector(".logo-container");
  const logoMask = document.getElementById("logoMask");

  const data =
    "M30.696 51H17.8533L21.8213 0.994667H41.832L45.5867 17.7627L47.2933 26.2533L48.9147 17.8053L52.2427 0.994667H70.0773L73.7467 51H60.4773L58.3013 21.6027L57.7893 10.7653L51.2613 46.008H40.1253L32.2747 10.7653L32.0187 21.6027L30.696 51ZM86.657 51V35.384L72.4917 0.994667H88.6623L93.057 13.88L96.001 24.4187L98.433 13.88L101.761 0.994667H114.476L101.974 35.128V51H86.657ZM129.999 51.896C127.809 51.896 125.761 51.6969 123.855 51.2987C121.978 50.9289 120.399 50.4311 119.119 49.8053C117.839 49.1796 116.787 48.5822 115.962 48.0133C115.166 47.4444 114.497 46.8756 113.957 46.3067L115.023 35.9387C116.19 37.5031 117.754 38.8684 119.717 40.0347C121.679 41.1724 123.798 41.7413 126.074 41.7413C128.35 41.7413 129.985 41.4996 130.981 41.016C132.005 40.5324 132.517 39.6507 132.517 38.3707C132.517 37.0053 131.934 35.8391 130.767 34.872C129.63 33.9049 127.653 32.7387 124.837 31.3733C123.813 30.8613 122.945 30.4062 122.234 30.008C121.523 29.5813 120.57 28.8987 119.375 27.96C118.209 26.9929 117.256 25.9973 116.517 24.9733C115.777 23.9209 115.123 22.584 114.554 20.9627C113.985 19.3129 113.701 17.5493 113.701 15.672C113.701 5.51734 119.432 0.440002 130.895 0.440002C132.716 0.440002 134.422 0.639113 136.015 1.03733C137.637 1.40711 138.902 1.81955 139.813 2.27467C140.723 2.72978 141.548 3.27022 142.287 3.896C143.055 4.49333 143.539 4.92 143.738 5.176C143.937 5.40356 144.079 5.58845 144.165 5.73067L142.031 13.9653C140.922 12.6569 139.528 11.6898 137.85 11.064C136.2 10.4098 134.622 10.0827 133.114 10.0827C129.473 10.0827 127.653 11.2204 127.653 13.496C127.653 14.0933 127.766 14.6338 127.994 15.1173C128.222 15.6009 128.591 16.0418 129.103 16.44C129.615 16.8382 130.085 17.1796 130.511 17.464C130.966 17.7484 131.578 18.104 132.346 18.5307C133.142 18.9289 133.74 19.256 134.138 19.512C138.291 21.2756 141.334 23.3662 143.269 25.784C145.231 28.2018 146.213 31.1458 146.213 34.616C146.213 40.248 144.819 44.5431 142.031 47.5013C139.272 50.4311 135.262 51.896 129.999 51.896ZM158.67 51V12.3013H148.686V0.994667H183.075V12.3013H173.091V51H158.67ZM33.182 107.459L32.798 107.928C32.5136 108.212 32.03 108.582 31.3473 109.037C30.6931 109.464 29.8967 109.905 28.958 110.36C28.0478 110.787 26.8247 111.142 25.2887 111.427C23.7527 111.74 22.1029 111.896 20.3393 111.896C16.6131 111.896 13.4273 111.284 10.782 110.061C8.13667 108.81 6.06022 107.004 4.55267 104.643C3.07356 102.253 2.00689 99.5653 1.35267 96.5787C0.698444 93.5636 0.371333 90.0791 0.371333 86.1253C0.371333 81.9156 0.698444 78.2889 1.35267 75.2453C2.00689 72.1733 3.08778 69.4853 4.59533 67.1813C6.13133 64.8489 8.23622 63.0996 10.91 61.9333C13.5838 60.7671 16.8407 60.184 20.6807 60.184C22.4442 60.184 24.094 60.3404 25.63 60.6533C27.1944 60.9662 28.4176 61.3218 29.2993 61.72C30.2096 62.1182 31.0202 62.5733 31.7313 63.0853C32.4709 63.5973 32.926 63.9529 33.0967 64.152C33.2958 64.3511 33.438 64.5076 33.5233 64.6213L32.8833 74.4347H26.398L24.1793 69.3573C23.6673 69.2151 23.2407 69.144 22.8993 69.144C20.9936 69.144 19.5287 69.5849 18.5047 70.4667C17.4807 71.32 16.6984 73.0124 16.158 75.544C15.6176 78.0471 15.3473 81.6596 15.3473 86.3813C15.3473 89.1973 15.518 91.6578 15.8593 93.7627C16.2291 95.8676 16.67 97.4889 17.182 98.6267C17.694 99.736 18.3056 100.632 19.0167 101.315C19.7278 101.997 20.3678 102.438 20.9367 102.637C21.5056 102.808 22.1171 102.893 22.7713 102.893C24.222 102.893 25.7438 102.723 27.3367 102.381C28.9296 102.012 30.238 101.457 31.262 100.717L33.182 107.459ZM51.1063 111H36.9837V60.9947H51.1063V80.792H62.0717V60.9947H76.1943V111H62.0717V90.6053H51.1063V111ZM112.109 111H81.8587V60.9947H111.469L110.616 71.064L95.9813 70.6373V80.28H107.501V90.264L95.9813 89.4107V100.76L112.109 100.333V111ZM129.552 111H115.984V65.0053L113.893 60.9947H129.594L137.445 77.208L144.954 93.3787L142.864 74.392V60.9947H156.474V111H143.461L133.306 91.2453L127.034 78.872L129.552 95.256V111ZM192.698 106.477C189.085 110.09 184.79 111.896 179.812 111.896C176.285 111.896 173.227 111.284 170.639 110.061C168.079 108.838 166.045 107.075 164.538 104.771C163.03 102.467 161.921 99.8356 161.21 96.8773C160.527 93.9191 160.186 90.5484 160.186 86.7653C160.186 83.9493 160.328 81.4178 160.612 79.1707C160.925 76.9236 161.423 74.776 162.106 72.728C162.788 70.68 163.727 68.9164 164.922 67.4373C166.116 65.9298 167.581 64.6213 169.316 63.512C171.051 62.4027 173.156 61.5778 175.631 61.0373C178.106 60.4684 180.922 60.184 184.079 60.184C185.501 60.184 186.852 60.2693 188.132 60.44C189.441 60.6107 190.55 60.824 191.46 61.08C192.371 61.3076 193.224 61.6062 194.02 61.976C194.845 62.3173 195.485 62.6302 195.94 62.9147C196.424 63.1707 196.865 63.4551 197.263 63.768C197.661 64.0809 197.903 64.2942 197.988 64.408C198.102 64.5218 198.187 64.6071 198.244 64.664L197.604 74.4773H189.839L187.407 68.8027C186.781 68.4613 185.771 68.2907 184.378 68.2907C183.24 68.2907 182.301 68.3902 181.562 68.5893C180.822 68.7884 180.083 69.2151 179.343 69.8693C178.632 70.4951 178.063 71.4196 177.636 72.6427C177.238 73.8373 176.911 75.4729 176.655 77.5493C176.399 79.5973 176.271 82.1004 176.271 85.0587C176.271 91.2311 176.598 95.8107 177.252 98.7973C177.935 101.784 179.286 103.277 181.306 103.277C182.301 103.277 183.14 103.192 183.823 103.021C184.506 102.822 185.146 102.481 185.743 101.997C186.34 101.485 186.781 100.746 187.066 99.7787C187.35 98.7831 187.492 97.5173 187.492 95.9813V91.6293L181.86 90.3493V81.6453H200.847L200.804 111H193.21L192.698 106.477Z";
  logoMask.setAttribute("d", data);

  const logoDimensions = logoContainer.getBoundingClientRect();
  const logoBoundingBox = logoMask.getBBox();

  const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
  const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;

  const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

  const logoHorizontalPosition =
    logoDimensions.left +
    (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
    logoBoundingBox.x * logoScaleFactor;

  const logoVerticalPostion =
    logoDimensions.top +
    (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
    logoBoundingBox.y * logoScaleFactor;

  console.log(logoScaleFactor);

  logoMask.setAttribute(
    "transform",
    `translate(${logoHorizontalPosition}, ${logoVerticalPostion}) scale(${logoScaleFactor})`
  );
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `${window.innerHeight * 5}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const scrollProgess = self.progress;
      const fadeOpacity = 1 - scrollProgess * (1 / 0.15);

      if (scrollProgess <= 0.15) {
        gsap.set([heroImgLogo, heroImgCopy], {
          opacity: fadeOpacity,
        });
      } else {
        gsap.set([heroImgLogo, heroImgCopy], {
          opacity: 0,
        });
      }

      if (scrollProgess <= 0.85) {
        const normalizedProgress = scrollProgess * (1 / 0.85);
        const heroImgContainerScale = 1.5 - 0.5 * normalizedProgress;
        const overlayScale =
          initalOverlayScale *
          Math.pow(1 / initalOverlayScale, normalizedProgress);

        let fadeOverlayOpacity = 0;

        gsap.set(heroImgContainer, {
          scale: heroImgContainerScale,
        });

        gsap.set(svgOverlay, {
          scale: overlayScale,
        });

        if (scrollProgess >= 0.25) {
          fadeOverlayOpacity = Math.min(1, (scrollProgess - 0.25) * (1 / 0.4));
        }

        gsap.set(fadeOverlay, {
          opacity: fadeOverlayOpacity,
        });
      }

      //   if (scrollProgess >= 0.6 && scrollProgess <= 0.85) {
      // const overlayCopyRevealProgress = (scrollProgess - 0.6) * (1 / 0.25);

      // const gradientSpread = 100;
      // const gradientBottomPostion = 240 - overlayCopyRevealProgress * 280;
      // const gradientTopPosition = gradientBottomPostion - gradientSpread;
      // const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;

      // console.log(gradientTopPosition, gradientBottomPostion);

      // overlayCopy.style.background = `linear-gradient(to bottom, #111117 0%, #111117 ${gradientTopPosition}%, red ${gradientBottomPostion}%, red 100%)`;
      // overlayCopy.style.backgroundClip = "text";

      // gsap.set(overlayCopy, {
      //   scale: overlayCopyScale,
      //   opacity: overlayCopyRevealProgress,
      // });
      //   } else if (scrollProgess < 0.6) {
      //     gsap.set(overlayCopy, {
      //       opacity: 0,
      //     });
      //   }
    },
  });

  // step

  {
    step();
  }

  // -----------------------------  card  ----------------------------------

  const cards = gsap.utils.toArray(".card");

  const rotations = cards.map((e, index) => {
    return randNumber(-24, 6);
  });

  cards.forEach((card, index) => {
    gsap.set(card, {
      y: window.innerHeight,
      rotate: rotations[index],
    });
  });

  function updateCards(self) {
    const progress = self.progress;
    const totalCards = cards.length;
    const progressPerCard = 1 / totalCards;
    cards.forEach((card, index) => {
      const cardStart = index * progressPerCard;
      let cardProgress = (progress - cardStart) / progressPerCard;
      cardProgress = Math.min(Math.max(cardProgress, 0), 1);
      let yPos = window.innerHeight * (1 - cardProgress);
      let xPos = 0;
      if (cardProgress === 1 && index < totalCards - 1) {
        const remainingProgress =
          (progress - (cardStart + progressPerCard)) /
          (1 - (cardStart + progressPerCard));
        if (remainingProgress > 0) {
          const distanceMultiplier = 1 - index * 0.15;
          xPos =
            -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;
          yPos =
            -window.innerHeight * 0.3 * distanceMultiplier * remainingProgress;
        }
      }

      gsap.to(card, {
        y: yPos,
        x: xPos,
        duration: 0,
        ease: "none",
      });
    });
  }

  //   ScrollTrigger.create({
  //     trigger: ".sticky-cards",
  //     start: "top top",
  //     end: `+=${window.innerHeight * 5}`,
  //     pin: true,
  //     pinSpacing: true,
  //     scrub: 1,
  //     onUpdate(self) {
  //       const progress = self.progress;
  //       const totalCards = cards.length;
  //       const progressPerCard = 1 / totalCards;
  //       cards.forEach((card, index) => {
  //         const cardStart = index * progressPerCard;
  //         let cardProgress = (progress - cardStart) / progressPerCard;
  //         cardProgress = Math.min(Math.max(cardProgress, 0), 1);
  //         let yPos = window.innerHeight * (1 - cardProgress);
  //         let xPos = 0;
  //         if (cardProgress === 1 && index < totalCards - 1) {
  //           const remainingProgress =
  //             (progress - (cardStart + progressPerCard)) /
  //             (1 - (cardStart + progressPerCard));
  //           if (remainingProgress > 0) {
  //             const distanceMultiplier = 1 - index * 0.15;
  //             xPos =
  //               -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;
  //             yPos =
  //               -window.innerHeight *
  //               0.3 *
  //               distanceMultiplier *
  //               remainingProgress;
  //           }
  //         }

  //         gsap.to(card, {
  //           y: yPos,
  //           x: xPos,
  //           duration: 0,
  //           ease: "none",
  //         });
  //       });
  //     },
  //   });

  // text -------------------
  {
    const animeTextParagraphs = document.querySelectorAll(".anime-text p");
    const wordHighlightBgColor = "60, 60, 60";

    const keywords = [];

    animeTextParagraphs.forEach((paragragh) => {
      const text = paragragh.textContent;
      const words = text.split(/\s+/);
      paragragh.innerHTML = "";
      words.forEach((word) => {
        if (word.trim()) {
          const wordContainer = document.createElement("div");
          wordContainer.className = "word";

          const wordText = document.createElement("span");
          wordText.textContent = word;

          const normalizedWord = word.toLowerCase().replace(/[.,!?;:]/g, "");

          if (keywords.includes(normalizedWord)) {
            wordContainer.classList.add("keyword-container");
            wordText.classList.add("keyword", normalizedWord);
          }

          wordContainer.appendChild(wordText);
          paragragh.appendChild(wordContainer);
        }
      });
    });

    const animeTextContainers = document.querySelectorAll(
      ".anime-text-container"
    );
    const title0 = document.querySelector(".title0");
    animeTextContainers.forEach((container) => {
      ScrollTrigger.create({
        trigger: container,
        pin: container,
        start: "top top",
        end: `+=${window.innerHeight * 5}`,
        pinSpacing: true,
        onUpdate(self) {
          updateCards(self);
          const progress = self.progress;

          if (progress < 0.5) {
            // 0-0.2  0 - 1
            // 0-0 0.2-100
            // transform
            title0.style.opacity = progress / 0.5;
            title0.style.transform = `translateY(calc(${
              progress * 200
            }vh - 100%))`;
          }

          const words = Array.from(
            container.querySelectorAll(".anime-text .word")
          );
          const totalWords = words.length;
          words.forEach((word, index) => {
            const wordText = word.querySelector("span");
            if (progress <= 0.7) {
              const progressTarget = 0.7;
              const revealProgress = Math.min(1, progress / progressTarget);

              const overlapWords = 15;
              const totalAnimationLength = 1 + overlapWords / totalWords;

              const wordStart = index / totalWords;
              const wordEnd = wordStart + overlapWords / totalWords;

              const timelineScale =
                1 /
                Math.min(
                  totalAnimationLength,
                  1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                );

              const adjustedStart = wordStart * timelineScale;
              const adjustedEnd = wordEnd * timelineScale;

              const duration = adjustedEnd - adjustedStart;

              const wordProgress =
                revealProgress <= adjustedStart
                  ? 0
                  : revealProgress >= adjustedEnd
                  ? 1
                  : (revealProgress - adjustedStart) / duration;

              word.style.opacity = wordProgress;

              const backgroundFadeStart =
                wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
              const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

              const textRevealThreshold = 0.9;
              const textRevealProgress =
                wordProgress >= textRevealThreshold
                  ? (wordProgress - textRevealThreshold) /
                    (1 - textRevealThreshold)
                  : 0;
              wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
            }
          });
        },
      });
    });
  }
});
