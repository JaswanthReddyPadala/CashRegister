const userCash = document.getElementById("user_cash_input");
const totalBill = document.getElementById("total_bill_input");
const denominationGroup = document.getElementById("denomination-group");
const userCashGroup = document.querySelector(".user-cash");
const nextButton = document.getElementById("calculate_button");
const appOutput = document.querySelector(".app_output");
const error = document.querySelector(".error");

nextButton.addEventListener("click", nextInput);


function calculateReturn(userCashAmount, totalBillAmount) {
  let change = userCashAmount - totalBillAmount;
  let denomination = {
    2000: 0,
    500: 0,
    100: 0,
    20: 0,
    10: 0,
    5: 0,
    1: 0,
  };




function nextInput() {
  console.log(totalBill.value);
  if (totalBill.value && totalBill.value>0) {
    console.log(totalBill);
    nextButton.innerText = "Calculate";
    nextButton.addEventListener("click", checkInputs);
    userCashGroup.style.display = "flex";
  } else {
    // alert("enter a valid input");
    error.style.display = "block";
    error.innerText = "Enter a valid input";
  }
}


function checkInputs() {
  const error = document.querySelector(".error");
  userCashAmount = Number(userCash.value);
  totalBillAmount = Number(totalBill.value);
  if (userCashAmount < 1) {
    error.innerText = "Please enter valid user cash amount!";
  } else if (totalBillAmount < 1) {
    error.innerText = "Please enter valid total bill amount!";
  } else if (userCashAmount < totalBillAmount) {
    error.innerText = `Insufficient Amount, Please give Rs.${
      totalBillAmount - userCashAmount
    } more !`;
  } else {
    if (userCashAmount == totalBillAmount) {
      error.innerText = "Thank you for providing exact change 😃";
    }
    calculateReturn(userCashAmount, totalBillAmount);
  }
}

  const denominationKeys = Object.keys(denomination);

  for (let i = denominationKeys.length; i >= 0; i--) {
    let denominationAmount = denominationKeys[i - 1];
    let changeAmount = change / denominationAmount;
    if (changeAmount >= 1) {
      denomination[denominationAmount] += Math.floor(changeAmount);
      change -= denominationAmount * Math.floor(changeAmount);
    }
  }
  renderReturn(denomination, denominationKeys);
}

function renderReturn(denomination, dkeys) {
  appOutput.style.display = "flex";
  denominationGroup.innerHTML = "";
  dkeys.map((eachItem) => {
    if (denomination[eachItem] > 0) {
      let denominationTab = document.createElement("div");
      denominationTab.className = "denomination-tab";

      let amount = document.createElement("span");
      amount.id = "amount";

      let noOfNotes = document.createElement("span");
      noOfNotes.id = "no_of_notes";

      amount.innerText = eachItem;
      noOfNotes.innerText = denomination[eachItem];

      denominationTab.appendChild(amount);
      denominationTab.appendChild(noOfNotes);

      denominationGroup.appendChild(denominationTab);
    }
  });
}
