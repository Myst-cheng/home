function fadeIn(element, duration = 1000) {
  if (!element) return;
  let start = null;
  const fade = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.min(progress / duration, 1);
    element.style.opacity = opacity;
    if (progress < duration) {
      requestAnimationFrame(fade);
    }
  };
  requestAnimationFrame(fade);
}



const Easing = {
  linear: (t) => t,

  // ease-in 慢慢加速
  easeInQuad: (t) => t * t,
  easeInCubic: (t) => t * t * t,

  // ease-out 快速开始，慢慢减速
  easeOutQuad: (t) => t * (2 - t),
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),

  // ease-in-out 加速然后减速（模拟惯性感最自然）
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  // 更强的惯性感
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2,

  easeOutBack: (t, s = 1.70158) => {
    // 超出后回弹一次
    return 1 + --t * t * ((s + 1) * t + s);
  },

  easeInOutBack: (t, s = 1.70158) => {
    // 加速、减速都带回弹
    const c1 = s * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c1 + 1) * 2 * t - c1)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c1 + 1) * (t * 2 - 2) + c1) + 2) / 2;
  },
  easeOutElastic: (t) => {
    // 弹性震荡回弹多次
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

function fadeMoveIn(
  element,
  {
    fromOpacity = 0,
    toOpacity = 1,
    fromOffset = {}, // e.g., { left: "100px", top: "0px" }
    toOffset = {}, // e.g., { left: "0px", top: "0px" }
    duration = 1000,
    easing = (t) => 1 - Math.pow(1 - t, 3), // default easeOutCubic
  } = {}
) {
  if (!element) return;

  element.style.opacity = fromOpacity;
  element.style.position = element.style.position || "absolute"; // 确保定位

  // 设置初始位置
  for (const key in fromOffset) {
    element.style[key] = fromOffset[key];
  }

  let start = null;

  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const t = Math.min(progress / duration, 1);
    const eased = easing(t);

    // 透明度
    const currentOpacity = fromOpacity + (toOpacity - fromOpacity) * eased;
    element.style.opacity = currentOpacity;

    // 每个方向属性插值
    for (const key in fromOffset) {
      const val = interpolate(fromOffset[key], toOffset[key], eased);
      element.style[key] = val;
    }

    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);

  // 单位插值器：支持像素/百分比等
  function interpolate(from, to, t) {
    const parse = (v) => {
      const match = /(-?\d+(?:\.\d+)?)([a-z%]*)/.exec(v);
      return { value: parseFloat(match[1]), unit: match[2] || "px" };
    };
    const f = parse(from);
    const toVal = parse(to);
    if (f.unit !== toVal.unit) {
      console.warn(`Unit mismatch: ${from} vs ${to}`);
    }
    const val = f.value + (toVal.value - f.value) * t;
    return `${val}${f.unit}`;
  }
}

function fadeMoveInCallback(
  element,
  {
    fromOpacity = 0,
    toOpacity = 1,
    fromOffset = {}, // e.g., { left: "100px", top: "0px" }
    toOffset = {}, // e.g., { left: "0px", top: "0px" }
    duration = 1000,
    easing = (t) => 1 - Math.pow(1 - t, 3), // default easeOutCubic,
    callback,
  } = {}
) {
  fadeMoveIn(element, {
    fromOpacity,
    toOpacity,
    fromOffset,
    toOffset,
    duration,
    easing,
  });
  if (callback) {
    setTimeout(() => {
      callback();
    }, duration);
  }
}




function fadeOut(element, duration = 1000) {
  if (!element) return;
  let start = null;
  const fade = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.max(1 - progress / duration, 0);
    element.style.opacity = opacity;
    if (progress < duration) {
      requestAnimationFrame(fade);
    }
  };
  requestAnimationFrame(fade);
}

function fadeInCallback(element, duration, callback) {
  fadeIn(element, duration);
  setTimeout(() => {
    callback();
  }, duration);
}

function fadeOutCallback(element, duration, callback) {
  fadeOut(element, duration);
  setTimeout(() => {
    callback();
  }, duration);
}
