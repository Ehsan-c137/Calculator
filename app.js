"use strict";

// change theme
const threeDots = document.querySelector(".three-dots");
const moreOptionsBtn = document.querySelector(".board__menu__items");
const board = document.querySelector(".board");
const darkModeBtn = document.querySelector(".darkmode-btn");

threeDots.addEventListener("click", function () {
   moreOptionsBtn.classList.toggle("hidden");
});
board.addEventListener("click", function (e) {
   if (!e.target.closest(".three-dots") || e.target.closest(".darkmode-btn")) {
      moreOptionsBtn.classList.add("hidden");
   }
   if (e.target.matches(".darkmode-btn")) {
      document.body.classList.toggle("dark-theme");
      darkModeBtn.textContent.toLowerCase() == "dark mode"
         ? (darkModeBtn.textContent = "Light Mode")
         : (darkModeBtn.textContent = "Dark Mode");
   }
});
