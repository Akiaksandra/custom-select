import data from "../data/data.js";
import createDataList from "../functions/createDataList.js";

const singleSelect = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const selectList = document.querySelector(".select__list");
    const inputArrow = document.querySelector(".input__arrow");
    const inputContainer = document.querySelector(".input__container");
    const selectedItemText = document.querySelector(".selected__item-text");

    const selectedItems = [];
    // Functions
    const toggleClasses = () => {
      selectList.classList.toggle("hide");
      inputArrow.classList.toggle("open");
    };

    const handleChooseItem = (e) => {
      let targetEl = e.target.closest("li");
      if (targetEl && targetEl.dataset.id !== "null") {
        const newElem = {
          id: targetEl.dataset.id,
          title: targetEl.innerHTML,
        };
        const currentElem = selectedItems.find((el) => el.id === newElem.id);
        if (!currentElem) {
          selectedItems[0] = newElem;
          input.placeholder = "";
        } else {
          selectedItems[0] = {};
          input.placeholder = "Выберите значение или воспользуйтесь поиском";
        }

        selectedItemText.innerHTML = selectedItems[0].title || "";
        selectedItemText.dataset.id = selectedItems[0].id || "";
        input.value = "";
        toggleClasses();
      }
    };

    const hideDataList = (e) => {
      if (!e.target.closest(".single-select")) {
        selectList.classList.add("hide");
        inputArrow.classList.remove("open");
        if (selectedItems.length) {
          selectedItemText.innerHTML = selectedItems[0].title || "";
        }
      }
    };

    // Listners
    input.addEventListener("input", () => {
      createDataList(selectList, data, input.value, [
        { id: selectedItemText.dataset.id, title: selectedItemText.innerHTML },
      ]);
    });

    inputContainer.addEventListener("click", () => {
      if (selectList.classList.contains("hide")) {
        createDataList(selectList, data, input.value, [
          {
            id: selectedItemText.dataset.id,
            title: selectedItemText.innerHTML,
          },
        ]);
        input.placeholder = selectedItemText.innerHTML;
        selectedItemText.innerHTML = "";
        toggleClasses();
      }
    });

    selectList.addEventListener("click", (e) => {
      handleChooseItem(e);
    });

    document.addEventListener("click", (e) => {
      hideDataList(e);
    });
  });
};

export default singleSelect;
