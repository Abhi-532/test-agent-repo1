,{
  const expenseForm = document.getElementById('expense-form');
  const expensesTableBody = document.querySelector('#expenses-table tbody');
  const totalAmountSpan = document.getElementById('total-amount');

  let expenses = [];

  // Load expenses from localStorage if available
  if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    renderExpenses();
  }

  expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;
    if (!name || isNaN(amount) || !date) return;
    const expense = {
      id: Date.now(),
      name,
      amount,
      date
    };
    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    expenseForm.reset();
  });

  function renderExpenses() {
    expensesTableBody.innerHTML = '';
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.name}</td>
        <td>${expense.amount.toFixed(2)}</td>
        <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
      `;
      expensesTableBody.appendChild(tr);
    });
    totalAmountSpan.textContent = `${total.toFixed(2)}`;
  }

  expensesTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
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