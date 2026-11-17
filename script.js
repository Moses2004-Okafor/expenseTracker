let description = document.querySelector("#description");
let amount = document.querySelector("#inputAmount");
let type = document.querySelector("#type");
let transactionList = document.querySelector("#transactionList");
let button = document.querySelector(".button");
let clearButton = document.querySelector("#clearTransactions");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
function updateTotals() {
  let totalIncome = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      totalIncome += transactions[i].inputAmount;
    }
  }
  let totalExpense = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "expense") {
      totalExpense += transactions[i].inputAmount;
    }
  }
  let balance = totalIncome - totalExpense;
  let balanceDisplay = document.querySelector("#balanceAmount");
  let incomeDisplay = document.querySelector("#incomeAmount");
  let expenseDisplay = document.querySelector("#expenseAmount");

  balanceDisplay.textContent = "\u20A6" + balance.toLocaleString("en-NG");
  incomeDisplay.textContent = "\u20A6" + totalIncome.toLocaleString("en-NG");
  expenseDisplay.textContent = "\u20A6" + totalExpense.toLocaleString("en-NG");
}
button.addEventListener("click", function () {
  if (
    description.value === "" ||
    inputAmount.value === "" ||
    type.value === ""
  ) {
    return;
  }
  let transaction = {
    description: description.value,
    inputAmount: Number(amount.value),
    type: type.value,
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  displayTransaction(transaction);
  updateTotals();
  
  description.value = "";
  amount.value = "";
  type.value = "";
});
clearButton.addEventListener("click", function () {
  const confirmClear = confirm(
    "Are you sure you want to clear all transactions?",
  );
  if (!confirmClear) {
    return;
  }
  transactions = [];
  localStorage.removeItem("transactions");
  transactionList.innerHTML = "";
  updateTotals();
});
transactions.forEach(function (transaction) {
  displayTransaction(transaction);
});
updateTotals();
function displayTransaction(transaction) {
    let newList = document.createElement("li");
    newList.classList.add("transaction");
    let details = document.createElement("div");
    details.classList.add("transaction-details");

    let descriptionItem = document.createElement("div");
    descriptionItem.classList.add("detail-item");
    let descriptionLabel = document.createElement("strong");
    descriptionLabel.textContent = "Description:";
    let descriptionValue = document.createElement("span");
    descriptionValue.textContent = transaction.description;
    descriptionItem.appendChild(descriptionLabel);
    descriptionItem.appendChild(descriptionValue);

    let amountItem = document.createElement("div");
    amountItem.classList.add("detail-item");

    let amountLabel = document.createElement("strong");
    amountLabel.textContent = "Amount:";
    let amountValue = document.createElement("span");
    amountValue.textContent =
      "\u20A6" + Number(transaction.inputAmount).toLocaleString("en-NG");
    amountItem.appendChild(amountLabel);
    amountItem.appendChild(amountValue);

    let typeItem = document.createElement("div");
    typeItem.classList.add("detail-item");
    let typeLabel = document.createElement("strong");
    typeLabel.textContent = "Type:";
    let typeValue = document.createElement("span");
    typeValue.textContent = transaction.type;
    typeItem.appendChild(typeLabel);
    typeItem.appendChild(typeValue);

    details.appendChild(descriptionItem);
    details.appendChild(amountItem);
    details.appendChild(typeItem);

    transactionList.appendChild(newList);
    updateTotals();

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete Transaction";

    deleteButton.addEventListener("click", function () {
      let index = transactions.indexOf(transaction);
      if (index !== -1) {
        transactions.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        newList.remove();
        updateTotals();
      }
    });
    newList.appendChild(details);
    newList.appendChild(deleteButton);
  };
