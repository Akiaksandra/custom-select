import data from "./data/data.js";
import { Select } from "./selects/select.js";

const singleSelect = new Select("#single-select", {
  data: data,
  placeholder: "Выберите значение из списка",
});
const multipleSelect = new Select("#multiple-select", {
  data: data,
  isMultuple: true,
  placeholder: "Выберите значение из списка",
});
const singleSelectWithAutocompete = new Select("#single-select-autocopmlete", {
  data: data,
  isAutocomplete: true,
});
const multipleSelectWithAutocompete = new Select(
  "#multiple-select-autocopmlete",
  {
    data: data,
    isMultuple: true,
    isAutocomplete: true,
  }
);
const multipleSelectWithAutocompeteSelected = new Select(
  "#multiple-select-autocopmlete-selected",
  {
    data: data,
    isMultuple: true,
    isAutocomplete: true,
    selectedItems: [
      {
        id: "1",
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      },
    ],
  }
);

const button = document.querySelector(".save-button");
button.addEventListener("click", (e) => {
  console.group("Выбранные позиции в первом select: ");
  console.log(singleSelect.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции во втором select: ");
  console.log(multipleSelect.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции в третьем select: ");
  console.log(singleSelectWithAutocompete.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции в четвертом select: ");
  console.log(multipleSelectWithAutocompete.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции в пятом select: ");
  console.log(multipleSelectWithAutocompeteSelected.selectedItems);
  console.groupEnd();
});
