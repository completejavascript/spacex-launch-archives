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
