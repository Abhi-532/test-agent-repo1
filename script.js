,{
  const form = document.getElementById('expense-form');
  const nameInput = document.getElementById('expense-name');
  const amountInput = document.getElementById('expense-amount');
  const dateInput = document.getElementById('expense-date');
  const tableBody = document.querySelector('#expenses-table tbody');
  const totalAmount = document.getElementById('total-amount');

  let expenses = [];

  // Load expenses from localStorage if available
  if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    renderExpenses();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    if (!name || isNaN(amount) || !date) {
      return;
    }
    const expense = {
      id: Date.now(),
      name,
      amount,
      date
    };
    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    form.reset();
  });

  function renderExpenses() {
    tableBody.innerHTML = '';
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.name}</td>
        <td>${expense.amount.toFixed(2)}</td>
        <td><button data-id="${expense.id}">Delete</button></td>
      `;
      tableBody.appendChild(tr);
    });
    totalAmount.textContent = total.toFixed(2);
  }

  tableBody.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = Number(e.target.getAttribute('data-id'));
      expenses = expenses.filter(exp => exp.id !== id);
      saveExpenses();
      renderExpenses();
    }
  });

  function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
});