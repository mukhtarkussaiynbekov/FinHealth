## Accounts

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/account {name: String, balance: Number} <br>
**DELETE** &nbsp;&nbsp;/account {name: String} <br>
**PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/account {prevName: String, val: {name: String, balance: Number}} <br>

## Categories

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/category {name: String, balance: Number, budget: Number} <br>
**DELETE** &nbsp;&nbsp;/category {name: String} <br>
**PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/category {prevName: String, val: {name: String, balance: Number, budget: Number}} <br>

## Income

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/income {name: String, amount: Number} <br>
**DELETE** &nbsp;&nbsp;/income {name: String} <br>
**PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/account {prevName: String, val: {name: String, amount: Number}} <br>

## Transactions

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/transaction {date: String(format yyyy-mm-dd}, transaction: Number, account: String, category: String, tag: String} <br>
**GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/transaction/?category&account&count&from=yyyy-mm-dd&to=yyyy-mm-dd <br>
**PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/transaction/:id {date: String(format yyyy-mm-dd}, transaction: Number, account: String, category: String, tag: String} <br>
