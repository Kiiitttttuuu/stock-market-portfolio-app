import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

const Stocks = ({ addToWatchlist }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stocks')
      .then((res) => res.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error('Error fetching stocks:', error));
  }, []);

  const getRandomColor = () => {
    const colors = ['#FF0000', '#00FF00'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="App">
      <h1>Stocks Market MERN App</h1>
      <h2>Stocks</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.company} ({stock.symbol}) - 
            <span style={{ color: getRandomColor() }}>
              {' '}
              ${stock.initial_price}
            </span>
            <button onClick={() => addToWatchlist(stock)}>
              Add to My Watchlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Watchlist = ({ watchlist }) => {
  const getRandomColor = () => {
    const colors = ['#FF0000', '#00FF00'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="App">
      <h1>Stock Market MERN App</h1>
      <h2>My Watchlist</h2>
      <ul>
        {watchlist.map((stock) => (
          <li key={stock.symbol}>
            {stock.company} ({stock.symbol}) - 
            <span style={{ color: getRandomColor() }}>
              {' '}
              ${stock.initial_price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    fetch('http://localhost:5000/api/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stock),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setWatchlist([...watchlist, stock]);
      })
      .catch((error) => console.error('Error adding to watchlist:', error));
  };

  return (
    <Router>
      <nav>
        <NavLink to="/stocks">Stocks</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </nav>
      <Routes>
        <Route path="/stocks" element={<Stocks addToWatchlist={addToWatchlist} />} />
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
      </Routes>
    </Router>
  );
}

export default App;
