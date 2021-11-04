import data from "../data/data.js";
import createDataList from "../functions/createDataList.js";

const singleSelect = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const selectList = document.querySelector(".select__list");
    const inputArrow = document.querySelector(".input__arrow");

    // Functions
    const toggleClasses = () => {
      selectList.classList.toggle("hide");
      inputArrow.classList.toggle("open");
    };

    const handleChooseItem = (e) => {
      let targetEl = e.target.closest("li");
      if (targetEl && targetEl.dataset.id !== "null") {
        input.value = targetEl.dataset.value;
        toggleClasses();
      }
    };

    const hideDataList = (e) => {
      if (!e.target.closest(".single-select")) {
        selectList.classList.add("hide");
        inputArrow.classList.remove("open");
      }
    };

    // Listners
    input.addEventListener("input", () => {
      createDataList(selectList, data, input.value);
    });

    input.addEventListener("focus", () => {
      createDataList(selectList, data, input.value);
      toggleClasses();
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
