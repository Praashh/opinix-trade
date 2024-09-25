# Opinix Trade

This project is a real-time opinion trading platform where users can place bets or opinions on different events, similar to prediction markets.

---

## Table of Contents

 1. [Introduction](#introduction)
 2. [Architecture](#architecture)
 3. [Current Features](#current-features)
 4. [Future Steps](#future-steps)
 5. [Setup Instructions](#setup-instructions)
 <!-- 3. [Tech Stack](#tech-stack) -->

---

## Introduction

This platform allows users to engage in opinion trading, where they can bet on different outcomes in real time. It handles the matching of orders, updates strike prices dynamically, and broadcasts live changes to all connected users.

---

## Architecture

The system is designed to handle real-time updates and asynchronous order processing for the order book. Below is a breakdown of the architecture:

## User Architecture Diagram:
![User Diagram](https://utfs.io/f/40G0kRMDo8YboHg5TGraM2wJDUu4Qv6PTdKWHX5yNScboilV)

## Admin Architecture Diagram

![Admin Diagram](https://utfs.io/f/40G0kRMDo8YbOHYutQ49DaVfpnob3ytkRmB2h0jv5XCcIuAM)

## Components:

1. **Client:**
   - Users **places/trades** new orders and receiving real-time updates on the order book.
   - Orders are submitted to the backend for processing.
   
2. **Backend:**
   - The backend handles the core application logic and communicates with the queue for order management (orderbook).
   - It processes incoming requests and interacts with other services to handle new orders and match them efficiently.
   
3. **Queue:**
   - Orders are placed in a queue by asynchronously handling of multiple orders without blocking the system.
   
4. **Worker:**
   - Workers consume orders from the queue and update the order book, performing the core **matching logic** to ensure the order book is **always up-to-date**.
   - After processing the order, the **workers push updated order book data to the WebSocket server**.
   
5. **WebSocket Server:**
   - Responsible for **broadcasting** real-time updates of the order book to all connected clients.
   - Ensures that users always have the latest information and that their views are synchronized across all sessions.

---
<!-- 
## Tech Stack

- **Frontend:**
  - React Native (for mobile application)
  - NextJS (for web applicaiton)
  - WebSocket (for real-time communication)
  
- **Backend:**
  - Node.js with Express
  
- **Database:**
  - PostgreSQL for persistent storage of order data
  
- **Queue:**
  - Redis Queue (RQ) for asynchronous order processing (planned)
  
- **Real-time Communication:**
  - WebSocket for live updates on the order book
  
- **Authentication:**
  - NextAuth.js (planned) for secure authentication
  
- **Payments:**
  - Stripe / Razorpay (planned) for payment integration

--- -->

## Current Features

1. **Real-time Order Book Updates:**
   - The platform provides live updates to all connected clients using WebSockets. When an order is placed, the order book is immediately updated and broadcast to all users.

2. **Dynamic Order Matching:**
   - The platform adjusts the prices and quantities in the order book dynamically based on the incoming orders.

3. **Portfolio Management:**
   - A new `/portfolio` endpoint will be introduced to track user gains and losses based on the fluctuation of top prices in the order book.
---

## Future Steps

   
1. **Order Queuing:**
   - A Redis-backed queue system will be introduced for handling order submissions and matching efficiently.
   
2. **Payment Integration:**
   - Add Stripe or Razorpay to enable secure and seamless payments within the platform.
   
3. **Authentication:**
   - Implement user authentication using NextAuth.js to allow users to create accounts and manage their portfolios securely.
   
4. **Worker-based Architecture:**
   - A worker system handles adding and matching orders in the order book, ensuring smooth operation and avoiding race conditions.

---

## Setup Instructions

### Prerequisites:

- Node.js (version 18+)

### Steps to Run the Application:

1. **Clone the repository:**

```
  git clone https://github.com/<your_username>/offchain-orderbook/
```

**Note: we have two backends backend-odds and backend-probability**

**backend-odds:** follows the standard order-book implementation using AVLTrees having complexity- O(log(n)).

**backend-probability:** follows the order-book similar probo uses (not a standard).

---
### For backend-odds follows these commands:
```
  cd backend-odds
```
```
  npm install
```
```
 cp .env.example .env
```
**Note: Before running Add env variables in env**
```
  npm run dev
```

### For backend-probability follows these commands:
```
  cd backend-probability
```
```
    bun i
```
```
  bun run dev
```
---
### For frontend follows these commands:
```
  cd frontend
```
```
  npm install
```
```
 cp .env.example .env
```
**Note: Before running Add env variables in env**
```
  npm run dev
```
---
## App:

[![Demo](./frontend/public/logo.jpeg)](https://youtu.be/Figa92BwEpE)

## Backend-Odds Demo:

[![Demo](./frontend/public/home.png)](https://youtu.be/RGGiBAN-pWA)

## Backend-Probability Demo:

[![Demo](./frontend/public/home2.png)](https://youtu.be/Rmi6KaQyETk?si=oacKgwhw5V00zdUK)


# TODOs

- [ ] Optimize the algorithm.
- [ ] Integrate Redis
- [ ] Implement a better UI.
- [ ] Proper User and Admin Authentication with DB.
 