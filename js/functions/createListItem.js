import { DEFAULT_CLASSES } from "../constants/constants.js";

const createListItem = (element, inputValue, selectedItems) => {
  const item = document.createElement("li");
  item.dataset.id = element.id;
  item.dataset.value = element.title;
  item.classList.add(DEFAULT_CLASSES.selectItem);
  let innerText = element.title;

  if (inputValue) {
    const highlightParts = element.title.split(
      new RegExp(`(${inputValue})`, "gi")
    );
    const text = highlightParts.map((part) =>
      part.toLowerCase() === inputValue.toLowerCase()
        ? `<b>${part}</b>`
        : `<span>${part}</span>`
    );
    innerText = text.join("");
  }

  if (selectedItems && selectedItems.length > 0) {
    const currentElem = selectedItems.find((el) => el.id == element.id);
    currentElem && item.classList.add(DEFAULT_CLASSES.selected);
  }

  item.innerHTML = innerText;
  return item;
};

export default createListItem;
