let requestURL = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
// let requestURL = "https://raw.githubusercontent.com/fortrabbit/quotes/master/quotes.json"

let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
  const quoteList = request.response;
  generateRandomQuote(quoteList);
};

function generateRandomQuote(obj) {
  let quoteListLength = length(obj.quotes);
  let randomNumber = Math.floor(Math.random() * quoteListLength);
  let randomQuote = obj.quotes[randomNumber].quote;
  let randomAuthor = obj.quotes[randomNumber].author;
  document.getElementsByClassName("quote__paragraph")[0].innerHTML = randomQuote;
  document.getElementsByClassName("quote__author")[0].innerHTML = randomAuthor;
}

function length(obj) {
  return Object.keys(obj).length;
}