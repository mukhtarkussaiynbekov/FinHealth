## Accounts

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/account {name: String, balance: Number} <br>
**DELETE** &nbsp;&nbsp;/account {name: String}

## Categories

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/category {name: String, balance: Number, budget: Number} <br>
**DELETE** &nbsp;&nbsp;/category {name: String}

## Income

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/income {name: String, amount: Number} <br>
**DELETE** &nbsp;&nbsp;/income {name: String}

## Transactions

**POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/transaction {date: String(format yyyy-mm-dd}, transaction: Number, account: String, category: String, tag: String} <br>
**GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/transaction/?category&account&count&from=yyyy-mm-dd&to=yyyy-mm-dd <br>
**PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/transaction/:id {date: String(format yyyy-mm-dd}, transaction: Number, account: String, category: String, tag: String} <br>
