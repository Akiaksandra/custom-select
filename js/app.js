import data from "./data/data.js";
import { Select } from "./selects/select.js";

const singleSelect = new Select("#single-select", { data: data });
const multipleSelect = new Select("#multiple-select", {
  data: data,
  isMultuple: true,
});
const multipleSelect2 = new Select("#multiple-select2", {
  data: data,
  isMultuple: true,
  selectedItems: [
    {
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    },
  ],
});

const button = document.querySelector(".save-button");
button.addEventListener("click", (e) => {
  console.group("Выбранные позиции в первом select: ");
  console.log(singleSelect.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции во втором select: ");
  console.log(multipleSelect.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции в третьем select: ");
  console.log(multipleSelect2.selectedItems);
  console.groupEnd();
});
