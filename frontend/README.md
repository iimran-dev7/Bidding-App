# Bidding App

A full-stack auction-style bidding app built with **React.js**, **Node.js**, **Express**, and **MongoDB**.

## Features

- Display multiple auction products
- Submit bids with name and amount
- Real-time update of current bid
- Bid history table for each product
- Clear bid history functionality
- Slide through products using Previous/Next buttons

## Tech Stack

**Frontend:** React.js, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (using Mongoose)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bidding-app.git
cd bidding-app
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Set up environment

Create a `.env` file in the `backend` folder and add your MongoDB URI:

```
MONGO_URI=your_mongo_connection_string
PORT=3000
```

### 4. Run the app

#### Backend
```bash
cd backend
node server.js
```

#### Frontend
```bash
cd ../frontend
npm start
```

Then open [http://localhost:3001](http://localhost:3001) to view the app.

## Author

Developed by [iimran.dev](https://github.com/iimran-dev7)