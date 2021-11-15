export const getHTML = (placeholder) => {
  return `
  <div class="select__container">
    <div class="selected__list"></div>
    <input type="text" size="1" class="select__input" placeholder=${placeholder}/>
    <label class="select__input-cross"
      ><i class="fas fa-times"></i>
    </label>
  </div>
  <ul class="select__list"></ul>`;
};

export const findElementIndex = (element, selectedItems) => {
  return selectedItems.findIndex((el) => el.id === element.id);
};

export const createSelectedListItem = (element, isMultiple) => {
  if (isMultiple) {
    const div = document.createElement("div");
    div.classList.add("selected__item");
    div.dataset.id = element.id;
    div.innerHTML = `<span class="selected__text">${element.title}</span>
    <span class="selected__cross">
      <i class="fas fa-times"></i>
    </span>`;
    return div;
  } else {
    const div = document.createElement("div");
    div.classList.add("selected__item-text");
    div.innerHTML = element.title;
    return div;
  }
};
