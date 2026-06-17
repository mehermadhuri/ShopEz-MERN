import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Fallback stock listings
const initialStocks = [
  { symbol: 'SEZ', name: 'ShopEz E-Commerce Ltd', price: 152.40, change: 4.8, history: [142, 144, 143, 147, 149, 148, 152.4] },
  { symbol: 'RELI', name: 'Reliance Industries', price: 2450.00, change: 1.2, history: [2410, 2430, 2420, 2440, 2435, 2445, 2450] },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3410.50, change: -0.6, history: [3480, 3450, 3460, 3430, 3420, 3405, 3410.5] },
  { symbol: 'INFY', name: 'Infosys Technologies', price: 1475.20, change: 2.1, history: [1420, 1430, 1450, 1445, 1460, 1455, 1475.2] }
];

const Stocks = () => {
  const [stocks, setStocks] = useState(() => {
    const saved = localStorage.getItem('shopez_stocks');
    return saved ? JSON.parse(saved) : initialStocks;
  });

  const [selectedStock, setSelectedStock] = useState(stocks[0]);

  // Balance and Portfolio states
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('shopez_stock_balance');
    return saved ? parseFloat(saved) : 100000.00; // start with ₹1,00,000
  });

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('shopez_stock_portfolio');
    return saved ? JSON.parse(saved) : []; // Format: { symbol, name, qty, avgPrice }
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('shopez_stock_tx');
    return saved ? JSON.parse(saved) : []; // Format: { symbol, type, qty, price, timestamp }
  });

  // Trade inputs
  const [tradeQty, setTradeQty] = useState(1);

  // Admin states
  const [newStock, setNewStock] = useState({ symbol: '', name: '', price: '' });
  const [adminError, setAdminError] = useState('');

  // Persistence hooks
  useEffect(() => {
    localStorage.setItem('shopez_stocks', JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    localStorage.setItem('shopez_stock_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('shopez_stock_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('shopez_stock_tx', JSON.stringify(transactions));
  }, [transactions]);

  // Handle Select Stock
  const selectStockSymbol = (symbol) => {
    const matched = stocks.find(s => s.symbol === symbol);
    if (matched) {
      setSelectedStock(matched);
      setTradeQty(1);
    }
  };

  // Buy Transaction
  const handleBuy = () => {
    const cost = selectedStock.price * tradeQty;
    if (cost > balance) {
      alert("❌ Insufficient funds to execute trade!");
      return;
    }

    setBalance(prev => prev - cost);

    // Update holdings
    setPortfolio(prev => {
      const existing = prev.find(item => item.symbol === selectedStock.symbol);
      if (existing) {
        const totalQty = existing.qty + tradeQty;
        const avgPrice = ((existing.qty * existing.avgPrice) + cost) / totalQty;
        return prev.map(item => 
          item.symbol === selectedStock.symbol 
            ? { ...item, qty: totalQty, avgPrice: parseFloat(avgPrice.toFixed(2)) }
            : item
        );
      } else {
        return [...prev, {
          symbol: selectedStock.symbol,
          name: selectedStock.name,
          qty: tradeQty,
          avgPrice: selectedStock.price
        }];
      }
    });

    // Record Transaction
    setTransactions(prev => [
      {
        symbol: selectedStock.symbol,
        type: 'BUY',
        qty: tradeQty,
        price: selectedStock.price,
        timestamp: new Date().toLocaleString()
      },
      ...prev
    ]);

    alert(`🎉 Successfully bought ${tradeQty} shares of ${selectedStock.symbol}!`);
  };

  // Sell Transaction
  const handleSell = () => {
    const existing = portfolio.find(item => item.symbol === selectedStock.symbol);
    if (!existing || existing.qty < tradeQty) {
      alert("❌ You do not own enough shares to sell!");
      return;
    }

    const revenue = selectedStock.price * tradeQty;
    setBalance(prev => prev + revenue);

    // Update holdings
    setPortfolio(prev => {
      return prev.map(item => {
        if (item.symbol === selectedStock.symbol) {
          return { ...item, qty: item.qty - tradeQty };
        }
        return item;
      }).filter(item => item.qty > 0);
    });

    // Record Transaction
    setTransactions(prev => [
      {
        symbol: selectedStock.symbol,
        type: 'SELL',
        qty: tradeQty,
        price: selectedStock.price,
        timestamp: new Date().toLocaleString()
      },
      ...prev
    ]);

    alert(`🎉 Successfully sold ${tradeQty} shares of ${selectedStock.symbol}!`);
  };

  // Admin: Add new stock
  const handleAddStock = (e) => {
    e.preventDefault();
    setAdminError('');

    const symbol = newStock.symbol.toUpperCase().trim();
    const name = newStock.name.trim();
    const price = parseFloat(newStock.price);

    if (!symbol || !name || isNaN(price) || price <= 0) {
      setAdminError("Please fill out all fields with valid data.");
      return;
    }

    if (stocks.some(s => s.symbol === symbol)) {
      setAdminError("Stock symbol already exists!");
      return;
    }

    // Generate random 7-day history based on initial price
    const history = [];
    for (let i = 0; i < 6; i++) {
      const offset = (Math.random() - 0.5) * (price * 0.1);
      history.push(parseFloat((price + offset).toFixed(2)));
    }
    history.push(price);

    const createdStock = {
      symbol,
      name,
      price,
      change: parseFloat(((Math.random() - 0.4) * 5).toFixed(2)),
      history
    };

    setStocks(prev => [...prev, createdStock]);
    setNewStock({ symbol: '', name: '', price: '' });
    setSelectedStock(createdStock);
    alert(`📈 Added ${symbol} listings to the stock market!`);
  };

  // Chart configuration
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'],
    datasets: [
      {
        label: `${selectedStock.symbol} Price Trend (₹)`,
        data: selectedStock.history,
        fill: false,
        backgroundColor: '#3498db',
        borderColor: '#3498db',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${selectedStock.name} History` },
    },
  };

  // Calculate portfolio totals
  const portfolioInvestedValue = portfolio.reduce((sum, item) => sum + (item.qty * item.avgPrice), 0);
  const portfolioCurrentValue = portfolio.reduce((sum, item) => {
    const liveStock = stocks.find(s => s.symbol === item.symbol);
    const livePrice = liveStock ? liveStock.price : item.avgPrice;
    return sum + (item.qty * livePrice);
  }, 0);
  const profitLoss = portfolioCurrentValue - portfolioInvestedValue;

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      color: '#2c3e50'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <span style={{
          background: '#eff6ff',
          color: '#2563eb',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Trading Hub
        </span>
        <h1 style={{ fontSize: '36px', marginTop: '10px', color: '#1e293b' }}>📈 ShopEz Share Market</h1>
        <p style={{ color: '#64748b', fontSize: '18px' }}>
          Explore stock listings, track your mock investment portfolio, and simulate trades in real time.
        </p>
      </div>

      {/* Overview stats bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '35px',
      }}>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Virtual Balance</span>
          <h2 style={{ margin: '5px 0 0 0', fontSize: '26px', color: '#2c3e50' }}>₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        </div>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Portfolio Holdings Value</span>
          <h2 style={{ margin: '5px 0 0 0', fontSize: '26px', color: '#2c3e50' }}>₹{portfolioCurrentValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        </div>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Total Return (Profit/Loss)</span>
          <h2 style={{ margin: '5px 0 0 0', fontSize: '26px', color: profitLoss >= 0 ? '#27ae60' : '#e74c3c' }}>
            {profitLoss >= 0 ? '+' : ''}₹{profitLoss.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '30px', alignItems: 'start', marginBottom: '40px' }}>
        
        {/* Left Side: Stock selection widget */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: '0', fontSize: '20px', marginBottom: '20px', color: '#1e293b' }}>Market Board</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stocks.map(s => (
              <div 
                key={s.symbol}
                onClick={() => selectStockSymbol(s.symbol)}
                style={{
                  padding: '12px 15px',
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: selectedStock.symbol === s.symbol ? '#3498db' : '#e2e8f0',
                  background: selectedStock.symbol === s.symbol ? '#f0f9ff' : '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div>
                  <strong style={{ fontSize: '16px', color: '#2c3e50' }}>{s.symbol}</strong>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{s.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>₹{s.price}</div>
                  <span style={{ fontSize: '13px', color: s.change >= 0 ? '#27ae60' : '#e74c3c', fontWeight: '500' }}>
                    {s.change >= 0 ? '+' : ''}{s.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed chart & execution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Chart Card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <h3 style={{ margin: '0', fontSize: '22px', color: '#1e293b' }}>{selectedStock.name} ({selectedStock.symbol})</h3>
                <span style={{ color: '#64748b', fontSize: '14px' }}>Live Market Rates</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>₹{selectedStock.price}</span>
                <span style={{ color: selectedStock.change >= 0 ? '#27ae60' : '#e74c3c', marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                  ({selectedStock.change >= 0 ? '+' : ''}{selectedStock.change}%)
                </span>
              </div>
            </div>

            {/* Line Chart */}
            <div style={{ height: '320px', marginBottom: '25px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>

            {/* Trading executor form */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '20px', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#475569' }}>Shares Quantity:</span>
                <input 
                  type="number"
                  min="1"
                  value={tradeQty}
                  onChange={(e) => setTradeQty(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    padding: '8px 12px',
                    width: '80px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                />
              </div>

              <div style={{ fontSize: '16px', color: '#475569' }}>
                Total Order Value: <strong style={{ color: '#e67e22', fontSize: '18px' }}>₹{(selectedStock.price * tradeQty).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexGrow: '1', maxWidth: '300px' }}>
                <button 
                  onClick={handleBuy}
                  style={{
                    flex: '1',
                    background: '#2ecc71',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(46,204,113,0.2)'
                  }}
                >
                  Buy Share
                </button>
                <button 
                  onClick={handleSell}
                  style={{
                    flex: '1',
                    background: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(231,76,60,0.2)'
                  }}
                >
                  Sell Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grids: Holdings, Transaction History, Admin adding stock */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
        
        {/* Holdings Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: '0', fontSize: '20px', color: '#1e293b', marginBottom: '20px' }}>My Portfolio Holdings</h3>
          
          {portfolio.length === 0 ? (
            <div style={{ color: '#64748b', textAlign: 'center', padding: '20px 0' }}>You do not own any stocks yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '8px 0' }}>Symbol</th>
                  <th>Shares</th>
                  <th>Avg Price</th>
                  <th style={{ textAlign: 'right' }}>Current Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map(item => {
                  const live = stocks.find(s => s.symbol === item.symbol);
                  const currentVal = item.qty * (live ? live.price : item.avgPrice);
                  return (
                    <tr key={item.symbol} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#334155' }}>{item.symbol}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.avgPrice}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#334155' }}>₹{currentVal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Transaction History */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: '0', fontSize: '20px', color: '#1e293b', marginBottom: '20px' }}>Trade History</h3>
          
          {transactions.length === 0 ? (
            <div style={{ color: '#64748b', textAlign: 'center', padding: '20px 0' }}>No trades recorded in this session.</div>
          ) : (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '8px 0' }}>Type</th>
                    <th>Stock</th>
                    <th>Qty</th>
                    <th style={{ textAlign: 'right' }}>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map((tx, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 0', fontWeight: 'bold', color: tx.type === 'BUY' ? '#27ae60' : '#e74c3c' }}>{tx.type}</td>
                      <td>{tx.symbol}</td>
                      <td>{tx.qty}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#334155' }}>₹{tx.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Admin Section: Add Custom stock */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: '0', fontSize: '20px', color: '#1e293b', marginBottom: '15px' }}>Admin Moderation</h3>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 15px 0' }}>Add new stock assets directly to the market board.</p>
          
          {adminError && <div style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '10px' }}>{adminError}</div>}
          
          <form onSubmit={handleAddStock} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Symbol (e.g. RELI)" 
                style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', flex: '1', outline: 'none' }}
                value={newStock.symbol}
                onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
              />
              <input 
                type="number" 
                step="0.01" 
                placeholder="Price (₹)" 
                style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', flex: '1', outline: 'none' }}
                value={newStock.price}
                onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
              />
            </div>
            <input 
              type="text" 
              placeholder="Company Name" 
              style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              value={newStock.name}
              onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
            />
            <button 
              type="submit" 
              style={{
                background: '#1e293b',
                color: '#fff',
                border: 'none',
                padding: '10px 0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#0f172a'}
              onMouseOut={(e) => e.target.style.background = '#1e293b'}
            >
              List Stock Asset
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Stocks;
