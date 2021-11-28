"use strict";
import bokLinc from "./inform.js";

const rootEl = document.querySelector("#root");

rootEl.append(document.createElement("div"), document.createElement("div"));

rootEl.firstElementChild.className = "firstDiv";
rootEl.lastElementChild.className = "lastDiv";

const refs = {
  rootStartDiv: document.querySelector(".firstDiv"),
  rootEndDiv: document.querySelector(".lastDiv"),
};

refs.rootStartDiv.append(document.createElement("h2"));
document.querySelector("h2").textContent = "My books";

refs.rootStartDiv.append(document.createElement("ul"));

refs.rootStartDiv.append(document.createElement("button"));
document.querySelector("button").textContent = "Add";

const rootUl = document.querySelector("ul");

if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(bokLinc));
}

renderList();

//
// ......FUNCTION......
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
function renderList() {
  const books = JSON.parse(localStorage.getItem("books"));

  const bookLisMarcap = books
    .map(({ title }) => {
      return `<li class="about__book">
    <p class="title">${title}</p>
    <button id="delete">delete</button>
    <button id="edit">edit</button>
    </li>
    `;
    })
    .join("");

  rootUl.insertAdjacentHTML("afterbegin", bookLisMarcap);

  const aboutBook = document.querySelector(".about__book");
  const rootParam = document.querySelectorAll(".title");

  rootParam.forEach((item) => item.addEventListener("click", renderPreview));

  const rootBtnDel = document.querySelectorAll("#delete");
  rootBtnDel.forEach((item) => item.addEventListener("click", bookDelete));

  const rootBtnEd = document.querySelector("#edit");
  rootBtnEd.addEventListener("click", editDelete);
}
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
function renderPreview(evt) {
  const books = JSON.parse(localStorage.getItem("books"));

  const book = books.find(({ title }) => {
    return title === evt.currentTarget.textContent;
  });

  refs.rootEndDiv.innerHTML = "";
  const iformList = `<h3>${book.title}</h3>
  <p>${book.author}</p>
  <img src="${book.img}">
  <p>${book.plot}</p>`;

  refs.rootEndDiv.innerHTML = iformList;
}
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
function bookDelete(evt) {
  const books = JSON.parse(localStorage.getItem("books"));

  const parentTitle = evt.currentTarget.parentNode.querySelector(".title");
  const lastDivTitle = refs.rootEndDiv.querySelector("h3");

  const fg = books.filter(({ title }) => title !== parentTitle.textContent);

  localStorage.setItem("books", JSON.stringify(fg));

  if (localStorage.getItem("books").length === 2) {
    localStorage.removeItem("books");
  }
  if (lastDivTitle) {
    if (lastDivTitle.textContent === parentTitle.textContent) {
      refs.rootEndDiv.innerHTML = "";
    }
  }
  evt.currentTarget.parentNode.remove();
}
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//

function editDelete() {}
