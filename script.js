const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');
const form = document.getElementById('converterForm');

// Supported currencies (you can expand this list)
const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'CAD'];

// Populate dropdowns
currencies.forEach(currency => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.value = option2.value = currency;
  option1.textContent = option2.textContent = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = 'USD';
toCurrency.value = 'INR';

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const amountValue = parseFloat(amount.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    result.textContent = "Please select different currencies.";
    return;
  }

  result.textContent = "Converting...";

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amountValue * rate).toFixed(2);
    result.textContent = `${amountValue} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.textContent = "⚠️ Failed to fetch exchange rates.";
  }
});
