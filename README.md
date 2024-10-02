# Opinix Trade

This project is a real-time opinion trading platform where users can place bets or opinions on different events, similar to prediction markets.

---

## Table of Contents

- [Opinix Trade](#opinix-trade)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
  - [User Architecture Diagram:](#user-architecture-diagram)
  - [Admin Architecture Diagram](#admin-architecture-diagram)
  - [Components:](#components)
  - [Current Features](#current-features)
  - [Future Steps](#future-steps)

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