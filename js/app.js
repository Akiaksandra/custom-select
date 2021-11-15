import data from "./data/data.js";
import { Select } from "./selects/select.js";

const singleSelect = new Select("#single-select", {
  data: data,
  placeholder: "Выберите значение из списка",
  isAutoClose: true,
});
const multipleSelect = new Select("#multiple-select", {
  data: data,
  isMultiple: true,
  placeholder: "Выберите значение из списка",
});
const singleSelectWithAutocomplete = new Select("#single-select-autocomplete", {
  data: data,
  isAutocomplete: true,
});
const multipleSelectWithAutocomplete = new Select(
  "#multiple-select-autocomplete",
  {
    data: data,
    isMultiple: true,
    isAutocomplete: true,
  }
);
const multipleSelectWithAutocompleteSelected = new Select(
  "#multiple-select-autocomplete-selected",
  {
    data: data,
    isMultiple: true,
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
  console.log(singleSelectWithAutocomplete.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции в четвертом select: ");
  console.log(multipleSelectWithAutocomplete.selectedItems);
  console.groupEnd();
  console.group("Выбранные позиции в пятом select: ");
  console.log(multipleSelectWithAutocompleteSelected.selectedItems);
  console.groupEnd();
});
