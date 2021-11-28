"use strict";
import bokLinc from "./inform.js";

const rootEl = document.querySelector("#root");

rootEl.append(document.createElement("div"), document.createElement("div"));

rootEl.firstElementChild.className = "firstDiv";
rootEl.lastElementChild.className = "lastDiv";

const rootStartDiv = document.querySelector(".firstDiv");
const rootEndDiv = document.querySelector(".lastDiv");

rootStartDiv.append(document.createElement("h2"));
rootStartDiv.append(document.createElement("ul"));
rootStartDiv.append(document.createElement("button"));

document.querySelector("h2").textContent = "My books";
document.querySelector("button").textContent = "Add";

const rootUl = document.querySelector("ul");

localStorage.setItem("books", JSON.stringify(bokLinc));

renderList();

function renderList() {
  const books = JSON.parse(localStorage.getItem("books"));

  const bookLisMarcap = books
    .map(({ title }) => {
      return `<li>
    <p class="title"> ${title}</p>
    <button id="delete">delete</button>
    <button id="edit">edit</button>
    </li>
    `;
    })
    .join("");

  rootUl.insertAdjacentHTML("afterbegin", bookLisMarcap);

  const rootP = document.querySelectorAll(".title");
  rootP.forEach((item) => item.addEventListener("click", renderPreview));

  const rootBtnDel = document.querySelector("#delete");
  rootBtnDel.addEventListener("click", bookDelete);

  const rootBtnEd = document.querySelector("#edit");
  rootBtnEd.addEventListener("click", editDelete);
}

function renderPreview() {
  console.log(1);
}

function bookDelete() {
  console.log(2);
}

function editDelete() {
  console.log(3);
}
