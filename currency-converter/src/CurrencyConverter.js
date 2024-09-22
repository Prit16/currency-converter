// src/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Fetch the list of currencies
        axios
            .get('https://api.exchangerate-api.com/v4/latest/USD')
            .then((response) => {
                setCurrencies([...Object.keys(response.data.rates)]);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const convertCurrency = () => {
        // Fetch conversion rate and calculate result
        axios
            .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then((response) => {
                const rate = response.data.rates[toCurrency];
                setResult((amount * rate).toFixed(2));
            })
            .catch((error) => console.error('Error fetching conversion rate:', error));
    };

    return (
        <>
            <div className="cc">
                <div className="converter">
                    <h2>Currency Converter</h2>
                    <div className="form-group">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount"
                        />
                        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                        <span>to</span>
                        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                        <button onClick={convertCurrency}>Convert</button>
                    </div>
                    {result && <h3>{`${amount} ${fromCurrency} = ${result} ${toCurrency}`}</h3>}
                </div>
            </div>
        </>
    );
};

export default CurrencyConverter;
