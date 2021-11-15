import {
  DEFAULT_CLASSES,
} from "../constants/constants.js";
import createDataList from "../functions/createDataList.js";
import {
  getHTML,
  findElementIndex,
  createSelectedListItem,
} from "../functions/utils.js";

const DEFAULT_PLACEHOLDER = "Введите значение или выберите из списка";

export class Select {
  constructor(selector, options) {
    this.options = options;
    this.selectedItems = this.options.selectedItems
      ? [...this.options.selectedItems]
      : [];
    this.isAutocomplete = this.options.isAutocomplete || false;
    this.isMultiple = this.options.isMultiple || false;
    this.data = this.options.data || [];
    this.placeholder = this.options.placeholder || DEFAULT_PLACEHOLDER;
    this.isAutoClose = this.options.isAutoClose || false;

    this.selector = selector;
    this.$el = document.querySelector(this.selector);

    this.render();
    this.listeners();
  }

  render = () => {
    this.$el.classList.add("select__wrapper");
    this.$el.classList.add(DEFAULT_CLASSES.hide);
    this.$el.innerHTML = getHTML(this.placeholder);
    
    this.$selectedList = this.$el.querySelector(
      `.${DEFAULT_CLASSES.selectedList}`
    );
    this.$input = this.$el.querySelector(`.${DEFAULT_CLASSES.selectInput}`);
    !this.isAutocomplete && this.$input.setAttribute("disabled", "disabled");
    this.$selectList = this.$el.querySelector(`.${DEFAULT_CLASSES.selectList}`);
    this.update();
  };

  listeners = () => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(this.selector)) {
        this.$el.classList.remove(DEFAULT_CLASSES.hide);
        this.addFitClass(e);
        if (e.target.closest(`.${DEFAULT_CLASSES.selectList}`)) {
          this.selectItem(e);
        }
        if (e.target.closest(`.${DEFAULT_CLASSES.selectedCross}`)) {
          const targetEl = e.target.closest(`.${DEFAULT_CLASSES.selectedItem}`);
          const newElem = {
            id: targetEl.dataset.id,
          };
          const currentElemIndex = findElementIndex(
            newElem,
            this.selectedItems
          );

          this.deleteSelectedItem(currentElemIndex);
          this.update();
        }
        if (e.target.closest(`.${DEFAULT_CLASSES.selectInputCross}`)) {
          this.selectedItems.length = 0;
          this.update();
        }
      } else {
        this.$el.classList.add(DEFAULT_CLASSES.hide);
      }
  
      this.isAutoClose && document.addEventListener('mousemove', (e) => {
        if (!e.target.closest(this.selector)) {
          this.$el.classList.add(DEFAULT_CLASSES.hide);
        }
      })
    });

    this.isAutocomplete &&
      this.$input.addEventListener("input", () => {
        createDataList(
          this.$selectList,
          this.data,
          this.$input.value,
          this.selectedItems
        );
      });
  };
  
  addFitClass = (e) => {
  // TODO
  }

  update = () => {
    this.createSelectedItemsList();
    this.toggleInputPlaceholder();
    createDataList(
      this.$selectList,
      this.data,
      this.$input.value,
      this.selectedItems
    );
  };

  toggleInputPlaceholder = () => {
    this.selectedItems.length
      ? (this.$input.placeholder = "")
      : (this.$input.placeholder = this.placeholder);
  };

  addSelectedItem = (newElem) => {
    this.isMultiple
      ? this.selectedItems.push(newElem)
      : (this.selectedItems[0] = newElem);
  };

  deleteSelectedItem = (index) => {
    this.selectedItems.splice(index, 1);
  };

  selectItem = (e) => {
    let targetEl = e.target.closest("li");

    if (targetEl && targetEl.dataset.id !== "null") {
      const newElem = {
        id: targetEl.dataset.id,
        title: targetEl.dataset.value,
      };
      const currentElemIndex = findElementIndex(newElem, this.selectedItems);
      if (currentElemIndex === -1) {
        this.addSelectedItem(newElem);
        if (!this.isMultiple) {
          this.$input.value = '';
        }
      } else {
        this.deleteSelectedItem(currentElemIndex);
      }
      this.update();
    }
  };

  createSelectedItemsList = () => {
    this.$selectedList.innerHTML = "";
    this.selectedItems.forEach((el) => {
      const newItem = createSelectedListItem(el, this.isMultiple);
      this.$selectedList.append(newItem);
    });
  };
}
