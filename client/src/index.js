import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './css/styles.css';
import './css/header.css';
import './css/transactions.css';
import './css/transactionAdder.css';
import './css/popUp.css';
import './css/icons.css';
import './css/accounts.css';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
