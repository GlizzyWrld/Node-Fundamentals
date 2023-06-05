let favNumber = 9;
let baseURL = "http://numbersapi.com";



$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
});



let favNumbers = [7, 11, 22];
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  console.log(data);
});



Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});