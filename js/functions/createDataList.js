import createListItem from "./createListItem.js";

const createDataList = (patentNode, data, inputValue, selectedItems) => {
  patentNode.innerHTML = "";
  if (inputValue) {
    const filterData = data.filter((el) => el.title.includes(inputValue));
    console.log(filterData);
    if (filterData.length === 0) {
      const newItem = createListItem({
        title: "Ничего не найдено",
        id: "null",
      });
      patentNode.append(newItem);
      return;
    }
    filterData.forEach((el) => {
      const newItem = createListItem(el, inputValue, selectedItems);
      patentNode.append(newItem);
    });
  } else {
    data.forEach((el) => {
      const newItem = createListItem(el, "", selectedItems);
      patentNode.append(newItem);
    });
  }
};

export default createDataList;
