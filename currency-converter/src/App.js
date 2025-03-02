import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

    // Initializing all the state variables 
    const [info, setInfo] = useState({});
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    // Example conversion rates to INR
    const conversionRates = [
        { "country": "United States", "currency_code": "USD", "rate_to_inr": 83.50 },
        { "country": "United Kingdom", "currency_code": "GBP", "rate_to_inr": 107.60 },
        { "country": "Eurozone", "currency_code": "EUR", "rate_to_inr": 90.20 },
        { "country": "Japan", "currency_code": "JPY", "rate_to_inr": 0.59 },
        { "country": "Australia", "currency_code": "AUD", "rate_to_inr": 54.85 }
    ];

    useEffect(() => {
        const rateData = {};
        conversionRates.forEach(rate => {
            rateData[rate.currency_code.toLowerCase()] = rate.rate_to_inr;
        });
        setInfo(rateData);
        setOptions(conversionRates.map(rate => rate.currency_code.toLowerCase()));
    }, []);

    // Function to convert the currency
    function convert() {
        var rate = info[from.toLowerCase()];
        setOutput(input * rate);
    }

    // Function to switch between two currencies
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="heading">
                <h1>Currency Converter</h1>
            </div>
            <div className="container">
                <div className="left">
                    <h3>Amount</h3>
                    <input type="text"
                        placeholder="Enter the amount"
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setFrom(e.value) }}
                        value={from} placeholder="From" />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }} />
                </div>
                <div className="right">
                    <h3>To</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to} placeholder="To" />
                </div>
            </div>
            <div className="result">
                <button onClick={() => { convert() }}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
            </div>
        </div>
    );
}

export default App;
