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

// ---------
const preNumbers = document.querySelector(".board__number-pre");
const resNumber = document.querySelector(".board__number-res");
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equals]");
const clearAllBtn = document.querySelector("[data-all-clear]");
const delBtn = document.querySelector(".delete-btn");

class Calculator {
   constructor(preNumbers, resNumber) {
      this.preNumbers = preNumbers;
      this.resNumber = resNumber;
   }

   clear() {
      this.currentOperand = "";
      this.preOperand = "";
      this.operation = undefined;
   }

   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
   }

   appendNumber(number) {
      if (number === "." && this.currentOperand.includes(".")) return;
      this.currentOperand =
         typeof this.currentOperand == "undefined"
            ? number
            : this.currentOperand + number.toString();
   }

   chooseOperation(operation) {
      if (this.currentOperand === "") return;
      if (this.preOperand !== "") {
         this.compute();
      }
      this.operation = operation;
      this.preOperand = this.currentOperand;
      this.currentOperand = "";
   }

   compute() {
      let computation;
      const prev = parseFloat(this.preOperand);
      const current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
         case "+":
            computation = prev + current;
            break;
         case "-":
            computation = prev - current;
            break;
         case "*":
            computation = prev * current;
            break;
         case "/":
            computation = prev / current;
            break;
         default:
            return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.preOperand = "";
   }

   getDisplayNumber(number) {
      const stringNum = number.toString();
      const integerDigits = parseFloat(stringNum.split(".")[0]);
      const decimalDigits = stringNum.split(".")[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
         integerDisplay = "";
      } else {
         integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0,
         });
      }
      if (decimalDigits != null) {
         return `${integerDisplay}.${decimalDigits}`;
      } else {
         return integerDisplay;
      }
   }
   updateDisplay() {
      if (this.operation != null) {
         this.preNumbers.textContent = `${this.getDisplayNumber(
            this.preOperand
         )} ${this.operation}`;
      } else {
         this.preNumbers.textContent = "";
      }

      this.resNumber.textContent = this.currentOperand;
   }
}

const calculator = new Calculator(preNumbers, resNumber);

numberBtns.forEach((button) => {
   button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
   });
});

operationBtns.forEach((button) => {
   button.addEventListener("click", () => {
      calculator.chooseOperation(button.dataset.operator);
      calculator.updateDisplay();
   });
});
// =
equalBtn.addEventListener("click", (button) => {
   calculator.compute();
   calculator.updateDisplay();
});
// AC
clearAllBtn.addEventListener("click", (button) => {
   calculator.clear();
   calculator.updateDisplay();
});
// del
delBtn.addEventListener("click", (button) => {
   calculator.delete();
   calculator.updateDisplay();
});
document.body.addEventListener("keyup", function (e) {
   const key = e.key;

   switch (key) {
      case "Backspace":
         calculator.delete();
         calculator.updateDisplay();
         break;
   }
});
