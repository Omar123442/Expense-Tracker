let etracker = JSON.parse(localStorage.getItem('etracker')) || [];
let totalIncomes = JSON.parse(localStorage.getItem('totalIncomes')) || 0;
let totalExpenses = JSON.parse(localStorage.getItem('totalExpenses')) || 0;
let totalsum = JSON.parse(localStorage.getItem('totalsum')) || 0;

function saveUsersToLocalStorage() {
    localStorage.setItem('etracker', JSON.stringify(etracker));
    localStorage.setItem('totalIncomes', JSON.stringify(totalIncomes));
    localStorage.setItem('totalExpenses', JSON.stringify(totalExpenses));
    localStorage.setItem('totalsum', JSON.stringify(totalsum));
}

function calculate() {
    let num1 = parseInt(document.getElementById("num1").value);
    let text = document.getElementById("text").value;

    if (isNaN(num1) || text.trim() === "") {
        alert("Please enter a valid number and text");
        return;
    }

    if (num1 < 0) {
      totalExpenses += num1;
      deficiency.innerHTML = `Outcome: ${totalExpenses}`;


    } else if (num1 > 0) {
        totalIncomes += num1;
        profit.innerHTML=`Income ${totalIncomes}`;
    }

    totalsum = totalIncomes + totalExpenses;

    etracker.push({ amount: num1, text: text });
    saveUsersToLocalStorage();
    displayExpense();
    updatingData();

    document.getElementById("num1").value = "";
    document.getElementById("text").value = "";
}

function displayExpense() {
    let expenses = document.getElementById("expenses");
    expenses.innerHTML = '';

    etracker.forEach((transaction, index) => {
        let li = document.createElement("li");
        li.textContent = `${transaction.text}: ${transaction.amount}`;
        if (transaction.amount < 0) {
            li.style.color = "red";
        } else {
            li.style.color = "green";
        }
        let removebtn = document.createElement("button");
        removebtn.innerHTML = "<i class='far fa-trash-alt'></i>";
        removebtn.style.border = "none";
        removebtn.className = "remove-btn";
        removebtn.onclick = () => {
            removeExpense(index);
        }
        li.appendChild(removebtn);
        expenses.appendChild(li);
    });
}





function removeExpense(index) {
    let removed = etracker.splice(index, 1)[0];
    if (removed.amount < 0) {
        totalExpenses -= removed.amount;
    } else if (removed.amount > 0) {
        totalIncomes -= removed.amount;
    }

    totalsum = totalIncomes + totalExpenses;
    saveUsersToLocalStorage();
    displayExpense();
    updatingData();
}

function updatingData() {
    let profit = document.getElementById("profit");
    let deficiency = document.getElementById("deficiency");
    let totalsumElement = document.getElementById("totalsum");

    profit.innerHTML = ` ${totalIncomes}`;
    deficiency.innerHTML = ` ${(totalExpenses)}`;
    totalsumElement.innerHTML = ` ${totalsum}`;

   
}

document.addEventListener("DOMContentLoaded", function() {
    displayExpense();
    updatingData();
});

function resetLocalStorage() {
    localStorage.removeItem('etracker');
    localStorage.removeItem('totalIncomes');
    localStorage.removeItem('totalExpenses');
    localStorage.removeItem('totalsum'); 
    etracker = [];
    totalIncomes = 0;
    totalExpenses = 0;
    totalsum = 0;
    saveUsersToLocalStorage();
    displayExpense();
    updatingData();
}

document.getElementById("resetButton").addEventListener("click", resetLocalStorage);
