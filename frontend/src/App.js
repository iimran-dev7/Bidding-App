import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [bids, setBids] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://bidding-app-caw2.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setBids((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  const handleBidSubmit = async (id) => {
    const bid = bids[id];
    const product = products.find((p) => p._id === id);

    if (!bid || !bid.name || !bid.amount) {
      return alert("Please fill in both name and bid amount.");
    }

    if (Number(bid.amount) <= product.actualOffer) {
      return alert("Your bid must be higher than the current offer.");
    }

    const res = await fetch(`http://localhost:3000/api/products/bid/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });

    if (res.ok) {
      alert("Bid submitted!");
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      );
    } else {
      const error = await res.json();
      alert(error.message || "Bid failed");
    }
  };

  const handleClearBids = async (id) => {
    const confirm = window.confirm("Are you sure you want to clear all bids?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/api/products/clear-bids/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      );
      alert("Bid history cleared.");
    } else {
      alert("Failed to clear bid history.");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="App">
      <h1>Auction Products</h1>

      {products.length > 0 && (
        <div className="slider">
          <div className="card">
            <img src={products[currentIndex].image} alt={products[currentIndex].name} />
            <h2>{products[currentIndex].name}</h2>
            <p>{products[currentIndex].description}</p>
            <p><strong>Minimum Offer:</strong> ${products[currentIndex].minimumOffer}</p>
            <p><strong>Current Offer:</strong> ${products[currentIndex].actualOffer}</p>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={(e) => handleInputChange(e, products[currentIndex]._id)}
            />
            <input
              type="number"
              name="amount"
              placeholder="Your Bid"
              onChange={(e) => handleInputChange(e, products[currentIndex]._id)}
            />
            <button onClick={() => handleBidSubmit(products[currentIndex]._id)}>
              Submit Bid
            </button>

            <button
              onClick={() => handleClearBids(products[currentIndex]._id)}
              style={{ backgroundColor: "red", marginTop: "5px", color: "white", padding: "7px", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              Clear Bid History
            </button>

            <div className="bid-history">
              <h3>Bid History</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Bid</th>
                  </tr>
                </thead>
                <tbody>
                  {products[currentIndex].bidHistory.slice().reverse().map((bid, index) => (
                    <tr key={index}>
                      <td>{bid.name}</td>
                      <td>${bid.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="nav-buttons">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
