let favNumber = 6;
let baseURL = "http://numbersapi.com";

// 1.
$.getJSON(`${baseURL}/${favNumber}?json`, response => {
  console.log(response);
});

// 2.
let favNumbers = [6, 66, 666];
$.getJSON(`${baseURL}/${favNumbers}?json`, response => {
  console.log(response);
});

// 3.
let facts = [];
$.getJSON(`${baseURL}/${favNumber}?json`, response => {
  facts.push(response.text);
  $.getJSON(`${baseURL}/${favNumber}?json`, response => {
    facts.push(response.text);
    $.getJSON(`${baseURL}/${favNumber}?json`, response => {
      facts.push(response.text);
      $.getJSON(`${baseURL}/${favNumber}?json`, response => {
        facts.push(response.text);
        facts.forEach(fact => {
          $("body").append(`<p>${fact}</p>`);
        });
      });
    });
  });
});
