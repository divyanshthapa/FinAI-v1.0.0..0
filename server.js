const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

const dataFolderPath = path.join('C:', 'Users', 'pookie', 'OneDrive', 'Desktop', 'real final ai', 'data');

if (!fs.existsSync(dataFolderPath)) {
  fs.mkdirSync(dataFolderPath, { recursive: true });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/transactions', (req, res) => {
  const { date, amount, description, category, paymentMethod } = req.body;

  if (!date || !amount || !description || !category || !paymentMethod) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  let fileName = '';

  if (paymentMethod === 'credit_card') {
    fileName = 'credit_transactions.txt';
  } else if (category === 'income') {
    if (paymentMethod === 'cash') {
      fileName = 'cash_debit.txt';
    } else if (paymentMethod === 'bank_transfer') {
      fileName = 'bank_transactions.txt';
    }
  } else if (category === 'expense') {
    if (paymentMethod === 'cash') {
      fileName = 'cash_credit.txt';
    } else if (paymentMethod === 'bank_transfer') {
      fileName = 'bank_transactions.txt';
    }
  } else if (category === 'savings') {
    fileName = 'savings_transactions.txt';
  }

  if (!fileName) {
    return res.status(400).json({ success: false, message: 'Invalid category or payment method.' });
  }

  const transaction = `Date: ${date}, Amount: $${amount}, Description: ${description}, Payment Method: ${paymentMethod}\n`;

  const filePath = path.join(dataFolderPath, fileName);

  fs.appendFile(filePath, transaction, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to save the transaction.' });
    }

    res.json({ success: true, message: 'Transaction saved successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
