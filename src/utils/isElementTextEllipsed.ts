export default function isElementTextEllipsed(
  element: HTMLParagraphElement | HTMLElement,
) {
  return element.offsetHeight < element.scrollHeight;
}
