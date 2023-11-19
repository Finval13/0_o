"use strict";

class CustomSelect {
  constructor(content) {
    this.content = content;
    this.selected = null;
  }

  #generateItemsHtml() {
    let html = "";
    for (const item of this.content.items) {
      html += `<li class="${item.status ? "select__item select__item--active" : "select__item"}">${item.name}</li>`;
    }
    this.selectList.innerHTML = html;
  }

  #generateListHtml() {
    this.selectContainer.insertAdjacentHTML("beforeend", `<ul class="select__list"></ul>`);
    this.selectList = this.selectContainer.querySelector(".select__list");
    this.#generateItemsHtml();
  }

  #generateSelectedItem() {
    this.selectedList.insertAdjacentHTML(
      "beforeend",
      `<li class="selected__item">
        <span class="delete-btn">+</span>
        <p>${this.selected}</p>
        </li>`
    );
  }

  #generateSelectedList() {
    this.selectContainer.insertAdjacentHTML("beforeend", `<ul class="selected__list"></ul>`);
    this.selectedList = this.selectContainer.querySelector(".selected__list");
  }

  #generateHtml() {
    const html = `<div class="select__container">
        <h3 class="select__header">${this.content.header}</h3>
        </div>`;
    document.body.insertAdjacentHTML("beforeend", html);
    this.selectContainer = document.querySelector(".select__container");
    this.#generateSelectedList();
    this.#generateListHtml();
  }

  #toggleList(e) {
    if (!e.target.matches(".delete-btn")) {
      this.selectList.classList.toggle("select__list--active");
    } else {
      const text = e.target.nextElementSibling.textContent;
      e.target.parentElement.remove();

      for (const [i, elem] of this.selectList.children.entries()) {
        if (elem.textContent === text) {
          this.content.items[i].status = false;
          this.#generateItemsHtml();
        }
      }
    }
  }

  #handleSelect(e) {
    if (e.target.matches(".select__item") && !e.target.matches(".select__item--active")) {
      const i = [...this.selectList.children].indexOf(e.target);
      this.content.items[i].status = true;
      this.selected = e.target.textContent;
      this.#generateSelectedItem();
      this.#generateItemsHtml();
    }
  }

  #attachEvents() {
    this.selectedList.addEventListener("click", this.#toggleList.bind(this));
    this.selectList.addEventListener("click", this.#handleSelect.bind(this));
  }

  initialize() {
    this.#generateHtml();
    this.#attachEvents();
  }
}

const content = {
  header: "Волосатість черевця бджоли",
  items: [
    { name: "Велика індійська бджола", status: false },
    { name: "Медоносна бджола", status: false },
    { name: "Індійська бджола", status: false },
    { name: "Арликова бджола", status: false },
  ],
};

const myCustomSelect = new CustomSelect(content);
myCustomSelect.initialize();
