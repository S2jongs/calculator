const display = document.getElementById("screen");
let isResultDisplayed = false;

function updatedisplay(value) {
    display.value = value;
}

function appendToDisplay(value) {
    if (isResultDisplayed && !isNaN(value)) {
        display.value = ""; // Clear the display if a number is entered after a result
        isResultDisplayed = false;
    }

    const lastChar = display.value.slice(-1);
    const operators = ["+", "-", "*", "/"];
    if (operators.includes(value) && operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + value; // Replace last operator
    } else {
        display.value += value;
    }
}

/* Number buttons */
document.getElementById("no0").addEventListener("click", () => appendToDisplay("0"));
document.getElementById("no00").addEventListener("click", () => appendToDisplay("00"));
document.getElementById("no1").addEventListener("click", () => appendToDisplay("1"));
document.getElementById("no2").addEventListener("click", () => appendToDisplay("2"));
document.getElementById("no3").addEventListener("click", () => appendToDisplay("3"));
document.getElementById("no4").addEventListener("click", () => appendToDisplay("4"));
document.getElementById("no5").addEventListener("click", () => appendToDisplay("5"));
document.getElementById("no6").addEventListener("click", () => appendToDisplay("6"));
document.getElementById("no7").addEventListener("click", () => appendToDisplay("7"));
document.getElementById("no8").addEventListener("click", () => appendToDisplay("8"));
document.getElementById("no9").addEventListener("click", () => appendToDisplay("9"));

/* Period button */
document.getElementById("period").addEventListener("click", () => {
    const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes(".")) {
        appendToDisplay(".");
    }
});

/* Percentage button */
document.getElementById("percent").addEventListener("click", () => {
    const lastChar = display.value.slice(-1);
    const operators = ["+", "-", "*", "/"];
    if (display.value && !operators.includes(lastChar)) {
        appendToDisplay("%");
    }
});

/* Computation operators */
document.getElementById("add").addEventListener("click", () => {
    isResultDisplayed = false;
    appendToDisplay("+");
});
document.getElementById("subtract").addEventListener("click", () => {
    isResultDisplayed = false;
    appendToDisplay("-");
});
document.getElementById("multiply").addEventListener("click", () => {
    isResultDisplayed = false;
    appendToDisplay("*");
});
document.getElementById("divide").addEventListener("click", () => {
    isResultDisplayed = false;
    appendToDisplay("/");
});

/* Clear all */
document.getElementById("clear").addEventListener("click", () => {
    updatedisplay("");
    isResultDisplayed = false;
});

/* Delete last character */
document.getElementById("delete").addEventListener("click", () => {
   updatedisplay(display.value.slice(0, -1));
});

/* Calculate (Equal button) */
document.getElementById("equal").addEventListener("click", () => {
    try {
        let result = display.value;

        // Replace 'x' with '*', handle '%', and evaluate the expression
        result = result.replace(/x/g, "*").replace(/%/g, "/100");
        const calculated = eval(result);

        if (isNaN(calculated) || !isFinite(calculated)) {
            throw new Error("Invalid calculation");
        }

        updatedisplay(calculated);
        isResultDisplayed = true;
    } catch (error) {
        updatedisplay("0");
        isResultDisplayed = true;
    }
});
