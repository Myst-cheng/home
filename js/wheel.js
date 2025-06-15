let step = 0;
window.addEventListener(
  "mousewheel",
  (e) => {
    e.preventDefault();
    handleWheel(e.deltaX, e.deltaY);
  },
  { passive: false }
);

function handleWheel(dx, dy) {
  if (dy > 0) {
    step += 1;
  } else {
    step -= 1;
  }
  handleStep(step)
}
