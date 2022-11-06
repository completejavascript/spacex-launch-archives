export function scrollIntoViewWithOffset(
  containerSelector: string,
  targetSelector: string,
  topOffset = 0
) {
  const containerElm = document.querySelector(
    containerSelector
  ) as HTMLElement | null;
  if (!containerElm) return;

  const targetElm = document.querySelector(
    targetSelector
  ) as HTMLElement | null;
  if (!targetElm) return;

  containerElm.scrollTo({
    top: targetElm.offsetTop + topOffset,
    behavior: "smooth",
  });
}

export function elementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
