export default function autoResizeInputToFitText(element: HTMLElement) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + 5 + "px";
}
