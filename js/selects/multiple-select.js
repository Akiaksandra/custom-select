import data from "../data/data.js";
import createDataList from "../functions/createDataList.js";

const multiSelect = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".multiple-select__container");
    const input = container.querySelector(".multiple-select__input");
    const selectList = document.querySelector(".multiple-select__list");
    const selectedList = container.querySelector(".selected__list");
    const selectListCross = container.querySelector(".multiple-select__cross");

    const selectedItems = [];

    // Functions
    const toggleInputPlaceholder = () => {
      if (!selectedItems.length && !input.value) {
        input.placeholder = "Выберите значение или воспользуйтесь поиском";
      } else {
        input.placeholder = "";
      }
    };
    toggleInputPlaceholder();

    const createSelectedItemsList = (selectedItems) => {
      selectedList.innerHTML = "";
      selectedItems.forEach((el) => {
        const newItem = createSelectedListItem(el);
        selectedList.append(newItem);
      });
    };

    const createSelectedListItem = (el) => {
      const div = document.createElement("div");
      div.classList.add("selected__item");
      div.innerHTML = `<span class="selected__text" data-id="${el.id}">${el.title}</span>
      <span class="select__cross">
        <i class="fas fa-times"></i>
      </span>`;
      return div;
    };

    const findElementIndex = (element, selectedItems) => {
      return selectedItems.findIndex((el) => el.id === element.id);
    };

    const hideDataList = (e) => {
      if (!e.target.closest(".multiple-select")) {
        selectList.classList.add("hide");
      }
    };
    const showDataList = () => {
      if (selectList.classList.contains("hide")) {
        selectList.classList.remove("hide");
        createDataList(selectList, data, input.value, selectedItems);
        toggleInputPlaceholder();
      }
    };

    const handleRemoveAllSelectedItems = () => {
      selectedItems.length = 0;
      createSelectedItemsList(selectedItems);
      createDataList(selectList, data);
      toggleInputPlaceholder();
    };

    const handleRemoveSelectItem = (e) => {
      let targetEl = e.target.closest(".select__cross");
      if (targetEl) {
        const newElem = {
          id: targetEl.dataset.id,
          title: targetEl.dataset.value,
        };
        const currentElemIndex = findElementIndex(newElem, selectedItems);
        selectedItems.splice(currentElemIndex, 1);
        createSelectedItemsList(selectedItems);
        createDataList(selectList, data);
        toggleInputPlaceholder();
      }
    };

    const handleClickListItem = (e) => {
      let targetEl = e.target.closest("li");
      if (targetEl && targetEl.dataset.id !== "null") {
        const newElem = {
          id: targetEl.dataset.id,
          title: targetEl.dataset.value,
        };
        const currentElemIndex = findElementIndex(newElem, selectedItems);
        currentElemIndex === -1
          ? selectedItems.push({
              id: targetEl.dataset.id,
              title: targetEl.dataset.value,
            })
          : selectedItems.splice(currentElemIndex, 1);
      }
      createSelectedItemsList(selectedItems);
      createDataList(selectList, data, input.value, selectedItems);
      toggleInputPlaceholder();
    };

    // Listners
    selectListCross.addEventListener("click", (e) => {
      e.stopPropagation();
      handleRemoveAllSelectedItems();
    });

    container.addEventListener("click", (e) => {
      e.stopPropagation();
      showDataList();
    });

    input.addEventListener("input", () => {
      createDataList(selectList, data, input.value, selectedItems);
      toggleInputPlaceholder();
    });

    selectedList.addEventListener("click", (e) => {
      handleRemoveSelectItem(e);
    });

    selectList.addEventListener("click", (e) => {
      e.stopPropagation();
      handleClickListItem(e);
    });

    document.addEventListener("click", (e) => {
      hideDataList(e);
    });
  });
};

export default multiSelect;
