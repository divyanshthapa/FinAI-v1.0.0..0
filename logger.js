document.getElementById('transactionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const paymentMethod = document.getElementById('paymentMethod').value;

  const transaction = { date, amount, description, category, paymentMethod };

  try {
    const response = await fetch('/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    const result = await response.json();

    if (result.success) {
      const messageElement = document.getElementById('message');
      messageElement.innerText = result.message;

      messageElement.style.display = 'block';

      setTimeout(() => {
        messageElement.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
          messageElement.style.display = 'none';
        }, 500);
      }, 3000);
    } else {
      alert(result.message || 'Failed to save the transaction.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to save the transaction.');
  }
});

// Detect when the feature items are in the viewport and trigger the pop-up animation
window.addEventListener('scroll', function() {
  const featureItems = document.querySelectorAll('.feature-item');

  featureItems.forEach(function(item) {
      const rect = item.getBoundingClientRect();

      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          item.classList.add('visible');
      }
  });
});
