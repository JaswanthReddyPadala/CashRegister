const userCash = document.getElementById("user_cash_input");
const totalBill = document.getElementById("total_bill_input");
const denominationGroup = document.getElementById("denomination-group");

const totalBillGroup = document.querySelector(".total-bill");

const nextButton = document.getElementById("calculate_button");

const appOutput = document.querySelector(".app_output");

nextButton.addEventListener("click", nextInput);

function nextInput() {
  if (userCash.value > 0) {
    nextButton.innerText = "Calculate";
    nextButton.addEventListener("click", checkInputs);
    totalBillGroup.style.display = "flex";
  }
  // if(userCash.value > 0){
  //   const totalBillH1 = document.createElement("h1");
  //   const totalBillInput = document.createElement("input");
  //   totalBillInput.type = "number";
  //   totalBillInput.id="total_bill_input";
  //   totalBillInput.autocomplete = "off";

  //   totalBillGroup.appendChild(totalBillH1);
  //   totalBillGroup.appendChild(totalBillInput);
}

function checkInputs() {
  userCashAmount = Number(userCash.value);
  totalBillAmount = Number(totalBill.value);
  if (userCashAmount < 1) {
    alert("Please enter valid user cash amount!");
  } else if (totalBillAmount < 1) {
    alert("Please enter valid total bill amount!");
  } else if (userCashAmount < totalBillAmount) {
    alert(
      `Insufficient Amount, Please give Rs.${
        totalBillAmount - userCashAmount
      } more !`
    );
  } else {
    calculateReturn(userCashAmount, totalBillAmount);
  }
}

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
