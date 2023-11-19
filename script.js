"use strict";

class Filter {
  #arr = [
    { title: "<div class='bd'></div>Велика індійська бджола", status: false },
    { title: "<div class='bd'></div>Медоносна бджола", status: false },
    { title: "<div class='bd'></div>Індійська бджола", status: false },
    { title: "<div class='bd'></div>Арликова бджола", status: false },
  ];
  constructor(wrap, bd) {
    this.wrapper = document.querySelector(wrap);
  }

  createLi() {
    let str = "";
    this.#arr.forEach((elem) => {
      str += `<li class="${this.#isSelect(elem)}">${elem.title}</li>`;
    });
    this.wrapper.innerHTML = str;
  }

  #isSelect(elem) {
    if (elem.status === true) {
      return "active";
    } else {
      return "inactive";
    }
  }

  selectElement(e) {
    let i = [...this.wrapper.children].indexOf(e.target);
    this.#arr[i].status = true;
    this.wrapper.innerHTML = "";
    this.createLi();
  }

  init() {
    this.wrapper.addEventListener("click", this.selectElement.bind(this));

    this.createLi();
  }
}

document.addEventListener("click", function () {
  var clickableItems = document.querySelectorAll("li, div");

  clickableItems.forEach(function (item) {
    item.addEventListener("click", function () {
      item.classList.toggle("active");
    });
  });
});
