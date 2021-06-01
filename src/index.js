import css from "./css/styles.css";
import { createClient } from "pexels";
import itemTemplate from "./template/item.hbs";
const form = document.getElementById("form");
const result = document.getElementById("result");
const button = document.getElementById("button");
const queryInput = document.getElementById("query");
const inputs = document.querySelectorAll("input");
console.log(inputs);
let totalFocus = 0;
inputs.forEach((input) => {
  input.addEventListener("blur", (event) => {
    // console.log(event);
    console.log("blur:", event.target.id);
    event.target.style.background = "red";
  });
  input.addEventListener("focus", (event) => {
    totalFocus = totalFocus + 1; 
    console.log("totalFocus",totalFocus);
  });
});
// console.log(form, result, button);
// console.log(createClient);
const apiKey = "563492ad6f917000010000019b12c0ae48b44b77908448361ebdac71";
const client = createClient(apiKey);
// console.log(client);
const query = "небо";
// const parametrs = { query, per_page: 10 };
// client.photos.search(parametrs).then((response) => {
//   console.log(response);
// });
// console.log(itemTemplate);

// вешаем слушателя событий на форму (потому что удобней на родителя)
form.addEventListener("≠", (event) => {
  event.preventDefault(); //только у события submit
  if (
    event.target.elements.query.value === "" ||
    event.target.elements.perPage.value === "" ||
    event.target.elements.page.value === ""
  )
    return;
  // console.log("ok");
  // console.log(event);
  // console.log(event.target);
  // console.log(event.target.elements);
  // console.log(event.target.elements.query);
  // console.log(event.target.elements.query.value);
  let query = event.target.elements.query.value;
  let per_page = event.target.elements.perPage.value;
  // console.log(per_page);
  let page = event.target.elements.page.value;
  // console.log(page);
  const parametres = { query, page, per_page };
  client.photos.search(parametres).then((response) => {
    // console.log(response.photos);
    localStorage.setItem("photos", JSON.stringify(response.photos));
    // console.log(localStorage.getItem("photos"));
    let data = JSON.parse(localStorage.getItem("photos"));
    const items = itemTemplate(data);
    // console.log(items);
    result.insertAdjacentHTML("afterbegin", items);
  });
});
// у формы есть дефолтное событие . event.preventDefault() -метод останавливает
//  отправку формы до того момента пока не соберет значение
// console.log(localStorage);
// queryInput.addEventListener("blur", (event) => {
// console.log(event);
// console.log(event.target);
// });
// console.log(window);
// window.addEventListener("focus", (event) => {
//   console.log(event);
//   console.log(event.target);
// });
