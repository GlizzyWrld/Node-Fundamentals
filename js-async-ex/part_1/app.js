let favNumber = 21;
let baseURL = "http://numbersapi.com";

// 1.
async function favNum() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
favNum();

// 2.
const favNumbers = [5, 1, 24];
async function numList() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
numList();

// 3.
async function fourFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
fourFacts();
