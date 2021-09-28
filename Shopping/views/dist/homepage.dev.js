"use strict";

var x = document.getElementsByClassName('add-cart');

for (var i = 0; i < x.length; i++) {
  x[i].addEventListener('click', function () {
    alert("OK");
  });
}